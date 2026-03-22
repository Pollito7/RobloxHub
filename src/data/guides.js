export const guides = [
  {
    id: 1,
    slug: "como-hacer-un-juego-en-roblox",
    title: "Cómo hacer tu primer juego en Roblox Studio 2024",
    description: "Guía completa paso a paso: desde descargar Studio hasta publicar tu juego. Scripting en Lua, construcción, GUIs y multijugador.",
    category: "Desarrollo", emoji: "🎮", readTime: "20 min", difficulty: "Principiante",
    date: "2024-03-18", isNew: true,
    steps: [
      { title: "Descarga Roblox Studio", content: "Ve a create.roblox.com y descarga Studio gratis. Disponible para Windows y Mac. Necesitas cuenta de Roblox. La instalación ocupa ~2 GB.", tip: "Necesitas al menos 4 GB de RAM y Windows 10 / macOS 10.13 o superior." },
      { title: "Conoce la interfaz", content: "Los paneles clave son: Explorer (árbol de objetos), Properties (propiedades), Toolbox (librería) y Viewport (vista 3D). Mueve la cámara con click derecho + WASD.", tip: "Activa View > Output para ver errores en tiempo real. Es imprescindible." },
      { title: "Elige plantilla base", content: "En la pantalla de inicio elige 'Baseplate'. Es la más limpia para empezar. Otras plantillas como Castle o Suburban sirven de inspiración pero añaden complejidad.", tip: "F5 prueba el juego sin publicar. Úsalo constantemente mientras desarrollas." },
      { title: "Construye con Parts", content: "Model > Part inserta un bloque. Teclas: W=mover, E=rotar, R=escalar. Cambia color en Properties > BrickColor. Para paredes usa partes largas y delgadas.", tip: "Ctrl+D duplica objetos al instante. Shift+Click selecciona múltiples piezas." },
      { title: "Escribe tu primer Script", content: "Click derecho en ServerScriptService > Insert Script. Escribe: print('¡Hola Roblox!'). Presiona F5 y verás el mensaje en Output. Lua es el lenguaje de Roblox.", tip: "Los errores en rojo en Output siempre indican la línea del problema." },
      { title: "Crea mecánicas con eventos", content: "Toca una parte: parte.Touched:Connect(function(hit) if hit.Parent:FindFirstChild('Humanoid') then print('¡Tocado!') end end). Esto detecta al jugador tocando el objeto.", tip: "Siempre verifica FindFirstChild('Humanoid') para confirmar que es un jugador, no otro objeto." },
      { title: "Añade GUI de puntuación", content: "En Explorer: StarterGui > ScreenGui > TextLabel. Ajusta posición con UDim2. Para actualizar el texto desde un script: game.Players.PlayerAdded para dar leaderstats.", tip: "AnchorPoint = Vector2.new(0.5,0.5) + Position UDim2.new(0.5,0,0.5,0) centra cualquier elemento." },
      { title: "Publica tu juego", content: "File > Publish to Roblox As. Escribe nombre atractivo, descripción con palabras clave, elige género y sube un icono de 512×512px. Ponlo en Público.", tip: "Un icono llamativo aumenta los clics un 300%. Mira los thumbnails de los juegos top para inspirarte." }
    ],
    tips: ["devforum.roblox.com tiene la comunidad oficial de desarrolladores con respuestas a todo", "Empieza con un obby o simulador simple: lanzar un RPG complejo de entrada es un error común", "Guarda con Ctrl+S cada 5 minutos. Studio puede cerrarse inesperadamente", "YouTube: canales AlvinBlox y TheDevKing explican Lua desde cero en español e inglés"],
    errors: [
      { error: "attempt to index nil value", solution: "El objeto no existe aún. Usa :WaitForChild('nombre') en vez de .nombre directamente." },
      { error: "Las partes se caen solas", solution: "Selecciona la parte > Properties > activa 'Anchored' = true para las partes estáticas." },
      { error: "Script no funciona en móvil", solution: "Usa LocalScript dentro de StarterPlayerScripts, no Script normal." },
      { error: "El juego va a 10 FPS", solution: "Reduce el número de Parts. Usa Model > Union para combinar varias en una sola." }
    ]
  },
  {
    id: 2,
    slug: "guia-completa-blox-fruits",
    title: "Guía completa de Blox Fruits: frutas, builds y endgame",
    description: "Todo sobre Blox Fruits: las mejores frutas del diablo, cómo subir nivel rápido, qué raza elegir, builds para PvP y cómo llegar al endgame.",
    category: "Blox Fruits", emoji: "🍎", readTime: "18 min", difficulty: "Intermedio",
    date: "2024-03-15", isNew: true,
    steps: [
      { title: "Entendiendo las frutas del diablo", content: "Hay 3 tipos: Natural (elementales, ideales para farmear mobs), Bestia (transformaciones animales, buen daño) y Sobrenatural (las más poderosas del endgame). Las frutas caen cada hora en ubicaciones aleatorias del mapa.", tip: "Mejores para empezar: Smoke (gratis, buena para farm), Spike o Bomb. Para endgame busca Leopard, Dragon o Kitsune." },
      { title: "Sistema de razas y stats", content: "Al crear personaje eliges raza aleatoria: Human, Shark, Angel, Mink, Skypian o Cyborg. Cada una tiene ventajas distintas y versiones V2/V3/V4 desbloqueables.", tip: "Human V4 domina el meta PvP actual. Mink V3 es la mejor para moverse por el mapa." },
      { title: "Cómo farmear nivel rápido", content: "Niveles 1-700: misiones de NPCs en cada isla. 700-1500: Sea 2, enfócate en quests y usa códigos de 2×EXP. 1500-2450: Sea 3 tiene las misiones con más EXP del juego.", tip: "Usa los códigos de nuestra sección para conseguir 2×EXP y subir el doble de rápido." },
      { title: "Distribución de stats (build)", content: "5 estadísticas: Melee, Defense, Sword, Gun y Fruit. Builds recomendadas: Full Fruit (máximo daño de fruta, ideal para farm), Hybrid Sword+Fruit (versátil PvP), Full Defense (para raids).", tip: "Usa Stat Reset con el código BLUXXY si te equivocas en los puntos. No pongas nada en Gun salvo que uses armas específicamente." },
      { title: "Conseguir tu primera espada legendaria", content: "La Triple Katana se fabrica en Sea 2 con 3 espadas básicas: es excelente para principiantes. Para endgame: Dragon Trident, Cursed Dual Katana o Yama. Cada espada tiene movimientos con Fragments.", tip: "Los Fragments se consiguen en Raids. Son la moneda premium del endgame: no los gastes en espadas de baja rareza." },
      { title: "Raids y contenido endgame", content: "Los Raids son misiones de grupo contra jefes épicos. Necesitas llevar una fruta al NPC Mysterious Scientist para activarlos. Dan Fragments y objetos exclusivos. Los de Dragon y Dough son los más populares.", tip: "Usa un servidor privado (75 Robux/mes) para farmear sin interrupciones de otros jugadores." }
    ],
    tips: ["No mueras en el agua si tienes fruta: pierdes el 50% del EXP acumulado", "Las frutas Awakened (con Fragments) son 3× más poderosas que las normales", "El Discord oficial de Blox Fruits tiene canales de trading para intercambiar frutas", "Los fines de semana suele haber eventos 2×EXP: aprovéchalos para farmear"],
    errors: [
      { error: "Mi fruta no hace daño", solution: "Necesitas puntos en el stat 'Fruit'. Con 0 puntos el daño es mínimo." },
      { error: "No encuentro la fruta en el mapa", solution: "Las frutas reaparecen cada hora en zonas aleatorias. Únete al Discord para ver ubicaciones en tiempo real." },
      { error: "El Raid no aparece", solution: "Necesitas estar en el Sea correcto y tener el nivel mínimo requerido para ese Raid." }
    ]
  },
  {
    id: 3,
    slug: "como-ganar-robux-gratis",
    title: "Cómo ganar Robux legítimamente en 2024 (sin estafas)",
    description: "Los métodos reales probados para conseguir Robux: vender ropa, monetizar juegos, grupos de Roblox y el programa DevEx.",
    category: "Economía", emoji: "💰", readTime: "12 min", difficulty: "Intermedio",
    date: "2024-03-12", isNew: false,
    steps: [
      { title: "Roblox Premium: la base de todo", content: "Premium (4.99/9.99/19.99 $/mes) te da 450/1000/2200 Robux mensuales automáticamente, más un 10% extra en todas las compras y acceso al mercado de trading.", tip: "El plan de 9.99$/mes tiene la mejor relación calidad-precio: 100 Robux por dólar." },
      { title: "Vende ropa en el catálogo", content: "Con Premium puedes crear y vender camisetas (128×128px), tops y pantalones (585×559px). Cada venta te da el 70% del precio. Usa Canva o Photoshop para diseños atractivos.", tip: "Diseños de animes populares, memes y ropa aesthetic se venden 10× más que diseños genéricos." },
      { title: "Crea Gamepasses en tu juego", content: "Los Gamepasses son pagos únicos dentro de tu juego. Ejemplos rentables: '2× velocidad' (50 R), 'Espada VIP' (100 R), 'Acceso zona premium' (200 R). Un juego activo puede generar miles de Robux al mes.", tip: "Los DevProducts (compras repetibles como '×100 monedas') suelen generar más que los Gamepasses de una sola vez." },
      { title: "Gestiona un Grupo de Roblox", content: "Los grupos tienen tiendas propias: el 70% de cada venta va al grupo. Como propietario recibes todos los ingresos. Grupos con 1000+ miembros y ropa exclusiva generan 5000+ Robux mensuales.", tip: "Crea rangos de pago (VIP, Elite) para ingresos adicionales con una página de donación." },
      { title: "DevEx: convierte Robux en dinero real", content: "Con 100.000 Robux y cuenta verificada puedes cambiarlos por dinero real (~350$). Solo disponible para mayores de 13 años con cuenta Premium y en buen estado.", tip: "Acumula antes de solicitar: 100.000 R es el mínimo por transacción. Espera a tener más para el mejor retorno." },
      { title: "Invierte en Limiteds", content: "Los objetos Limited tienen stock limitado y su valor sube con el tiempo. Compra baratos al salir, vende caro después. Usa Rolimons.com para ver estadísticas y tendencias de precios.", tip: "Algunos Limiteds han pasado de valer 100 R a 100.000+ R en meses. Investiga antes de invertir." }
    ],
    tips: ["Los generadores de Robux son SIEMPRE estafas: no existe ninguno legítimo", "Los sorteos de Robux en Discord/Instagram son 99% fraudes", "La paciencia es clave: construir ingresos en Roblox lleva semanas o meses", "El Creator Dashboard muestra analytics de tu juego para optimizar la monetización"],
    errors: [
      { error: "Alguien me pide la contraseña para darme Robux", solution: "Es una ESTAFA. Roblox nunca pide tu contraseña para darte Robux. Cambia tu clave inmediatamente." },
      { error: "Mi Gamepass no aparece en el juego", solution: "Verifica que el ID del Gamepass en el script coincide exactamente con el ID en la web de Roblox." }
    ]
  },
  {
    id: 4,
    slug: "guia-principiantes-roblox",
    title: "Guía definitiva para principiantes en Roblox 2024",
    description: "Todo lo que necesitas saber si empiezas: crear cuenta, personalizar avatar, encontrar los mejores juegos y mantenerte seguro.",
    category: "Principiantes", emoji: "🌟", readTime: "10 min", difficulty: "Principiante",
    date: "2024-03-10", isNew: false,
    steps: [
      { title: "Crea tu cuenta", content: "Ve a roblox.com > Sign Up. Elige un nombre de usuario único (permanente, no se cambia fácil). Usa email real para recuperar la cuenta. Activa 2FA en Configuración > Seguridad.", tip: "No pongas tu nombre real en el username. Elige algo original que te represente." },
      { title: "Configura privacidad y seguridad", content: "Ve a Configuración > Privacidad. Activa controles parentales si eres menor de 13. Configura quién puede mandarte mensajes. Activa el PIN de cuenta para evitar cambios no autorizados.", tip: "El PIN de cuenta es tu segunda línea de defensa. Ponlo ahora aunque no seas menor." },
      { title: "Personaliza tu avatar gratis", content: "En el icono de avatar > Mercado, filtra por 'Gratis'. Roblox añade items gratuitos semanalmente. En la sección 'Eventos' hay cosméticos exclusivos sin coste durante periodos especiales.", tip: "Revisa el catálogo cada lunes: suelen añadir items gratuitos nuevos." },
      { title: "Descubre los mejores juegos", content: "En la portada encontrarás 'Top Rated' y 'Featured'. Para empezar: Adopt Me (tranquilo), Tower of Hell (desafío), Murder Mystery 2 (estrategia), Brookhaven (rol libre). Lee ratings antes de entrar.", tip: "Los juegos con el badge 'Verified' y más de 1M visitas son seguros y de calidad probada." },
      { title: "Entiende el chat y los amigos", content: "El chat tiene filtros automáticos según edad. Para añadir amigos: busca su nombre exacto o click en su avatar dentro del juego. Los amigos pueden unirse a tus partidas y tú a las suyas.", tip: "Nunca compartas información personal (apellido, ciudad, colegio) en el chat." },
      { title: "Controles básicos", content: "PC: WASD para moverse, Espacio para saltar, Shift para correr. La cámara se mueve con el ratón. En móvil hay joystick virtual. ESC abre el menú de pausa con opciones del juego.", tip: "Muchos juegos tienen atajos propios: búscalos en el menú o tutorial del juego al entrar." }
    ],
    tips: ["Nunca compartas tu contraseña con nadie, ni con 'admins' del juego", "Reporta acoso: click derecho sobre el jugador > Report", "Los trades de objetos raros pueden ser estafas: verifica el valor en Rolimons antes de aceptar", "Roblox no tiene soporte por WhatsApp ni Discord: desconfía de quien diga ser soporte oficial"],
    errors: [
      { error: "No puedo chatear", solution: "Ve a Configuración > Privacidad: el chat puede estar restringido por edad o configuración parental." },
      { error: "El juego no carga", solution: "Descarga el cliente oficial de Roblox. El navegador solo funciona con el plugin instalado." }
    ]
  },
  {
    id: 5,
    slug: "guia-fisch-peces-codigos",
    title: "Guía completa de Fisch: cómo pescar, raros y códigos",
    description: "Domina Fisch: las mejores cañas, técnicas de pesca, dónde encontrar peces raros y cómo progresar rápido.",
    category: "Fisch", emoji: "🎣", readTime: "12 min", difficulty: "Principiante",
    date: "2024-03-14", isNew: true,
    steps: [
      { title: "Lo básico: cómo pescar", content: "Equipa la caña, acércate al agua y haz clic para lanzar. Cuando el indicador baje, haz clic rápido para recoger. El timing es clave: muy pronto o muy tarde y el pez escapa.", tip: "Practica en el lago inicial antes de ir a zonas difíciles. El timing se aprende en 10-15 intentos." },
      { title: "Tipos de caña y mejoras", content: "Empieza con la Wooden Rod gratis. Mejora a Bamboo, Steel, Crystal y Gold a medida que acumulas monedas. Cada caña mejora la velocidad, la rareza de peces y el radio de lanzamiento.", tip: "La Crystal Rod es el mejor punto de equilibrio precio-rendimiento para la mayoría de jugadores." },
      { title: "Dónde encontrar peces raros", content: "Los peces raros aparecen en zonas específicas: el océano profundo (zona azul oscuro), cuevas submarinas y durante eventos climáticos como la lluvia. El mapa muestra iconos de peces por zona.", tip: "Llueve aproximadamente cada 20 minutos reales. Prepárate: los peces raros son 3× más frecuentes durante la lluvia." },
      { title: "Sistema de reputación y ventas", content: "Vende peces en el mercado del pueblo para ganar monedas y reputación. Mayor reputación desbloquea nuevas zonas, cañas premium y accesorios especiales. Los peces legendarios valen 10× más.", tip: "No vendas peces legendarios inmediatamente: algunos tienen usos en quests que pagan más que la venta directa." },
      { title: "Señuelos y objetos especiales", content: "Los señuelos (lures) aumentan la probabilidad de peces específicos. El señuelo dorado atrae peces raros pero se consume. Los objetos de pesca mejorada son temporales: úsalos en zonas de alto rendimiento.", tip: "Combina el señuelo dorado con la zona del océano profundo durante la lluvia para el máximo rendimiento." },
      { title: "Usa los códigos de RobloxHub", content: "Canjea los códigos activos de nuestra sección de Fisch para conseguir cañas raras, señuelos premium y monedas extras. Los códigos se añaden con cada update del juego.", tip: "El código FISCH2024 da una caña rara directamente. Canjéalo en el menú principal del juego." }
    ],
    tips: ["El servidor privado (gratis en Fisch) es ideal para pescar sin que otros te roben los puntos", "Los peces de temporada solo aparecen durante eventos: comprueba el calendario de eventos del juego", "Sigue a los devs en Twitter/X para enterarte de nuevos códigos antes que nadie", "La barra de experiencia de pesca se llena más rápido con peces raros que con peces comunes"],
    errors: [
      { error: "El pez siempre escapa", solution: "El timing del clic debe ser cuando la barra llega al fondo. Hay medio segundo de margen: practica." },
      { error: "No veo peces raros", solution: "Ve a zonas de agua más profunda (color azul oscuro en el mapa) y espera a que llueva." }
    ]
  },
  {
    id: 6,
    slug: "guia-sol-rng-tiradas",
    title: "Guía de Sol's RNG: tiradas, auras raras y cómo conseguir las mejores",
    description: "Todo sobre Sol's RNG: cómo funciona el sistema de tiradas, las mejores auras, probabilidades reales y trucos para mejorar tu suerte.",
    category: "Sol's RNG", emoji: "🎲", readTime: "10 min", difficulty: "Principiante",
    date: "2024-03-16", isNew: true,
    steps: [
      { title: "¿Qué es Sol's RNG?", content: "Un juego basado puramente en suerte (Random Number Generator). Haces tiradas para conseguir auras de distintas rarezas: desde Common (1 en 6) hasta las míticas con probabilidades de 1 en millones.", tip: "RNG significa Random Number Generator. La suerte es el único factor, pero los códigos y boosts la mejoran." },
      { title: "Cómo hacer tiradas eficientemente", content: "Presiona la tecla de tirada o botón en pantalla. Cada tirada tiene su probabilidad independiente. Los boosts de suerte (×2, ×5, ×10) multiplican tus chances de auras raras durante su duración.", tip: "Usa los boosts de suerte junto con los códigos activos de nuestra sección para maximizar tiradas raras." },
      { title: "Rareza de auras: la tabla completa", content: "Common (1:6) > Uncommon (1:24) > Rare (1:100) > Epic (1:500) > Legendary (1:4000) > Mythic (1:50000) > Divine (1:250000) > Secret (1:2000000+). Los boosts de suerte aplican a todas.", tip: "Las auras Divine y Secret son tan raras que muchos jugadores nunca las consiguen sin boosts extremos." },
      { title: "Biomas y eventos especiales", content: "Los biomas cambian periódicamente y afectan qué auras pueden aparecer. Durante el bioma de Tormenta aparecen auras eléctricas exclusivas. El bioma Divino aumenta probabilidad de auras raras ×3.", tip: "Maximiza tus tiradas durante biomas especiales: son momentos limitados con probabilidades únicas." },
      { title: "Crafteo y combinación de auras", content: "Algunas auras se pueden craftear combinando otras de menor rareza. El sistema de crafteo desbloquea auras únicas que no pueden obtenerse por tiradas normales. Ve a la sección Craft del menú.", tip: "Antes de craftear, comprueba el valor de las auras en el mercado. A veces vale más venderlas por separado." },
      { title: "Canjea los códigos activos", content: "Los códigos de Sol's RNG dan tiradas gratuitas, boosts de suerte y auras especiales de evento. Canjéalos en el menú principal del juego. Nuestra sección siempre tiene los más recientes.", tip: "El código LUCKY7 da un boost de suerte ×2 durante 15 minutos. Úsalo cuando vayas a hacer muchas tiradas seguidas." }
    ],
    tips: ["La suerte en RNG es independiente: 1000 tiradas malas no 'garantizan' una buena próxima", "Los servidores privados tienen el mismo RNG que los públicos: no hay ventaja", "El Discord oficial de Sol's RNG anuncia biomas especiales con antelación", "Guarda capturas de pantalla de tus auras raras: tienen valor de intercambio en la comunidad"],
    errors: [
      { error: "Llevo 500 tiradas sin Legendary", solution: "Estadísticamente normal. Con probabilidad 1:4000 puede pasar. Usa boost de suerte para mejorar las odds." },
      { error: "Mi aura no aparece en el inventario", solution: "Reinicia el juego. Las auras a veces tardan unos segundos en registrarse en el inventario." }
    ]
  },
  {
    id: 7,
    slug: "guia-the-strongest-battlegrounds",
    title: "Guía de The Strongest Battlegrounds: combate, skills y builds",
    description: "Domina TSB: los mejores personajes, cómo encadenar combos, movimientos secretos y estrategias para ganar en PvP.",
    category: "TSB", emoji: "💥", readTime: "14 min", difficulty: "Intermedio",
    date: "2024-03-13", isNew: true,
    steps: [
      { title: "Elige tu personaje inicial", content: "TSB está inspirado en One Punch Man. Empieza con Saitama: tiene el movimiento más icónico del juego (Serious Punch). Cada personaje tiene stats base distintos: velocidad, daño y habilidades únicas.", tip: "Garou y Metal Bat son los favoritos del meta competitivo actual por su movilidad y daño consistente." },
      { title: "Sistema de combate básico", content: "Click para golpes básicos. Q, E, R, F para habilidades especiales. El bloqueo (G) absorbe hasta el 80% del daño. El dash (doble-dirección o Shift) esquiva ataques y permite reposicionarte.", tip: "El counter-attack (bloquear y atacar en el mismo frame) hace 1.5× daño y rompe la guardia del enemigo." },
      { title: "Encadena combos efectivos", content: "Los combos más efectivos: 3 golpes normales > Q > dash > R > E. Aprende el timing de cada habilidad: algunas tienen frames de invencibilidad al inicio que puedes usar para esquivar ataques.", tip: "Practica los combos en servidores privados contra bots antes de usarlos en PvP real." },
      { title: "Sistema de habilidades Ultimate", content: "Cada personaje tiene una Ultimate (F) con cooldown largo pero daño masivo. La Ultimate de Saitama (Serious Table Flip) puede eliminar a varios jugadores a la vez si la posicionas bien.", tip: "Guarda la Ultimate para cuando el enemigo tenga poca vida o esté en medio de un combo tuyo." },
      { title: "Mapa y estrategia de zona", content: "El mapa tiene zonas de altura y cobertura. Los personajes con movilidad alta dominan en espacios abiertos. Los combatientes de rango corto prefieren las zonas con estructuras para acortar distancias.", tip: "La zona central del mapa concentra más peleas: si quieres acción ve allí; si quieres sobrevivir, evítala." },
      { title: "Grindea EXP y desbloquea personajes", content: "Cada victoria da EXP para subir de rango. Los rangos más altos desbloquean variantes de personajes con skins exclusivos y stats ligeramente mejorados. Juega partidas diarias para el bonus de EXP.", tip: "Las partidas de 1v1 dan más EXP por minuto que las partidas generales: úsalas para subir de rango rápido." }
    ],
    tips: ["El lag afecta el timing de los combos: juega en servidores con menos de 80ms de ping", "Estudia los movimientos de los jugadores top: hay canales de YouTube dedicados a TSB competitivo", "Los códigos activos de nuestra sección dan 2×EXP: úsalos en sesiones de grinding largas", "El parry (bloquear en el último momento) es la habilidad más difícil pero más efectiva del juego"],
    errors: [
      { error: "Mis habilidades no hacen daño", solution: "Necesitas estar dentro del rango de cada habilidad. Cada una tiene un radio diferente: aprende cuál es cuál." },
      { error: "Me matan con un solo combo", solution: "Necesitas subir de nivel tu defensa y practicar el bloqueo. Un bloqueo bien timed absorbe el 80% del daño." }
    ]
  },
  {
    id: 8,
    slug: "scripting-lua-roblox",
    title: "Scripting en Lua para Roblox: aprende a programar desde cero",
    description: "Guía completa de programación en Lua para Roblox: variables, funciones, eventos, comunicación cliente-servidor y tu primer mini-juego.",
    category: "Desarrollo", emoji: "💻", readTime: "25 min", difficulty: "Avanzado",
    date: "2024-03-08", isNew: false,
    steps: [
      { title: "¿Qué es Lua y cómo funciona en Roblox?", content: "Lua es el lenguaje de scripting de Roblox. Hay dos entornos: Server (Scripts en ServerScriptService, corren para todos) y Client (LocalScripts en StarterPlayerScripts, corren solo en ese jugador). Se comunican con RemoteEvents.", tip: "Regla de oro: lógica del juego y datos en Server. Animaciones y GUI en Client." },
      { title: "Variables, tipos y operadores", content: "local nombre = 'Roblox' -- string. local puntos = 0 -- number. local activo = true -- boolean. local tabla = {} -- table. Operadores: + - * / .. (concatenar strings) == ~= < > and or not.", tip: "Siempre usa 'local' para tus variables. Las variables globales son lentas y causan bugs difíciles de detectar." },
      { title: "Condicionales y bucles", content: "if puntos > 10 then print('Ganaste') elseif puntos > 5 then print('Casi') else print('Sigue') end. Bucles: for i=1,10 do, while condicion do (siempre con wait()), for _,v in pairs(tabla) do.", tip: "NUNCA hagas while true do sin wait(0.1) mínimo dentro. El juego se congela y todos los jugadores se desconectan." },
      { title: "Funciones y organización del código", content: "local function sumarPuntos(jugador, cantidad) jugador.leaderstats.Puntos.Value += cantidad end. Funciones modulares, una responsabilidad por función. Los ModuleScripts permiten reutilizar código entre scripts.", tip: "Nombra funciones con verbos: crearMoneda(), verificarGanador(), darPremio(). El código se lee como prosa." },
      { title: "Eventos: el corazón de Roblox", content: "parte.Touched:Connect(fn) — al tocar. game.Players.PlayerAdded:Connect(fn) — nuevo jugador. runService.Heartbeat:Connect(fn) — cada frame. Los eventos son asíncronos: no bloquean el código principal.", tip: "Usa :Wait() en vez de :Connect() cuando necesitas que el código espere. Ejemplo: game.Players.PlayerAdded:Wait()." },
      { title: "Comunicación cliente-servidor", content: "RemoteEvent (Server→Client y Client→Server): evento:FireClient(player), evento:FireServer(). RemoteFunction (espera respuesta): local resultado = funcion:InvokeServer(). Declara RemoteEvents en ReplicatedStorage.", tip: "Nunca confíes en datos del cliente sin validarlos en el servidor. Los exploiters pueden enviar cualquier valor." },
      { title: "Tu primer sistema de puntos completo", content: "ServerScriptService Script: game.Players.PlayerAdded:Connect(function(p) local f=Instance.new('Folder') f.Name='leaderstats' f.Parent=p local pts=Instance.new('IntValue') pts.Name='Puntos' pts.Value=0 pts.Parent=f end). Esto crea un marcador visible en el Tab del juego.", tip: "Los leaderstats aparecen automáticamente en el cuadro de puntuación (Tab). Siempre nómbralos igual." }
    ],
    tips: ["AlvinBlox en YouTube tiene el mejor curso gratuito de Lua para Roblox en inglés", "El DevForum (devforum.roblox.com) tiene respuesta a casi cualquier problema de scripting", "Comenta tu código: -- Este comentario. Te salvará cuando releas el código en 3 meses", "Aprende leyendo código ajeno: abre juegos con 'Allow Copying' en Studio y estudia cómo están hechos"],
    errors: [
      { error: "Expected 'end' (to close 'if')", solution: "Falta un 'end'. Cuenta los if/for/while/function y asegúrate de que cada uno tiene su 'end' correspondiente." },
      { error: "attempt to call a nil value", solution: "La función no existe o está mal escrita. Verifica el nombre con FindFirstChild antes de llamarla." },
      { error: "Script funciona solo una vez", solution: "Usa un debounce: local db=false. if not db then db=true -- código -- task.wait(1) db=false end." }
    ]
  }
]

export const getGuide = (slug) => guides.find(g => g.slug === slug)
export const getRecentGuides = (n=3) => [...guides].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,n)
export const GUIDE_CATS = ['Todos', ...new Set(guides.map(g=>g.category))]
