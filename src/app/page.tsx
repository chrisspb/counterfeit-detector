'use client'

import { useState, useCallback } from 'react'
import type { AnalysisResult } from '@/types/analysis'
import ResultCard from '@/components/ResultCard'
import DropZone from '@/components/DropZone'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [productType, setProductType] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = useCallback((file: File) => {
    setImageFile(file)
    setResult(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => setImage(e.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleAnalyze = async () => {
    if (!imageFile || !image) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const base64 = image.split(',')[1]
      const mimeType = imageFile.type

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType, productType }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Erreur lors de l'analyse")
      }

      const data = await response.json()
      setResult(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
              style={{ background: 'var(--accent)' }}
            >
              🔍
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                CounterfeitDetector
              </h1>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Propulsé par Claude Vision
              </p>
            </div>
          </div>
          <span
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ background: 'rgba(108,99,255,0.15)', color: 'var(--accent)' }}
          >
            Beta
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black tracking-tighter mb-3" style={{ color: 'var(--text)' }}>
            Détectez les{' '}
            <span style={{ color: 'var(--accent)' }}>contrefaçons</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }} className="text-lg">
            Uploadez une photo de votre article pour une analyse instantanée par IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload + Config */}
          <div className="flex flex-col gap-4">
            <DropZone onFileSelect={handleImageSelect} image={image} />

            {/* Product type */}
            <div>
              <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text-muted)' }}>
                Type de produit (optionnel)
              </label>
              <input
                type="text"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                placeholder="ex: montre de luxe, sac à main, sneakers..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="w-full py-4 rounded-xl font-bold text-sm transition-all"
              style={{
                background: image && !loading ? 'var(--accent)' : 'var(--surface-2)',
                color: image && !loading ? 'white' : 'var(--text-muted)',
                cursor: image && !loading ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyse en cours...
                </span>
              ) : (
                "🔍 Analyser l'article"
              )}
            </button>

            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              >
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Right: Result */}
          <div>
            {result ? (
              <ResultCard result={result} />
            ) : (
              <div
                className="h-full flex items-center justify-center rounded-2xl"
                style={{ border: '1px dashed var(--border)', minHeight: '300px' }}
              >
                <div className="text-center" style={{ color: 'var(--text-muted)' }}>
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-sm">Le résultat apparaîtra ici</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-10" style={{ color: 'var(--text-muted)' }}>
          Cette analyse est fournie à titre indicatif. Pour une expertise légale, consultez un professionnel.
        </p>
      </div>
    </main>
  )
}
