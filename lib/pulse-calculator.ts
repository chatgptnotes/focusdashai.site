import { prisma } from './db'
import type { PulseComponents, Vertical, MetricComponentMapping, PulseStatus } from './types'
import {
  TECH_METRIC_MAPPING,
  HEALTHCARE_METRIC_MAPPING,
  MANUFACTURING_METRIC_MAPPING,
} from './types'

/**
 * Focus Pulse Score Calculator
 *
 * Calculates the composite Focus Pulse Score for an account based on:
 * - Usage metrics (default weight: 35%)
 * - Experience metrics (default weight: 25%)
 * - Outcome metrics (default weight: 25%)
 * - Risk metrics (default weight: 15%, inverted)
 */

interface MetricValue {
  metricType: string
  value: number
}

interface PulseWeights {
  usageWeight: number
  experienceWeight: number
  outcomeWeight: number
  riskWeight: number
  greenMin: number
  amberMin: number
}

function getMetricMapping(vertical: Vertical): MetricComponentMapping {
  switch (vertical) {
    case 'tech':
      return TECH_METRIC_MAPPING
    case 'healthcare':
      return HEALTHCARE_METRIC_MAPPING
    case 'manufacturing':
      return MANUFACTURING_METRIC_MAPPING
    default:
      return TECH_METRIC_MAPPING
  }
}

/**
 * Normalize a metric value to 0-100 scale
 * Handles different metric types with appropriate scaling
 */
function normalizeMetric(metricType: string, value: number, vertical: Vertical): number {
  // Percentages and scores are already 0-100 or 0-10 (NPS: -100 to 100)
  if (metricType.includes('percent') || metricType.includes('_score')) {
    if (metricType === 'nps_score') {
      // NPS is -100 to 100, normalize to 0-100
      return Math.max(0, Math.min(100, (value + 100) / 2))
    }
    return Math.max(0, Math.min(100, value))
  }

  // Count-based metrics - normalize based on expected ranges
  if (metricType.includes('count')) {
    // Integration count: 0-10 is typical
    if (metricType === 'integration_count') {
      return Math.min(100, (value / 10) * 100)
    }
    // Line stops: inverse - fewer is better (assume 0-20 range)
    if (metricType === 'line_stops_count') {
      return Math.max(0, 100 - (value / 20) * 100)
    }
  }

  // Time-based metrics (hours, minutes) - inverse, less is better
  if (metricType.includes('hours') || metricType.includes('minutes')) {
    // Patient wait time: target <30 minutes
    if (metricType === 'patient_wait_time_minutes') {
      return Math.max(0, 100 - (value / 30) * 100)
    }
    // MTTR: target <4 hours
    if (metricType === 'mttr_hours') {
      return Math.max(0, 100 - (value / 4) * 100)
    }
    // MTBF: higher is better, normalize to 0-100 (assume 100 hours is excellent)
    if (metricType === 'mtbf_hours') {
      return Math.min(100, (value / 100) * 100)
    }
    // Unplanned downtime: target <8 hours per month
    if (metricType === 'unplanned_downtime_hours') {
      return Math.max(0, 100 - (value / 8) * 100)
    }
  }

  // Rate metrics (per 1000)
  if (metricType.includes('_rate_')) {
    // Complaint rate: target <5 per 1000
    if (metricType === 'complaint_rate_per_1000') {
      return Math.max(0, 100 - (value / 5) * 100)
    }
  }

  // Default: assume value is already 0-100
  return Math.max(0, Math.min(100, value))
}

/**
 * Calculate component scores from metrics
 */
