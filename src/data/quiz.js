export const questions = [
  { id:1, q:"¿Cuál es tu estilo de juego?", emoji:"🎮",
    opts:[{t:"Explorar mundo abierto",v:"explorer"},{t:"Competir y ser el mejor",v:"competitive"},{t:"Socializar y hacer amigos",v:"social"},{t:"Coleccionar y mejorar",v:"collector"}]},
  { id:2, q:"¿Qué te motiva más?", emoji:"⚡",
    opts:[{t:"Conseguir objetos rarísimos",v:"collector"},{t:"Subir de nivel y hacerme más fuerte",v:"competitive"},{t:"Descubrir secretos y lore",v:"explorer"},{t:"Decorar y personalizar mi espacio",v:"social"}]},
  { id:3, q:"¿Con cuántos amigos juegas?", emoji:"👥",
    opts:[{t:"Solo, a mi ritmo",v:"competitive"},{t:"Con 1-2 amigos íntimos",v:"explorer"},{t:"¡Cuanta más gente mejor!",v:"social"},{t:"Depende del humor",v:"collector"}]},
  { id:4, q:"¿Qué superpoder elegirías?", emoji:"✨",
    opts:[{t:"Fuerza y poder de destrucción",v:"competitive"},{t:"Velocidad y libertad de movimiento",v:"explorer"},{t:"Magia y hechizos misteriosos",v:"collector"},{t:"Crear lo que imagine",v:"social"}]},
  { id:5, q:"¿Cuánto tiempo pasas en el avatar?", emoji:"⏰",
    opts:[{t:"Horas personalizando cada detalle",v:"social"},{t:"Lo mínimo, quiero jugar ya",v:"competitive"},{t:"Tengo colección de outfits completa",v:"collector"},{t:"Diseño mi estilo único",v:"explorer"}]},
]

export const results = {
  competitive: {
    game:"Blox Fruits", slug:"blox-fruits", emoji:"🍎",
    desc:"¡Eres un guerrero nato! Te encanta subir de nivel, hacerte más fuerte y dominar a los demás. Blox Fruits es tu mundo: frutas legendarias, PvP épico y convertirte en el pirata más temido de todos los mares.",
    traits:["Competitivo","Estratégico","Ambicioso"], color:"#f97316",
    tip:"Usa el código BIGNEWS para 2×EXP y sube de nivel antes que nadie."
  },
  social: {
    game:"Brookhaven RP", slug:"brookhaven", emoji:"🏙️",
    desc:"¡El alma de la fiesta! Conectar con otros jugadores y crear historias únicas es tu fuerte. Brookhaven te da libertad total para vivir tu vida virtual ideal con miles de amigos de todo el mundo.",
    traits:["Sociable","Creativo","Empático"], color:"#10b981",
    tip:"Crea un servidor con amigos y organizad roleplays con guiones propios. ¡Las mejores historias las hacéis vosotros!"
  },
  explorer: {
    game:"Fisch", slug:"fisch", emoji:"🎣",
    desc:"¡Un explorador paciente y curioso! Te gusta descubrir secretos, zonas ocultas y conseguir cosas raras poco a poco. Fisch tiene un mundo marino enorme lleno de peces secretos esperándote.",
    traits:["Curioso","Paciente","Detallista"], color:"#14b8a6",
    tip:"Ve al océano profundo durante la lluvia: es donde aparecen los peces más raros del juego."
  },
  collector: {
    game:"Sol's RNG", slug:"sol-s-rng", emoji:"🎲",
    desc:"¡Coleccionista de élite! La emoción de conseguir ese objeto de probabilidad 1 en un millón te tiene enganchado. Sol's RNG es pura adrenalina para alguien como tú.",
    traits:["Perfeccionista","Dedicado","Paciente"], color:"#a855f7",
    tip:"Usa el código LUCKY7 para boost ×2 de suerte. Actívalo cuando vayas a hacer una sesión larga de tiradas."
  },
}

export const calcResult = (answers) => {
  const cnt = {}
  answers.forEach(a => cnt[a] = (cnt[a]||0)+1)
  const winner = Object.entries(cnt).sort((a,b)=>b[1]-a[1])[0]
  return results[winner?.[0]] || results.competitive
}
