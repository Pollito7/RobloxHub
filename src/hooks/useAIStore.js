// src/hooks/useAIStore.js
// Store para sugerencias y juegos IA — sincroniza con /api/db (Railway PostgreSQL)
import { useState, useEffect, useCallback } from 'react'

const LOCAL_KEY = 'rhub_ai_v3'
const DEFAULT = { aiGames:[], suggestions:[], aiGuides:[] }

// caché local para UI instantánea
let _store = (() => { try { return {...DEFAULT,...JSON.parse(localStorage.getItem(LOCAL_KEY)||'{}')} } catch { return DEFAULT } })()
let _subs = []
const persist = () => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(_store)) } catch {} }
const mutate = fn => { _store = fn(_store); persist(); _subs.forEach(f=>f({..._store})) }

// ── Helpers BD ──────────────────────────────────────────
async function dbPost(body) {
  try {
    const r = await fetch('/api/db', {
      method: 'POST', headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    })
    return r.ok
  } catch { return false }
}

async function dbGet(action, extra='') {
  try {
    const r = await fetch(`/api/db?action=${action}${extra}`)
    return r.ok ? await r.json() : null
  } catch { return null }
}

// ── Hook ──────────────────────────────────────────────────
export function useAIStore() {
  const [s, set] = useState(() => ({..._store}))

  useEffect(() => {
    _subs.push(set)
    // Sincronizar con BD al montar
    Promise.all([
      dbGet('getAIGames'),
      dbGet('getSuggestions')
    ]).then(([gamesRes, sugRes]) => {
      mutate(st => ({
        ...st,
        aiGames: gamesRes?.games ?? st.aiGames,
        suggestions: sugRes?.suggestions?.map(s => ({
          id: s.id, name: s.name, status: s.status
        })) ?? st.suggestions,
      }))
    })
    return () => { _subs = _subs.filter(f=>f!==set) }
  }, [])

  const addGame = useCallback(async (g) => {
    mutate(st => ({
      ...st,
      aiGames: st.aiGames.some(x=>x.slug===g.slug)
        ? st.aiGames
        : [...st.aiGames, {...g, aiGenerated:true}]
    }))
    await dbPost({ action:'saveGame', game:{...g, aiGenerated:true} })
  }, [])

  const addSuggestion = useCallback(async (name) => {
    const tmp = { id: Date.now(), name, status:'pending' }
    mutate(st => ({ ...st, suggestions: [...st.suggestions, tmp] }))
    await dbPost({ action:'addSuggestion', name })
  }, [])

  const removeSuggestion = useCallback(async (id) => {
    mutate(st => ({ ...st, suggestions: st.suggestions.filter(x=>x.id!==id) }))
    await dbPost({ action:'deleteSuggestion', id })
  }, [])

  const removeGame = useCallback((slug) => {
    mutate(st => ({ ...st, aiGames: st.aiGames.filter(g=>g.slug!==slug) }))
  }, [])

  const addGuide = useCallback((guide) => {
    mutate(st => ({
      ...st,
      aiGuides: st.aiGuides.some(g=>g.slug===guide.slug)
        ? st.aiGuides.map(g=>g.slug===guide.slug?guide:g)
        : [...st.aiGuides, {...guide, aiGenerated:true}]
    }))
  }, [])

  const clearAll = useCallback(() => mutate(() => DEFAULT), [])

  return { ...s, addGame, addSuggestion, removeSuggestion, removeGame, addGuide, clearAll }
}
