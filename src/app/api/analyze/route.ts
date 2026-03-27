import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import type { AnalysisResult } from '@/types/analysis'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  try {
    const { image, mimeType, productType } = await req.json()

    if (!image) {
      return NextResponse.json({ error: 'Image manquante' }, { status: 400 })
    }

    const productContext = productType
      ? `L'utilisateur indique qu'il s'agit de : ${productType}.`
      : "Le type de produit n'a pas été précisé."

    const prompt = `Tu es un expert en authentification de produits et en détection de contrefaçons. Analyse l'image fournie et détermine si le produit est authentique ou potentiellement une contrefaçon.

${productContext}

Analyse les éléments suivants si visibles :
- Qualité et précision du logo
- Qualité des coutures, finitions, matériaux
- Cohérence des polices d'écriture
- Numéros de série, hologrammes, étiquettes
- Qualité générale de fabrication
- Tout détail suspect ou non conforme aux standards habituels de la marque

Réponds UNIQUEMENT avec un objet JSON valide (sans markdown, sans backticks) avec cette structure exacte :
{
  "verdict": "authentic" | "suspicious" | "counterfeit",
  "confidence": <nombre entre 0 et 100>,
  "summary": "<résumé en 1-2 phrases en français>",
  "indicators": {
    "authentic": ["<liste de points positifs>"],
    "suspicious": ["<liste de points suspects, ou tableau vide si aucun>"]
  },
  "recommendation": "<conseil pratique en français>"
}`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: image,
              },
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
    })

    const textContent = response.content.find((c) => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error("Réponse invalide de l'IA")
    }

    let parsed: AnalysisResult
    try {
      const cleaned = textContent.text.replace(/```json|```/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      throw new Error("Impossible de parser la réponse de l'IA")
    }

    return NextResponse.json(parsed)
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: error.message || 'Erreur interne' }, { status: 500 })
  }
}
