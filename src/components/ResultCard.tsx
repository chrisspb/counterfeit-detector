'use client'

import type { AnalysisResult, Verdict } from '@/types/analysis'

interface Props {
  result: AnalysisResult
}

const VERDICT_CONFIG: Record<Verdict, { label: string; color: string; bg: string; border: string; icon: string }> = {
  authentic: {
    label: 'Authentique',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.25)',
    icon: '✅',
  },
  suspicious: {
    label: 'Suspect',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.25)',
    icon: '⚠️',
  },
  counterfeit: {
    label: 'Contrefaçon',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
    icon: '🚫',
  },
}

export default function ResultCard({ result }: Props) {
  const cfg = VERDICT_CONFIG[result.verdict]

  return (
    <div className="flex flex-col gap-3 animate-fadeIn">
      {/* Verdict */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
      >
        <span className="text-4xl">{cfg.icon}</span>
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: cfg.color }}>
            Verdict
          </p>
          <p className="text-xl font-black tracking-tight" style={{ color: cfg.color }}>
            {cfg.label}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black" style={{ color: cfg.color }}>
            {result.confidence}
            <span className="text-lg">%</span>
          </p>
          <p className="text-xs" style={{ color: cfg.color, opacity: 0.7 }}>confiance</p>
        </div>
      </div>

      {/* Summary */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
          Analyse
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
          {result.summary}
        </p>
      </div>

      {/* Indicators */}
      {result.indicators.authentic.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#22c55e' }}>
            ✓ Points positifs
          </p>
          <ul className="flex flex-col gap-1.5">
            {result.indicators.authentic.map((item, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: '#22c55e', flexShrink: 0 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.indicators.suspicious.length > 0 && (
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#ef4444' }}>
            ⚠ Points suspects
          </p>
          <ul className="flex flex-col gap-1.5">
            {result.indicators.suspicious.map((item, i) => (
              <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: '#ef4444', flexShrink: 0 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      <div
        className="rounded-xl p-4"
        style={{ background: 'rgba(108,99,255,0.06)', border: '1px solid rgba(108,99,255,0.2)' }}
      >
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent)' }}>
          💡 Recommandation
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {result.recommendation}
        </p>
      </div>
    </div>
  )
}
