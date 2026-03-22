// src/hooks/useClaudeAI.js
// Llama a /api/claude (Vercel serverless) — API key segura en servidor
import { useState, useCallback } from 'react'

const API = '/api/claude'

export function useClaudeAI() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const call = useCallback(async (system, user, maxTokens = 1200, useWebSearch = false) => {
    setLoading(true); setError(null)
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, max_tokens: maxTokens, useWebSearch, messages: [{ role:'user', content:user }] })
      })
      if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e.error||`Error ${res.status}`) }
      const data = await res.json()
      return data.content?.map(b => b.text || '').filter(Boolean).join('') || ''
    } catch(e) { setError(e.message); return null }
    finally { setLoading(false) }
  }, [])

  const callJSON = useCallback(async (system, user, maxTokens = 1500, useWebSearch = false) => {
    const raw = await call(system, user, maxTokens, useWebSearch)
    if (!raw) return null
    try {
      const clean = raw.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim()
      const match = clean.match(/(\{[\s\S]*\}|\[[\s\S]*\])/m)
      return JSON.parse(match ? match[1] : clean)
    } catch { setError('No se pudo parsear la respuesta IA'); return null }
  }, [call])

  return { loading, error, call, callJSON }
}
