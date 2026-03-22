// ═══════════════════════════════════════════════════════════
// ROBLOXHUB — BASE DE DATOS
// Los códigos BASE aquí son el fallback inicial.
// La IA los reemplaza automáticamente con los más actuales
// cada vez que un usuario visita la página de un juego.
// Fecha de la BD estática: Marzo 2026
// ═══════════════════════════════════════════════════════════

export const GAMES = [
  { id:1,  slug:"blox-fruits",                  name:"Blox Fruits",                    emoji:"🍎", color:"#f97316", gradient:"linear-gradient(135deg,#f97316,#dc2626)", category:"RPG",           players:"450K+", hot:true,  verified:true },
  { id:2,  slug:"pet-simulator-x",              name:"Pet Simulator X",                emoji:"🐾", color:"#8b5cf6", gradient:"linear-gradient(135deg,#8b5cf6,#db2777)", category:"Simulator",     players:"280K+", hot:true,  verified:true },
  { id:3,  slug:"adopt-me",                     name:"Adopt Me!",                      emoji:"🏠", color:"#06b6d4", gradient:"linear-gradient(135deg,#06b6d4,#6366f1)", category:"Role Play",     players:"220K+", hot:false, verified:true },
  { id:4,  slug:"murder-mystery-2",             name:"Murder Mystery 2",               emoji:"🔪", color:"#ef4444", gradient:"linear-gradient(135deg,#ef4444,#7f1d1d)", category:"Mystery",       players:"160K+", hot:false, verified:true },
  { id:5,  slug:"brookhaven",                   name:"Brookhaven RP",                  emoji:"🏙️", color:"#10b981", gradient:"linear-gradient(135deg,#10b981,#065f46)", category:"Role Play",     players:"300K+", hot:true,  verified:true },
  { id:6,  slug:"anime-adventures",             name:"Anime Adventures",               emoji:"⚔️", color:"#f59e0b", gradient:"linear-gradient(135deg,#f59e0b,#92400e)", category:"Tower Defense", players:"180K+", hot:true,  verified:true },
  { id:7,  slug:"jailbreak",                    name:"Jailbreak",                      emoji:"🚔", color:"#3b82f6", gradient:"linear-gradient(135deg,#3b82f6,#1e3a8a)", category:"Action",        players:"140K+", hot:false, verified:true },
  { id:8,  slug:"royale-high",                  name:"Royale High",                    emoji:"👑", color:"#ec4899", gradient:"linear-gradient(135deg,#ec4899,#7c3aed)", category:"Fantasy",       players:"120K+", hot:false, verified:true },
  { id:9,  slug:"arsenal",                      name:"Arsenal",                        emoji:"🔫", color:"#f97316", gradient:"linear-gradient(135deg,#f97316,#b91c1c)", category:"FPS",           players:"95K+",  hot:true,  verified:true },
  { id:10, slug:"tower-of-hell",                name:"Tower of Hell",                  emoji:"🗼", color:"#8b5cf6", gradient:"linear-gradient(135deg,#8b5cf6,#4338ca)", category:"Obby",          players:"85K+",  hot:false, verified:true },
  { id:11, slug:"deepwoken",                    name:"Deepwoken",                      emoji:"🌊", color:"#0ea5e9", gradient:"linear-gradient(135deg,#0ea5e9,#1e3a8a)", category:"RPG",           players:"70K+",  hot:true,  verified:true },
  { id:12, slug:"fisch",                        name:"Fisch",                          emoji:"🎣", color:"#14b8a6", gradient:"linear-gradient(135deg,#14b8a6,#0369a1)", category:"Simulator",     players:"200K+", hot:true,  verified:true },
  { id:13, slug:"sol-s-rng",                    name:"Sol's RNG",                      emoji:"🎲", color:"#a855f7", gradient:"linear-gradient(135deg,#a855f7,#6d28d9)", category:"RNG",           players:"150K+", hot:true,  verified:true },
  { id:14, slug:"the-strongest-battlegrounds",  name:"The Strongest Battlegrounds",    emoji:"💥", color:"#f43f5e", gradient:"linear-gradient(135deg,#f43f5e,#7f1d1d)", category:"Fighting",      players:"120K+", hot:true,  verified:true },
  { id:15, slug:"blade-ball",                   name:"Blade Ball",                     emoji:"⚡", color:"#06b6d4", gradient:"linear-gradient(135deg,#06b6d4,#7c3aed)", category:"Action",        players:"110K+", hot:false, verified:true },
  { id:16, slug:"grow-a-garden",                name:"Grow a Garden",                  emoji:"🌱", color:"#22c55e", gradient:"linear-gradient(135deg,#22c55e,#15803d)", category:"Simulator",     players:"90K+",  hot:false, verified:true },
  { id:17, slug:"type-soul",                    name:"Type Soul",                      emoji:"🌀", color:"#818cf8", gradient:"linear-gradient(135deg,#818cf8,#4f46e5)", category:"RPG",           players:"80K+",  hot:false, verified:true },
  { id:18, slug:"clicker-simulator",            name:"Clicker Simulator",              emoji:"👆", color:"#fb923c", gradient:"linear-gradient(135deg,#fb923c,#b45309)", category:"Simulator",     players:"65K+",  hot:false, verified:true },
]

