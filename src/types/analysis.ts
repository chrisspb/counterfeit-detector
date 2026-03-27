export type Verdict = 'authentic' | 'suspicious' | 'counterfeit'

export interface AnalysisResult {
  verdict: Verdict
  confidence: number
  summary: string
  indicators: {
    authentic: string[]
    suspicious: string[]
  }
  recommendation: string
}
