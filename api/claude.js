// api/claude.js
// ─────────────────────────────────────────────────────────────
// Vercel Serverless Function — Proxy seguro para Claude AI
// La API key NUNCA llega al frontend.
//
// Variables de entorno necesarias en Vercel:
//   ANTHROPIC_API_KEY = sk-ant-...
//   POSTGRES_URL      = postgresql://...  (Railway PostgreSQL)
// ─────────────────────────────────────────────────────────────

export const config = { runtime: 'edge' }

export default async function handler(req) {
  // Solo POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405, headers: { 'Content-Type': 'application/json' }
    })
  }

  // CORS — permite requests desde tu dominio de Vercel
  const origin = req.headers.get('origin') || ''
  const allowedOrigins = [
    'https://robloxhub.vercel.app',
    'http://localhost:5173',
    'http://localhost:4173',
  ]
  // Permite cualquier subdominio de vercel.app (preview deploys)
  const corsOrigin = allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')
    ? origin
    : allowedOrigins[0]

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key no configurada en Vercel' }), {
      status: 500, headers: corsHeaders
    })
  }

  try {
    const body = await req.json()

    // Llamada a Claude
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'tools-2024-04-04',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: body.max_tokens || 1500,
        system: body.system || '',
        messages: body.messages || [],
        // Habilitar web_search si se pide
        ...(body.useWebSearch ? {
          tools: [{
            type: 'web_search_20250305',
            name: 'web_search',
          }]
        } : {})
      })
    })

    if (!response.ok) {
      const err = await response.text()
      return new Response(JSON.stringify({ error: `Claude API error: ${response.status}`, detail: err }), {
        status: response.status, headers: corsHeaders
      })
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: 200, headers: corsHeaders })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: corsHeaders
    })
  }
}
