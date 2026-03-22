// api/db.js
// ─────────────────────────────────────────────────────────────
// Vercel Serverless Function — CRUD para Railway PostgreSQL
//
// Variables de entorno:
//   POSTGRES_URL = postgresql://user:pass@host:port/dbname
//
// Endpoints:
//   GET  /api/db?action=getSuggestions
//   GET  /api/db?action=getAICodes&slug=blox-fruits
//   POST /api/db  { action: 'addSuggestion', name: '...' }
//   POST /api/db  { action: 'saveCodes', slug: '...', codes: [...] }
//   POST /api/db  { action: 'saveGame', game: {...} }
//   GET  /api/db?action=getAIGames
// ─────────────────────────────────────────────────────────────

export const config = { runtime: 'nodejs18.x' }

// Mini cliente PostgreSQL sin dependencias externas
async function query(sql, params = []) {
  const url = process.env.POSTGRES_URL
  if (!url) throw new Error('POSTGRES_URL no configurada')

  // Usamos el cliente nativo de Vercel Postgres (disponible en Edge/Node runtimes)
  // Si no tienes @vercel/postgres, se puede usar fetch al endpoint de Railway
  const { Client } = await import('pg')
  const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } })
  await client.connect()
  try {
    const res = await client.query(sql, params)
    return res.rows
  } finally {
    await client.end()
  }
}

// Crea las tablas si no existen
async function initDB() {
  await query(`
    CREATE TABLE IF NOT EXISTS suggestions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
  await query(`
    CREATE TABLE IF NOT EXISTS ai_codes (
      id SERIAL PRIMARY KEY,
      game_slug TEXT NOT NULL,
      codes JSONB NOT NULL,
      fetched_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(game_slug)
    )
  `)
  await query(`
    CREATE TABLE IF NOT EXISTS ai_games (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).setHeader('Access-Control-Allow-Origin', '*').end()
  }

  Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v))

  try {
    await initDB()

    if (req.method === 'GET') {
      const { action, slug } = req.query

      if (action === 'getSuggestions') {
        const rows = await query("SELECT * FROM suggestions WHERE status='pending' ORDER BY created_at DESC")
        return res.status(200).json({ suggestions: rows })
      }

      if (action === 'getAICodes' && slug) {
        const rows = await query(
          "SELECT codes, fetched_at FROM ai_codes WHERE game_slug=$1",
          [slug]
        )
        if (rows.length === 0) return res.status(200).json({ codes: null, fetched_at: null })
        return res.status(200).json({ codes: rows[0].codes, fetched_at: rows[0].fetched_at })
      }

      if (action === 'getAIGames') {
        const rows = await query("SELECT data FROM ai_games ORDER BY created_at DESC")
        return res.status(200).json({ games: rows.map(r => r.data) })
      }

      return res.status(400).json({ error: 'Acción no válida' })
    }

    if (req.method === 'POST') {
      const body = req.body

      if (body.action === 'addSuggestion') {
        const name = body.name?.trim()
        if (!name) return res.status(400).json({ error: 'Nombre requerido' })
        await query("INSERT INTO suggestions (name) VALUES ($1)", [name])
        return res.status(200).json({ ok: true })
      }

      if (body.action === 'saveCodes') {
        const { slug, codes } = body
        if (!slug || !codes) return res.status(400).json({ error: 'Faltan datos' })
        await query(
          "INSERT INTO ai_codes (game_slug, codes, fetched_at) VALUES ($1, $2, NOW()) ON CONFLICT (game_slug) DO UPDATE SET codes=$2, fetched_at=NOW()",
          [slug, JSON.stringify(codes)]
        )
        // Marcar sugerencia como completada si existe
        await query("UPDATE suggestions SET status='done' WHERE LOWER(name)=LOWER($1)", [slug.replace(/-/g, ' ')])
        return res.status(200).json({ ok: true })
      }

      if (body.action === 'saveGame') {
        const { game } = body
        if (!game?.slug) return res.status(400).json({ error: 'Datos del juego requeridos' })
        await query(
          "INSERT INTO ai_games (slug, data) VALUES ($1, $2) ON CONFLICT (slug) DO UPDATE SET data=$2",
          [game.slug, JSON.stringify(game)]
        )
        return res.status(200).json({ ok: true })
      }

      if (body.action === 'deleteSuggestion') {
        await query("DELETE FROM suggestions WHERE id=$1", [body.id])
        return res.status(200).json({ ok: true })
      }

      return res.status(400).json({ error: 'Acción no válida' })
    }

    return res.status(405).json({ error: 'Método no permitido' })

  } catch (err) {
    console.error('DB Error:', err)
    return res.status(500).json({ error: err.message })
  }
}
