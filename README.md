# 🎮 RobloxHub v2.0 — Portal Viral de Roblox

**El portal #1 de Roblox en español**, construido para hacerse viral.
Datos reales, IA integrada, actualización automática y diseño de nivel AAA.

---

## 🚀 Inicio rápido

```bash
npm install
npm run dev          # → http://localhost:5173
npm run build        # Build para producción
```

---

## 📊 Lo que incluye

| | |
|---|---|
| **Juegos con códigos** | 18 (Blox Fruits, Fisch, Sol's RNG, TSB, Arsenal y más) |
| **Códigos verificados** | 150 activos + 19 expirados = **169 total** |
| **Guías completas** | 8 (Studio, Blox Fruits, Lua, Fisch, Sol's RNG, TSB, Principiantes, Robux) |
| **Agentes IA** | 3 (Códigos, Juegos, Guías) |
| **Actualización IA** | Cada hora automáticamente |

---

## 🤖 Los 3 Agentes de IA (`/ia`)

### Agente Códigos
- Selecciona cualquier juego → la IA genera 8-15 códigos específicos
- Botón copiar en cada código activo
- Instrucciones de canje por juego

### Agente Juegos
- Escribe el nombre de CUALQUIER juego de Roblox
- La IA lo añade con descripción, categoría, jugadores, emoji y gradiente
- Procesamiento individual o en lote de toda la cola

### Agente Guías
- Selecciona cualquier juego → la IA genera guía completa
- 6-8 pasos con consejos prácticos
- Acordeón expandible, tips y errores comunes

### Actualización automática
- El hook `useAutoRefresh` actualiza códigos cada hora automáticamente
- Persiste en `localStorage`: los datos sobreviven recargas
- Countdown visual hasta la próxima actualización

---

## ▲ Desplegar en Vercel (GRATIS)

### Opción 1 — Desde GitHub (recomendado):
1. Sube a GitHub: `git init && git add . && git commit -m "RobloxHub v2" && git push`
2. Ve a **vercel.com** → New Project → importa el repo
3. Framework: **Vite** | Build: `npm run build` | Output: `dist`
4. Deploy ✅

### Opción 2 — CLI:
```bash
npm install -g vercel
vercel
```

El `vercel.json` ya está configurado con:
- SPA routing (todas las rutas van a index.html)
- Headers de seguridad (X-Frame-Options, XSS Protection)
- Cache inmutable para assets

---

## 💰 Google AdSense

### Paso 1 — Script en `index.html` (línea ~40):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TU_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

### Paso 2 — Activar placeholders en `src/components/ui/AdSense.jsx`:

Cada componente tiene comentarios exactos. Ejemplo para `AdBanner`:
```jsx
// Reemplaza el <div className="ad-wrap"> por:
<ins className="adsbygoogle" style={{display:'block'}}
  data-ad-client="ca-pub-TU_ID"
  data-ad-slot="TU_SLOT"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
```

### Ubicaciones en la web:
| Componente | Aparece en | Tamaño |
|---|---|---|
| `AdBanner` | Todas las páginas (top) | 728×90 |
| `AdInline` | Entre contenido | Fluid in-article |
| `AdRect` | Sidebar desktop | 300×250 |

---

## 🔧 Añadir contenido sin código

### Nuevo juego — `src/data/db.js`:
```js
{ id:19, slug:"nuevo-juego", name:"Nuevo Juego", emoji:"🎯",
  color:"#ff6600", gradient:"linear-gradient(135deg,#ff6600,#cc0000)",
  category:"Action", players:"50K+", hot:false, verified:true }
```

### Nuevos códigos — `src/data/db.js`:
```js
"nuevo-juego": [
  { id:1, code:"CODIGO2024", reward:"Premio", status:"active", date:"2024-03-20", isNew:true, verified:true }
]
```

### Nueva guía — `src/data/guides.js`:
```js
{ id:9, slug:"mi-guia", title:"Mi Guía", description:"Desc...",
  category:"Tips", emoji:"💡", readTime:"8 min", difficulty:"Principiante",
  date:"2024-03-25", isNew:true,
  steps:[{title:"Paso 1",content:"...",tip:"..."}],
  tips:["Tip 1"], errors:[{error:"Error",solution:"Solución"}] }
```

---

## ⚠️ Nota sobre la API de IA en producción

Los agentes de IA llaman a la API de Anthropic directamente desde el frontend. Para producción segura, crea un proxy:

### Vercel Edge Function (`/api/claude.js`):
```js
export default async function handler(req) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body)
  })
  return new Response(await res.text(), { headers: {'Content-Type':'application/json'} })
}
```

Añade `ANTHROPIC_API_KEY` en Vercel → Settings → Environment Variables.

---

## 📁 Estructura completa

```
src/
├── App.jsx                    ← Routing principal
├── index.css                  ← Sistema de diseño completo
├── main.jsx
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         ← Nav con búsqueda y dark mode
│   │   ├── Footer.jsx         ← Footer con todos los juegos
│   │   └── Ticker.jsx         ← Ticker live de códigos
│   └── ui/
│       ├── AdSense.jsx        ← 3 formatos de anuncio
│       ├── SearchModal.jsx    ← Búsqueda global (juegos+guías+códigos)
│       └── SEO.jsx            ← Meta tags dinámicos
├── data/
│   ├── db.js                  ← 18 juegos + 169 códigos verificados
│   ├── guides.js              ← 8 guías completas
│   └── quiz.js                ← 5 preguntas + 4 resultados
├── hooks/
│   ├── useClaudeAI.js         ← Hook central para llamadas a IA
│   ├── useAIStore.js          ← Store persistente para datos IA
│   └── useAutoRefresh.js      ← Auto-actualización horaria
└── pages/
    ├── Home.jsx               ← Hero + stats + juegos + códigos + guías
    ├── CodesPage.jsx          ← Grid de juegos con búsqueda/filtros
    ├── GamePage.jsx           ← Códigos + refresh IA + sidebar
    ├── GuidesPage.jsx         ← Grid de guías con categorías
    ├── GuidePage.jsx          ← Guía completa con acordeón
    ├── QuizPage.jsx           ← Quiz interactivo
    ├── NotFound.jsx           ← 404 personalizado
    └── ai/
        └── AICenter.jsx       ← Los 3 agentes en un hub
```

---

*© 2024 RobloxHub · No afiliado con Roblox Corporation*
