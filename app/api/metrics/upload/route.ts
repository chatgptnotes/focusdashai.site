import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { recalculatePulseScores } from '@/lib/pulse-calculator'
import Papa from 'papaparse'

export const dynamic = 'force-dynamic'

interface MetricRow {
  account_name: string
  metric_type: string
  period_start: string
  period_end: string
  value: string
  unit?: string
  source?: string
}

interface ValidationError {
  row: number
  field: string
  message: string
}

/**
 * POST /api/metrics/upload
 *
 * Batch upload metrics via CSV
 * Expected CSV format:
 * account_name,metric_type,period_start,period_end,value,unit,source
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const tenantId = formData.get('tenantId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID required' }, { status: 400 })
    }

    // Read CSV file
    const text = await file.text()
    const parsed = Papa.parse<MetricRow>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase().replace(/ /g, '_'),
    })

    if (parsed.errors.length > 0) {
      return NextResponse.json(
        {
          error: 'CSV parsing errors',
          details: parsed.errors,
        },
        { status: 400 }
      )
    }

    const rows = parsed.data
    const errors: ValidationError[] = []
    const validMetrics: any[] = []
    let periodStart: Date | null = null
    let periodEnd: Date | null = null

    // Get all accounts for this tenant to validate account names
    const accounts = await prisma.account.findMany({
      where: { tenantId },
      select: { id: true, name: true },
    })

    const accountMap = new Map(accounts.map((a) => [a.name.toLowerCase(), a.id]))

    // Validate and prepare metrics
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const rowNum = i + 2 // Account for header row and 0-index

      // Validate account_name
      if (!row.account_name) {
        errors.push({ row: rowNum, field: 'account_name', message: 'Account name is required' })
        continue
      }

      const accountId = accountMap.get(row.account_name.toLowerCase())
      if (!accountId) {
        errors.push({
          row: rowNum,
          field: 'account_name',
          message: `Account "${row.account_name}" not found`,
        })
        continue
      }

      // Validate metric_type
      if (!row.metric_type) {
        errors.push({ row: rowNum, field: 'metric_type', message: 'Metric type is required' })
        continue
      }

      // Validate period_start
      if (!row.period_start) {
        errors.push({ row: rowNum, field: 'period_start', message: 'Period start is required' })
        continue
      }
      const startDate = new Date(row.period_start)
      if (isNaN(startDate.getTime())) {
        errors.push({
          row: rowNum,
          field: 'period_start',
          message: 'Invalid date format (expected YYYY-MM-DD)',
        })
        continue
      }

      // Validate period_end
      if (!row.period_end) {
        errors.push({ row: rowNum, field: 'period_end', message: 'Period end is required' })
        continue
      }
      const endDate = new Date(row.period_end)
      if (isNaN(endDate.getTime())) {
        errors.push({
          row: rowNum,
          field: 'period_end',
          message: 'Invalid date format (expected YYYY-MM-DD)',
        })
        continue
      }

      // Validate value
      if (!row.value && row.value !== '0') {
        errors.push({ row: rowNum, field: 'value', message: 'Value is required' })
        continue
      }
      const value = parseFloat(row.value)
      if (isNaN(value)) {
        errors.push({ row: rowNum, field: 'value', message: 'Value must be a number' })
        continue
      }

      // Track period for pulse score calculation
      if (!periodStart || startDate < periodStart) periodStart = startDate
      if (!periodEnd || endDate > periodEnd) periodEnd = endDate

      // Add to valid metrics
      validMetrics.push({
        tenantId,
        accountId,
        metricType: row.metric_type.toLowerCase(),
        periodStart: startDate,
        periodEnd: endDate,
        value,
        unit: row.unit || null,
        source: row.source || 'csv_upload',
      })
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Validation errors found in ${errors.length} rows`,
          errors,
          validRows: validMetrics.length,
          totalRows: rows.length,
        },
        { status: 400 }
      )
    }

    // Insert valid metrics
    await prisma.metric.createMany({
      data: validMetrics,
    })

    // Recalculate pulse scores for the period
    if (periodStart && periodEnd) {
      await recalculatePulseScores(tenantId, periodStart, periodEnd)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${validMetrics.length} metrics`,
      uploaded: validMetrics.length,
      period: periodStart && periodEnd ? { start: periodStart, end: periodEnd } : null,
    })
  } catch (error: any) {
    console.error('Metrics upload error:', error)
    return NextResponse.json(
      {
        error: 'Failed to upload metrics',
        details: error.message,
      },
      { status: 500 }
    )
  }
}
