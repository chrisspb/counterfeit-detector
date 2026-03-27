'use client'

import { useCallback, useState } from 'react'

interface Props {
  onFileSelect: (file: File) => void
  image: string | null
}

export default function DropZone({ onFileSelect, image }: Props) {
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-all"
      style={{
        border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`,
        background: dragging ? 'rgba(108,99,255,0.05)' : 'var(--surface)',
        minHeight: '220px',
      }}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleChange} />

      {image ? (
        <div className="relative w-full h-full" style={{ minHeight: '220px' }}>
          <img
            src={image}
            alt="Article à analyser"
            className="w-full h-full object-contain"
            style={{ maxHeight: '280px' }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            style={{ background: 'rgba(0,0,0,0.6)' }}
          >
            <span className="text-sm font-medium text-white">Changer l&apos;image</span>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center h-full py-12 px-4 text-center"
          style={{ minHeight: '220px' }}
        >
          <div className="text-4xl mb-4">📸</div>
          <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
            Glissez une image ici
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            ou cliquez pour parcourir
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            JPG, PNG, WEBP — max 20 Mo
          </p>
        </div>
      )}
    </div>
  )
}
