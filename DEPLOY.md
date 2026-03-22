# 🚀 RobloxHub — Guía de Despliegue Completa

## Arquitectura

```
Frontend (React/Vite) → Vercel
       ↓ /api/claude  (Edge Function)  ← ANTHROPIC_API_KEY
       ↓ /api/db      (Node Function)  ← POSTGRES_URL
                                              ↓
                                    Railway PostgreSQL
```

**No necesitas ningún servidor propio.** Todo corre en Vercel + Railway (ambos tienen plan gratuito).

---

## PASO 1 — Subir a GitHub

```bash
# 1. Entra a la carpeta del proyecto
cd roblox-web

# 2. Inicializa git (si no lo has hecho)
git init
git add .
git commit -m "RobloxHub v2 - Initial commit"

# 3. Crea un repo en github.com (sin README, vacío)
#    y luego conecta:
git remote add origin https://github.com/TU_USUARIO/robloxhub.git
git branch -M main
git push -u origin main
```

---

## PASO 2 — Crear base de datos en Railway (GRATIS)

1. Ve a **railway.app** y crea cuenta (gratis con GitHub)
2. Clic en **"New Project"** → **"Provision PostgreSQL"**
3. Una vez creado, clic en la base de datos → pestaña **"Connect"**
4. Copia la **"Postgres Connection URL"** — tiene este formato:
   ```
   postgresql://postgres:CONTRASEÑA@HOST:PORT/railway
   ```
5. Guárdala, la necesitas en el paso 3.

> ⚠️ Railway da 5$ de crédito gratis al mes — suficiente para este proyecto.

---

## PASO 3 — Desplegar en Vercel

### 3A — Conectar el repo

1. Ve a **vercel.com** → "Add New Project"
2. Importa tu repo de GitHub `robloxhub`
3. Configuración:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3B — Añadir variables de entorno (¡MUY IMPORTANTE!)

En Vercel → tu proyecto → **Settings → Environment Variables**, añade:

| Variable | Valor | Entornos |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` (tu clave de Anthropic) | Production, Preview, Development |
| `POSTGRES_URL` | `postgresql://postgres:...@railway...` (de Railway) | Production, Preview, Development |

### 3C — Despliega

Clic en **"Deploy"** ✅

Tu web estará en: `https://robloxhub.vercel.app`

---

## PASO 4 — Obtener tu API Key de Anthropic

1. Ve a **console.anthropic.com**
2. Crea cuenta (gratis, da créditos iniciales)
3. Ve a **API Keys** → **Create Key**
4. Copia la clave (`sk-ant-api03-...`)
5. Pégala en Vercel como `ANTHROPIC_API_KEY`

> 💡 Anthropic da $5 de créditos gratis al registrarte. Con uso moderado dura meses.

---

## PASO 5 — Probar en local

```bash
# Instalar dependencias
npm install

# Crear archivo .env.local con tus claves
echo "ANTHROPIC_API_KEY=sk-ant-api03-TU_CLAVE" > .env.local
echo "POSTGRES_URL=postgresql://..." >> .env.local

# Instalar Vercel CLI para las funciones
npm install -g vercel

# Ejecutar con funciones serverless en local
vercel dev
# → http://localhost:3000
```

> Sin `vercel dev`, los agentes IA no funcionan en local (necesitan las API routes).
> Con solo `npm run dev` funciona todo excepto los 3 agentes de IA.

---

## Actualizaciones futuras

```bash
# Cada vez que cambies código:
git add .
git commit -m "Descripción del cambio"
git push

# Vercel detecta el push y redespliega automáticamente ✅
```

---

## Estructura de archivos clave

```
roblox-web/
├── api/
│   ├── claude.js    ← Proxy para Claude (Edge Function)
│   └── db.js        ← CRUD PostgreSQL (Node Function)
├── src/
│   ├── hooks/
│   │   ├── useClaudeAI.js      ← Llama a /api/claude
│   │   ├── useAutoRefresh.js   ← Auto-actualiza códigos cada hora
│   │   └── useAIStore.js       ← Sincroniza con /api/db
│   └── pages/ai/
│       └── AICenter.jsx        ← Los 3 agentes IA
├── vercel.json      ← Config de rutas y funciones
└── .env.local       ← Variables locales (NO subir a git)
```

---

## FAQ

**¿Por qué no funciona la IA?**
→ Falta `ANTHROPIC_API_KEY` en Vercel Environment Variables.

**¿Por qué no se guardan los datos?**
→ Falta `POSTGRES_URL` en Vercel Environment Variables.

**¿Cómo añado mi dominio propio?**
→ Vercel → Settings → Domains → Add Domain.

**¿Los códigos se actualizan solos?**
→ Sí. Al visitar la página de un juego, la IA busca códigos actualizados automáticamente si han pasado más de 1 hora desde la última vez.

**¿Es gratis todo?**
→ Sí para empezar:
- Vercel: gratuito (Hobby plan)
- Railway: 5$/mes de créditos gratis
- Anthropic: 5$ de créditos iniciales gratis