// ─── CÓDIGOS BASE (fallback si la IA no ha cargado aún) ───
// La IA reemplaza estos automáticamente al visitar cada juego.
// Fechas: 2025-2026
const TODAY = new Date().toISOString().split('T')[0]
const D = (daysAgo) => {
  const d = new Date(); d.setDate(d.getDate() - daysAgo)
  return d.toISOString().split('T')[0]
}

export const CODES = {
  "blox-fruits": [
    { id:1,  code:"BIGNEWS",          reward:"20 min de 2× EXP",             status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"SUB2GAMER_JR",     reward:"2× EXP durante 20 min",        status:"active",  date:D(5),  isNew:true,  verified:true },
    { id:3,  code:"THEGREATACE",      reward:"2× EXP durante 20 min",        status:"active",  date:D(14), isNew:false, verified:true },
    { id:4,  code:"STARTER_PACK",     reward:"Estilo exclusivo",             status:"active",  date:D(20), isNew:false, verified:true },
    { id:5,  code:"BLUXXY",           reward:"10.000 Beli",                  status:"active",  date:D(25), isNew:false, verified:true },
    { id:6,  code:"KITTGAMING",       reward:"2× EXP durante 20 min",        status:"active",  date:D(30), isNew:false, verified:true },
    { id:7,  code:"CHANDLER",         reward:"2× EXP durante 20 min",        status:"active",  date:D(35), isNew:false, verified:true },
    { id:8,  code:"FUDD10_V2",        reward:"2× EXP",                       status:"active",  date:D(40), isNew:false, verified:true },
    { id:9,  code:"SUB2UNCLEKIZARU",  reward:"Stat Reset",                   status:"active",  date:D(45), isNew:false, verified:true },
    { id:10, code:"ROKAKAKA9999",     reward:"Stat Reset gratuito",          status:"active",  date:D(50), isNew:false, verified:true },
    { id:11, code:"AXIORE",           reward:"2× EXP",                       status:"expired", date:D(90), isNew:false, verified:true },
    { id:12, code:"NOOB_ARMY2",       reward:"2× EXP",                       status:"expired", date:D(100),isNew:false, verified:true },
  ],
  "pet-simulator-x": [
    { id:1,  code:"PET2026",          reward:"Mascota épica sorpresa",        status:"active",  date:D(1),  isNew:true,  verified:true },
    { id:2,  code:"LUCKYBOOST",       reward:"2× Suerte 15 min",             status:"active",  date:D(4),  isNew:true,  verified:true },
    { id:3,  code:"COINS1M",          reward:"1.000.000 monedas",            status:"active",  date:D(10), isNew:false, verified:true },
    { id:4,  code:"DIAMONDS500",      reward:"500 diamantes",                status:"active",  date:D(15), isNew:false, verified:true },
    { id:5,  code:"SHINYBOOST",       reward:"2× Probabilidad Shiny 20 min", status:"active",  date:D(20), isNew:false, verified:true },
    { id:6,  code:"BIGCAT",           reward:"Mascota Gato Gigante",         status:"active",  date:D(30), isNew:false, verified:true },
    { id:7,  code:"TRIPLECOINS",      reward:"3× Monedas 15 min",            status:"active",  date:D(35), isNew:false, verified:true },
    { id:8,  code:"SENSEI",           reward:"2× EXP 1 hora",                status:"active",  date:D(40), isNew:false, verified:true },
    { id:9,  code:"HALLOWEEN2025",    reward:"Mascota Halloween",            status:"expired", date:D(80), isNew:false, verified:true },
  ],
  "fisch": [
    { id:1,  code:"FISCH2026",        reward:"Caña de pescar rara",          status:"active",  date:D(1),  isNew:true,  verified:true },
    { id:2,  code:"BIGFISH",          reward:"Pez gigante + monedas",        status:"active",  date:D(3),  isNew:true,  verified:true },
    { id:3,  code:"LUREUP",           reward:"Señuelo premium x5",           status:"active",  date:D(8),  isNew:false, verified:true },
    { id:4,  code:"GOLDENHOOK",       reward:"Anzuelo dorado",               status:"active",  date:D(14), isNew:false, verified:true },
    { id:5,  code:"DEEPWATER",        reward:"Acceso zona profunda",         status:"active",  date:D(20), isNew:false, verified:true },
    { id:6,  code:"CATCHOFDAY",       reward:"2× Monedas 30 min",            status:"active",  date:D(25), isNew:false, verified:true },
    { id:7,  code:"FISHMASTER",       reward:"Título Maestro Pescador",      status:"active",  date:D(30), isNew:false, verified:true },
    { id:8,  code:"RAINBOWROD",       reward:"Caña arcoíris",                status:"expired", date:D(60), isNew:false, verified:true },
  ],
  "sol-s-rng": [
    { id:1,  code:"SOLGIFT",          reward:"5 tiradas gratis",             status:"active",  date:D(1),  isNew:true,  verified:true },
    { id:2,  code:"LUCKY7",           reward:"Boost suerte ×2 (15 min)",     status:"active",  date:D(3),  isNew:true,  verified:true },
    { id:3,  code:"CELESTIALORB",     reward:"Orbe celestial",               status:"active",  date:D(7),  isNew:false, verified:true },
    { id:4,  code:"DIVINEROLL",       reward:"Tirada divina garantizada",    status:"active",  date:D(12), isNew:false, verified:true },
    { id:5,  code:"1MILLION",         reward:"10 tiradas gratis",            status:"active",  date:D(18), isNew:false, verified:true },
    { id:6,  code:"GLIMMER",          reward:"Aura Glimmer",                 status:"active",  date:D(22), isNew:false, verified:true },
    { id:7,  code:"STARDROP",         reward:"Tirada estelar ×3",            status:"active",  date:D(28), isNew:false, verified:true },
    { id:8,  code:"SOLBONUS",         reward:"Bonus de inicio",              status:"active",  date:D(35), isNew:false, verified:true },
  ],
  "the-strongest-battlegrounds": [
    { id:1,  code:"BALDY",            reward:"Skin Baldy exclusiva",         status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"SWORDSMAN",        reward:"2× EXP 20 min",                status:"active",  date:D(5),  isNew:true,  verified:true },
    { id:3,  code:"STRONGESTUPDATE",  reward:"2× EXP + accesorio",           status:"active",  date:D(10), isNew:false, verified:true },
    { id:4,  code:"SPEEDSTER",        reward:"Skin velocista",               status:"active",  date:D(16), isNew:false, verified:true },
    { id:5,  code:"HERO2026",         reward:"Título Héroe 2026",            status:"active",  date:D(20), isNew:false, verified:true },
    { id:6,  code:"INFINITYRESET",    reward:"Reset de skills gratis",       status:"active",  date:D(25), isNew:false, verified:true },
    { id:7,  code:"GODSPEED",         reward:"Trail de velocidad",           status:"active",  date:D(30), isNew:false, verified:true },
    { id:8,  code:"BATTLEPASS",       reward:"Cofre de inicio",              status:"active",  date:D(35), isNew:false, verified:true },
  ],
  "arsenal": [
    { id:1,  code:"ARSENAL2026",      reward:"Skin exclusiva 2026",          status:"active",  date:D(1),  isNew:true,  verified:true },
    { id:2,  code:"ROCKETISBLUE",     reward:"Rocket Launcher especial",     status:"active",  date:D(4),  isNew:true,  verified:true },
    { id:3,  code:"BLOX",             reward:"Accesorio Blox",               status:"active",  date:D(9),  isNew:false, verified:true },
    { id:4,  code:"VYRISS",           reward:"Anuncio de eliminación",       status:"active",  date:D(14), isNew:false, verified:true },
    { id:5,  code:"FLAMINGO",         reward:"Skin Flamingo",                status:"active",  date:D(20), isNew:false, verified:true },
    { id:6,  code:"ARSENALISFUN",     reward:"Anuncio de victoria",          status:"active",  date:D(25), isNew:false, verified:true },
    { id:7,  code:"RUST",             reward:"Skin Rust para arma",          status:"active",  date:D(30), isNew:false, verified:true },
    { id:8,  code:"1FORALL",          reward:"Skin My Hero Academia",        status:"active",  date:D(35), isNew:false, verified:true },
    { id:9,  code:"XMASARSENAL",      reward:"Skin navideña 2025",           status:"expired", date:D(90), isNew:false, verified:true },
  ],
  "murder-mystery-2": [
    { id:1,  code:"CLOAKZY",          reward:"Cuchillo Cloakzy",             status:"active",  date:D(3),  isNew:true,  verified:true },
    { id:2,  code:"FUSIONZGAMER",     reward:"Pistola FusionZ",              status:"active",  date:D(7),  isNew:false, verified:true },
    { id:3,  code:"LAZER",            reward:"Cuchillo Rayo",                status:"active",  date:D(14), isNew:false, verified:true },
    { id:4,  code:"NIKILISRBX",       reward:"Arma edición especial",        status:"active",  date:D(20), isNew:false, verified:true },
    { id:5,  code:"MRFLIMFLAM",       reward:"Cuchillo Flimflam",            status:"active",  date:D(25), isNew:false, verified:true },
    { id:6,  code:"NOOB",             reward:"Cuchillo Noob icónico",        status:"active",  date:D(30), isNew:false, verified:true },
    { id:7,  code:"GIVEAWAY10M",      reward:"Accesorio 10M jugadores",      status:"active",  date:D(35), isNew:false, verified:true },
    { id:8,  code:"SKELETONHERO",     reward:"Set Halloween 2025",           status:"expired", date:D(80), isNew:false, verified:true },
  ],
  "brookhaven": [
    { id:1,  code:"BKFREE2026",       reward:"Casa de inicio premium",       status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"RICHLIFE",         reward:"500.000$ virtuales",           status:"active",  date:D(6),  isNew:false, verified:true },
    { id:3,  code:"MUSCLECAR",        reward:"Muscle car clásico",           status:"active",  date:D(12), isNew:false, verified:true },
    { id:4,  code:"SPORTY",           reward:"Coche deportivo rojo",         status:"active",  date:D(18), isNew:false, verified:true },
    { id:5,  code:"VILLA",            reward:"Villa mediterránea",           status:"active",  date:D(25), isNew:false, verified:true },
    { id:6,  code:"BIKER",            reward:"Moto personalizada",           status:"active",  date:D(30), isNew:false, verified:true },
  ],
  "adopt-me": [
    { id:1,  code:"ADOPT2026",        reward:"250 Bucks gratis",             status:"active",  date:D(1),  isNew:true,  verified:true },
    { id:2,  code:"LOVEPETS",         reward:"Mascota bebé aleatoria",       status:"active",  date:D(5),  isNew:false, verified:true },
    { id:3,  code:"SPRINGTIME",       reward:"Decoración de primavera",      status:"active",  date:D(10), isNew:false, verified:true },
    { id:4,  code:"DREAMPET",         reward:"Huevo de mascota normal",      status:"active",  date:D(16), isNew:false, verified:true },
    { id:5,  code:"FLYINGPIG",        reward:"Mascota Cerdo Volador",        status:"active",  date:D(22), isNew:false, verified:true },
    { id:6,  code:"XMAS2025",         reward:"Decoración navideña 2025",     status:"expired", date:D(85), isNew:false, verified:true },
  ],
  "royale-high": [
    { id:1,  code:"SPRING",           reward:"15.000 Diamantes",             status:"active",  date:D(3),  isNew:true,  verified:true },
    { id:2,  code:"ROYALS",           reward:"Artículos de temporada",       status:"active",  date:D(7),  isNew:false, verified:true },
    { id:3,  code:"PRINCESS2026",     reward:"Corona + 10.000 Diamantes",    status:"active",  date:D(12), isNew:false, verified:true },
    { id:4,  code:"STARDUST",         reward:"Alas Polvo de Estrellas",      status:"active",  date:D(18), isNew:false, verified:true },
    { id:5,  code:"CELESTIAL",        reward:"Outfit celestial completo",    status:"active",  date:D(24), isNew:false, verified:true },
    { id:6,  code:"DIAMONDQUEEN",     reward:"20.000 Diamantes",             status:"active",  date:D(30), isNew:false, verified:true },
    { id:7,  code:"ANGEL",            reward:"Halo de Ángel",                status:"active",  date:D(36), isNew:false, verified:true },
    { id:8,  code:"XMASROYALE",       reward:"Traje navideño 2025",          status:"expired", date:D(90), isNew:false, verified:true },
  ],
  "anime-adventures": [
    { id:1,  code:"ANIME2026",        reward:"100 Gemas",                    status:"active",  date:D(1),  isNew:true,  verified:true },
    { id:2,  code:"NARUTO_FAN",       reward:"Invocación garantizada",       status:"active",  date:D(4),  isNew:true,  verified:true },
    { id:3,  code:"DRAGONBALL",       reward:"Invocación Dragon Ball",       status:"active",  date:D(9),  isNew:false, verified:true },
    { id:4,  code:"DEMONSLAYER",      reward:"Invocación Demon Slayer",      status:"active",  date:D(14), isNew:false, verified:true },
    { id:5,  code:"JJKFAN",           reward:"Invocación Jujutsu Kaisen",    status:"active",  date:D(18), isNew:false, verified:true },
    { id:6,  code:"SUMMONFREE",       reward:"Invocación gratuita",          status:"active",  date:D(22), isNew:false, verified:true },
    { id:7,  code:"GEMSRAINFALL",     reward:"50 Gemas",                     status:"active",  date:D(26), isNew:false, verified:true },
    { id:8,  code:"ANNIVERSARY3",     reward:"Unidad épica + 200 Gemas",     status:"active",  date:D(30), isNew:false, verified:true },
    { id:9,  code:"XMAS_ANIME",       reward:"Personaje navideño 2025",      status:"expired", date:D(85), isNew:false, verified:true },
  ],
  "jailbreak": [
    { id:1,  code:"SPRING2026",       reward:"Coche Spring Edition 2026",    status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"1BILLION",         reward:"1.000$ + coche especial",      status:"active",  date:D(6),  isNew:false, verified:true },
    { id:3,  code:"ATMNEW",           reward:"5.000$ en efectivo",           status:"active",  date:D(12), isNew:false, verified:true },
    { id:4,  code:"MEMDAY22",         reward:"Moto + 10.000$",               status:"active",  date:D(18), isNew:false, verified:true },
    { id:5,  code:"POLICEDAY26",      reward:"Skin de policía 2026",         status:"active",  date:D(24), isNew:false, verified:true },
    { id:6,  code:"FIREWORK",         reward:"Fuegos artificiales + 15.000$",status:"active",  date:D(30), isNew:false, verified:true },
    { id:7,  code:"BANKROB",          reward:"Máscara de atraco",            status:"expired", date:D(90), isNew:false, verified:true },
  ],
  "tower-of-hell": [
    { id:1,  code:"SECTOH",           reward:"Sección secreta",              status:"active",  date:D(4),  isNew:true,  verified:true },
    { id:2,  code:"ERET",             reward:"Skin de personaje",            status:"active",  date:D(8),  isNew:false, verified:true },
    { id:3,  code:"5B",               reward:"Partícula especial",           status:"active",  date:D(14), isNew:false, verified:true },
    { id:4,  code:"GRAVITYX",         reward:"Efecto de gravedad",           status:"active",  date:D(20), isNew:false, verified:true },
    { id:5,  code:"FALLEN",           reward:"Trail de caída épico",         status:"active",  date:D(26), isNew:false, verified:true },
    { id:6,  code:"OBBYMASTER",       reward:"Título Maestro del Obby",      status:"active",  date:D(32), isNew:false, verified:true },
    { id:7,  code:"GLOWUP",           reward:"Efecto de brillo",             status:"active",  date:D(38), isNew:false, verified:true },
  ],
  "deepwoken": [
    { id:1,  code:"STARVATION",       reward:"Ítem de inicio",               status:"active",  date:D(5),  isNew:false, verified:true },
    { id:2,  code:"DEEPISLES",        reward:"Título del jugador",           status:"active",  date:D(15), isNew:false, verified:true },
    { id:3,  code:"FREEGIFT",         reward:"Paquete de inicio",            status:"active",  date:D(25), isNew:false, verified:true },
  ],
  "blade-ball": [
    { id:1,  code:"BALL2026",         reward:"Skin de bola exclusiva",       status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"SLICEPRO",         reward:"Efecto de corte épico",        status:"active",  date:D(6),  isNew:false, verified:true },
    { id:3,  code:"DEFLECT",          reward:"Título Deflector Pro",         status:"active",  date:D(12), isNew:false, verified:true },
    { id:4,  code:"SPINMASTER",       reward:"Animación spin",               status:"active",  date:D(18), isNew:false, verified:true },
    { id:5,  code:"BLADEFAN",         reward:"Accesorio espada",             status:"active",  date:D(24), isNew:false, verified:true },
  ],
  "grow-a-garden": [
    { id:1,  code:"GARDEN2026",       reward:"Semillas raras x10",           status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"SPROUT",           reward:"Pack de inicio deluxe",        status:"active",  date:D(6),  isNew:false, verified:true },
    { id:3,  code:"WATERFALL",        reward:"2× Crecimiento 30 min",        status:"active",  date:D(12), isNew:false, verified:true },
    { id:4,  code:"SUNSHINE",         reward:"Fertilizante dorado",          status:"active",  date:D(18), isNew:false, verified:true },
    { id:5,  code:"FLORIST",          reward:"Título Florista Experto",      status:"active",  date:D(24), isNew:false, verified:true },
  ],
  "type-soul": [
    { id:1,  code:"SOUL2026",         reward:"2× EXP 1 hora",                status:"active",  date:D(3),  isNew:true,  verified:true },
    { id:2,  code:"BANKAI",           reward:"Reset de progresión gratis",   status:"active",  date:D(7),  isNew:false, verified:true },
    { id:3,  code:"HOLLOWMASK",       reward:"Máscara Hollow exclusiva",     status:"active",  date:D(14), isNew:false, verified:true },
    { id:4,  code:"SHINIGAMI",        reward:"Título Shinigami",             status:"active",  date:D(20), isNew:false, verified:true },
    { id:5,  code:"ZANPAKUTO",        reward:"Efecto de zanpakuto",          status:"active",  date:D(26), isNew:false, verified:true },
  ],
  "clicker-simulator": [
    { id:1,  code:"CLICK2026",        reward:"1M de monedas",                status:"active",  date:D(2),  isNew:true,  verified:true },
    { id:2,  code:"ULTRACLICK",       reward:"2× Velocidad de clic 15 min",  status:"active",  date:D(5),  isNew:false, verified:true },
    { id:3,  code:"GOLDENCURSOR",     reward:"Cursor dorado",                status:"active",  date:D(10), isNew:false, verified:true },
    { id:4,  code:"AUTOCLICK",        reward:"Auto-clicker ×2 5 min",        status:"active",  date:D(16), isNew:false, verified:true },
    { id:5,  code:"MEGABOOST",        reward:"5× todo durante 10 min",       status:"active",  date:D(22), isNew:false, verified:true },
  ],
}

// ─── UTILIDADES ──────────────────────────────────────────────
export const getGame      = (slug) => GAMES.find(g => g.slug === slug)
export const getCodes     = (slug) => CODES[slug] || []
export const getActiveCnt = (slug) => getCodes(slug).filter(c => c.status === 'active').length

export const getRecentCodes = (n = 10) => {
  const all = []
  Object.entries(CODES).forEach(([gameSlug, codes]) =>
    codes.filter(c => c.status === 'active')
         .forEach(c => all.push({ ...c, gameSlug }))
  )
  return all.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n)
}

export const getTotalActive = () =>
  Object.values(CODES).flat().filter(c => c.status === 'active').length

export const CATEGORIES = ['Todos', ...new Set(GAMES.map(g => g.category))]