function calculateComponentScores(
  metrics: MetricValue[],
  vertical: Vertical
): PulseComponents {
  const mapping = getMetricMapping(vertical)
  const components: Record<string, number[]> = {
    usage: [],
    experience: [],
    outcomes: [],
    risk: [],
  }

  // Group and normalize metrics by component
  for (const metric of metrics) {
    const component = mapping[metric.metricType]
    if (component) {
      const normalizedValue = normalizeMetric(metric.metricType, metric.value, vertical)
      components[component].push(normalizedValue)
    }
  }

  // Average each component (or default to 50 if no metrics)
  const usage =
    components.usage.length > 0
      ? components.usage.reduce((a, b) => a + b, 0) / components.usage.length
      : 50
  const experience =
    components.experience.length > 0
      ? components.experience.reduce((a, b) => a + b, 0) / components.experience.length
      : 50
  const outcomes =
    components.outcomes.length > 0
      ? components.outcomes.reduce((a, b) => a + b, 0) / components.outcomes.length
      : 50
  const risk =
    components.risk.length > 0
      ? components.risk.reduce((a, b) => a + b, 0) / components.risk.length
      : 50

  return { usage, experience, outcomes, risk }
}

/**
 * Calculate composite Focus Pulse Score
 */
function calculateCompositeScore(
  components: PulseComponents,
  weights: PulseWeights
): number {
  const score =
    components.usage * weights.usageWeight +
    components.experience * weights.experienceWeight +
    components.outcomes * weights.outcomeWeight +
    (100 - components.risk) * weights.riskWeight // Risk is inverted

  return Math.round(score * 10) / 10 // Round to 1 decimal
}

/**
 * Determine status based on score and thresholds
 */
function determineStatus(score: number, weights: PulseWeights): PulseStatus {
  if (score >= weights.greenMin) return 'green'
  if (score >= weights.amberMin) return 'amber'
  return 'red'
}

/**
 * Calculate Focus Pulse Score for a single account and period
 */
export async function calculatePulseScore(
  tenantId: string,
  accountId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<void> {
  // Get account details
  const account = await prisma.account.findUnique({
    where: { id: accountId },
    select: { vertical: true },
  })

  if (!account) {
    throw new Error(`Account ${accountId} not found`)
  }

  // Get pulse weights for this vertical (or default)
  let weights = await prisma.pulseWeight.findUnique({
    where: {
      tenantId_vertical: {
        tenantId,
        vertical: account.vertical,
      },
    },
  })

  // Fallback to default weights if vertical-specific not found
  if (!weights) {
    weights = await prisma.pulseWeight.findUnique({
      where: {
        tenantId_vertical: {
          tenantId,
          vertical: 'default',
        },
      },
    })
  }

  // If still no weights, create default
  if (!weights) {
    weights = await prisma.pulseWeight.create({
      data: {
        tenantId,
        vertical: 'default',
        usageWeight: 0.35,
        experienceWeight: 0.25,
        outcomeWeight: 0.25,
        riskWeight: 0.15,
        greenMin: 70,
        amberMin: 50,
      },
    })
  }

  // Get metrics for this account and period
  const metrics = await prisma.metric.findMany({
    where: {
      tenantId,
      accountId,
      periodStart: {
        gte: periodStart,
        lt: periodEnd,
      },
    },
    select: {
      metricType: true,
      value: true,
    },
  })

  // Calculate component scores
  const components = calculateComponentScores(metrics, account.vertical as Vertical)

  // Calculate composite score
  const score = calculateCompositeScore(components, weights)

  // Determine status
  const status = determineStatus(score, weights)

  // Upsert pulse score
  await prisma.pulseScore.upsert({
    where: {
      tenantId_accountId_periodStart: {
        tenantId,
        accountId,
        periodStart,
      },
    },
    update: {
      periodEnd,
      score,
      status,
      componentsJson: JSON.stringify(components),
    },
    create: {
      tenantId,
      accountId,
      periodStart,
      periodEnd,
      score,
      status,
      componentsJson: JSON.stringify(components),
    },
  })
}

/**
 * Recalculate all pulse scores for a tenant and period
 */
export async function recalculatePulseScores(
  tenantId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<void> {
  // Get all accounts for this tenant
  const accounts = await prisma.account.findMany({
    where: { tenantId },
    select: { id: true },
  })

  // Calculate pulse score for each account
  for (const account of accounts) {
    await calculatePulseScore(tenantId, account.id, periodStart, periodEnd)
  }
}
