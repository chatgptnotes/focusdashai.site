// Core types for Focus Dash

export type UserRole = 'admin' | 'manager' | 'csm'
export type Vertical = 'tech' | 'healthcare' | 'manufacturing'
export type AccountSegment = 'enterprise' | 'mid-market' | 'smb'
export type PulseStatus = 'green' | 'amber' | 'red'

export interface PulseComponents {
  usage: number
  experience: number
  outcomes: number
  risk: number
}

export interface AccountWithScore {
  id: string
  name: string
  vertical: Vertical
  segment: AccountSegment | null
  mrr: number
  baseCurrency: string
  owner: {
    name: string
  } | null
  latestScore: {
    score: number
    status: PulseStatus
    periodStart: Date
  } | null
}

export interface PortfolioMetrics {
  totalAccounts: number
  totalMRR: number
  avgPulseScore: number
  atRiskAccounts: number
  nrr: number
  churnRate: number
  scoreDistribution: {
    green: number
    amber: number
    red: number
  }
  topRisk: AccountWithScore[]
  topUpside: AccountWithScore[]
}

// Metric type definitions by vertical

export type TechMetricType =
  | 'nrr_percent'
  | 'mrr'
  | 'active_users_percent'
  | 'hero_feature_adoption_percent'
  | 'integration_count'
  | 'license_utilisation_percent'
  | 'nps_score'
  | 'csat_score'
  | 'ces_score'
  | 'expansion_mrr'
  | 'contraction_mrr'

export type HealthcareMetricType =
  | 'patient_wait_time_minutes'
  | 'no_show_rate_percent'
  | 'patient_experience_score'
  | 'complaint_rate_per_1000'
  | 'staff_adoption_percent'

export type ManufacturingMetricType =
  | 'unplanned_downtime_hours'
  | 'mttr_hours'
  | 'mtbf_hours'
  | 'otif_percent'
  | 'first_pass_yield_percent'
  | 'line_stops_count'
  | 'sla_adherence_percent'

export type MetricType = TechMetricType | HealthcareMetricType | ManufacturingMetricType

// Metric component mapping - which metrics feed into which pulse components
export interface MetricComponentMapping {
  [key: string]: 'usage' | 'experience' | 'outcomes' | 'risk'
}

export const TECH_METRIC_MAPPING: MetricComponentMapping = {
  active_users_percent: 'usage',
  hero_feature_adoption_percent: 'usage',
  license_utilisation_percent: 'usage',
  integration_count: 'usage',
  nps_score: 'experience',
  csat_score: 'experience',
  ces_score: 'experience',
  nrr_percent: 'outcomes',
  expansion_mrr: 'outcomes',
  contraction_mrr: 'risk',
}

export const HEALTHCARE_METRIC_MAPPING: MetricComponentMapping = {
  staff_adoption_percent: 'usage',
  patient_experience_score: 'experience',
  patient_wait_time_minutes: 'risk',
  no_show_rate_percent: 'risk',
  complaint_rate_per_1000: 'risk',
}

export const MANUFACTURING_METRIC_MAPPING: MetricComponentMapping = {
  sla_adherence_percent: 'usage',
  otif_percent: 'outcomes',
  first_pass_yield_percent: 'outcomes',
  unplanned_downtime_hours: 'risk',
  mttr_hours: 'risk',
  mtbf_hours: 'outcomes',
  line_stops_count: 'risk',
}
