# 🔍 Counterfeit Detector

AI-powered counterfeit product detection from images using Claude Vision API.

## Features

- 📸 Upload any product image for analysis
- 🤖 Claude Vision analyzes authenticity markers
- 📊 Detailed confidence score & reasoning
- 🎯 Works for luxury goods, watches, bags, shoes, electronics, etc.
- 🌍 Interface in French

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude claude-sonnet-4-20250514 (Vision)
- **Deploy**: Vercel

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/chrisspb/counterfeit-detector.git
cd counterfeit-detector
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Add your Anthropic API key in `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

1. User uploads an image of a product
2. Optionally specifies the product type (watch, bag, sneakers...)
3. Claude Vision analyzes:
   - Logo quality & placement
   - Stitching / build quality visible
   - Font consistency
   - Material appearance
   - Serial number format
   - Packaging details
4. Returns a verdict: ✅ Authentic / ⚠️ Suspicious / ❌ Likely Counterfeit

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chrisspb/counterfeit-detector)

Don't forget to set `ANTHROPIC_API_KEY` in your Vercel environment variables.
