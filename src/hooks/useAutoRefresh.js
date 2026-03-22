// src/hooks/useAutoRefresh.js
// Auto-actualiza códigos cada hora via /api/claude + guarda en /api/db
import { useState, useEffect, useCallback, useRef } from 'react'

const INTERVAL_MS = 60 * 60 * 1000  // 1 hora
const STORAGE_KEY = 'rhub_codes_v3'

// ── caché local (fallback rápido) ─────────────────────────
function loadLocal() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}') } catch { return {} } }
function saveLocal(slug, codes) {
  try {
    const c = loadLocal()
    c[slug] = { codes, ts: Date.now() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
  } catch {}
}
function isStale(slug) {
  const c = loadLocal()[slug]
  return !c || (Date.now() - c.ts) > INTERVAL_MS
}

// ── fetch desde BD de Railway ─────────────────────────────
async function dbGetCodes(slug) {
  try {
    const r = await fetch(`/api/db?action=getAICodes&slug=${slug}`)
    if (!r.ok) return null
    const d = await r.json()
    if (!d.codes || d.codes.length === 0) return null
    // Considera stale si hace más de 1h
    const age = Date.now() - new Date(d.fetched_at).getTime()
    if (age > INTERVAL_MS) return null
    return d.codes
  } catch { return null }
}

async function dbSaveCodes(slug, codes) {
  try {
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'saveCodes', slug, codes })
    })
  } catch {}
}

// ── fetch desde Claude ────────────────────────────────────
async function fetchFromClaude(gameName, gameCategory) {
  const today = new Date().toLocaleDateString('es-ES', { day:'numeric', month:'long', year:'numeric' })

  const res = await fetch('/api/claude', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      max_tokens: 1200,
      useWebSearch: true,  // Claude buscará los códigos reales en internet
      system: `Eres un experto en códigos de Roblox. Hoy es ${today}.
Cuando el usuario pida códigos, PRIMERO busca en internet los códigos más actuales del juego.
Luego devuelve ÚNICAMENTE JSON válido sin markdown.

Formato ESTRICTO:
{
  "codes": [
    { "id": 1, "code": "CODIGO", "reward": "Premio específico", "status": "active", "date": "YYYY-MM-DD", "isNew": true, "verified": true }
  ],
  "howToRedeem": "Instrucciones específicas"
}

REGLAS:
- Busca en internet los códigos reales antes de responder
- status "active" = funciona HOY. "expired" = ya no funciona
- Los códigos deben ser REALES, no inventados
- isNew=true si se añadió en los últimos 7 días
- Genera entre 8-15 códigos`,
      messages: [{
        role: 'user',
        content: `Busca los códigos más actuales de HOY (${today}) para el juego de Roblox "${gameName}" (categoría: ${gameCategory}). Prioriza los más recientes.`
      }]
    })
  })

  if (!res.ok) throw new Error(`API ${res.status}`)
  const data = await res.json()
  const text = data.content?.map(b => b.text || '').join('') || ''
  const clean = text.replace(/```json\n?/g,'').replace(/```\n?/g,'').trim()
  const match = clean.match(/(\{[\s\S]*\})/m)
  return JSON.parse(match ? match[1] : clean)
}

// ── Hook principal ────────────────────────────────────────
export function useAutoRefresh(slug, gameName, gameCategory) {
  const [codes,      setCodes]      = useState(() => loadLocal()[slug]?.codes || null)
  const [refreshing, setRefreshing] = useState(false)
  const [lastFetch,  setLastFetch]  = useState(null)
  const [error,      setError]      = useState(null)
  const [countdown,  setCountdown]  = useState('')
  const intervalRef  = useRef(null)
  const countdownRef = useRef(null)

  // Countdown visual
  useEffect(() => {
    if (!lastFetch) return
    countdownRef.current = setInterval(() => {
      const diff = new Date(lastFetch).getTime() + INTERVAL_MS - Date.now()
      if (diff <= 0) { setCountdown('actualizando...'); return }
      const h = Math.floor(diff/3600000)
      const m = Math.floor((diff%3600000)/60000)
      const s = Math.floor((diff%60000)/1000)
      setCountdown(`${h>0?h+'h ':''}${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`)
    }, 1000)
    return () => clearInterval(countdownRef.current)
  }, [lastFetch])

  const refresh = useCallback(async (force = false) => {
    if (!slug || !gameName || refreshing) return null

    // 1. Si no es forzado, intentar BD
    if (!force) {
      const dbCodes = await dbGetCodes(slug)
      if (dbCodes) {
        setCodes(dbCodes); saveLocal(slug, dbCodes)
        setLastFetch(new Date()); return dbCodes
      }
      // 2. Caché local como fallback rápido mientras carga Claude
      const local = loadLocal()[slug]
      if (local?.codes && !isStale(slug)) {
        setCodes(local.codes); setLastFetch(new Date(local.ts)); return local.codes
      }
    }

    // 3. Llamar a Claude
    setRefreshing(true); setError(null)
    try {
      const result = await fetchFromClaude(gameName, gameCategory || 'RPG')
      if (result?.codes?.length > 0) {
        const now = new Date()
        setCodes(result.codes)
        saveLocal(slug, result.codes)
        setLastFetch(now)
        dbSaveCodes(slug, result.codes)  // guardar en BD (fire & forget)
        return result.codes
      }
    } catch(e) {
      setError('IA no disponible. Mostrando datos guardados.')
      // Usar caché local aunque sea vieja
      const local = loadLocal()[slug]
      if (local?.codes) { setCodes(local.codes); setLastFetch(new Date(local.ts)) }
    } finally {
      setRefreshing(false)
    }
    return null
  }, [slug, gameName, gameCategory, refreshing])

  // Auto-carga al montar
  useEffect(() => {
    if (!slug) return
    refresh(false)
    intervalRef.current = setInterval(() => refresh(true), INTERVAL_MS)
    return () => clearInterval(intervalRef.current)
  }, [slug]) // eslint-disable-line

  return {
    aiCodes: codes,
    refreshing,
    lastFetch,
    error,
    countdown,
    refresh: () => refresh(true),
  }
}
