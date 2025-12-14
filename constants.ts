import { VoiceOption, Accent, Style, SoundOption } from './types';

export const VOICES: VoiceOption[] = [
  // --- INFANTIL ---
  { id: 'kid1', name: 'Mateo (Niño Curioso)', category: 'Infantil', geminiVoiceName: 'Puck', styleDescription: 'Voz de niño pequeño, tono agudo, curioso y lleno de energía.' },
  { id: 'kid2', name: 'Sofi (Niña Dulce)', category: 'Infantil', geminiVoiceName: 'Zephyr', styleDescription: 'Voz de niña pequeña, muy dulce, inocente y suave.' },
  { id: 'kid3', name: 'Junior (Adolescente)', category: 'Infantil', geminiVoiceName: 'Puck', styleDescription: 'Voz de adolescente despreocupado, jerga juvenil leve.' },

  // --- FANTASÍA / TERROR ---
  { id: 'char1', name: 'El Espectro (Terror)', category: 'Fantasía/Terror', geminiVoiceName: 'Fenrir', styleDescription: 'Voz profunda, lenta, con aire fantasmal, siniestra y susurrante.' },
  { id: 'char2', name: 'La Bruja del Bosque', category: 'Fantasía/Terror', geminiVoiceName: 'Kore', styleDescription: 'Voz rasgada, anciana, malvada, con risas cacareantes implícitas.' },
  { id: 'char3', name: 'Robot 3000', category: 'Fantasía/Terror', geminiVoiceName: 'Fenrir', styleDescription: 'Voz monótona, metálica, silábica, estilo robótico antiguo.' },
  { id: 'char4', name: 'El Narrador Épico', category: 'Fantasía/Terror', geminiVoiceName: 'Charon', styleDescription: 'Voz extremadamente profunda, grandilocuente, estilo tráiler de película.' },
  { id: 'char5', name: 'Alien (Zorg)', category: 'Fantasía/Terror', geminiVoiceName: 'Puck', styleDescription: 'Voz nasal, extraña, vibrante, estilo alienígena.' },

  // --- HOMBRES (15 Variedades) ---
  { id: 'h1', name: 'Alejandro (Profundo)', category: 'Masculino', geminiVoiceName: 'Fenrir', styleDescription: 'Voz masculina muy grave, autoritaria y seria.' },
  { id: 'h2', name: 'Carlos (Locutor)', category: 'Masculino', geminiVoiceName: 'Charon', styleDescription: 'Voz de locutor de radio clásico, clara, proyectada y profesional.' },
  { id: 'h3', name: 'Miguel (Suave)', category: 'Masculino', geminiVoiceName: 'Puck', styleDescription: 'Voz masculina suave, tranquila, reconfortante y aguda.' },
  { id: 'h4', name: 'Javier (Energético)', category: 'Masculino', geminiVoiceName: 'Fenrir', styleDescription: 'Voz masculina rápida, entusiasta, estilo vendedor o youtuber.' },
  { id: 'h5', name: 'Roberto (Anciano)', category: 'Masculino', geminiVoiceName: 'Charon', styleDescription: 'Voz de hombre muy mayor, lenta, sabia, un poco temblorosa.' },
  { id: 'h6', name: 'Fernando (Romántico)', category: 'Masculino', geminiVoiceName: 'Charon', styleDescription: 'Voz seductora, baja, cercana al micrófono, estilo galán.' },
  { id: 'h7', name: 'Andrés (Ejecutivo)', category: 'Masculino', geminiVoiceName: 'Fenrir', styleDescription: 'Voz corporativa, directa, eficiente y sin emociones.' },
  { id: 'h8', name: 'Luis (Amigo)', category: 'Masculino', geminiVoiceName: 'Puck', styleDescription: 'Voz casual, informal, coloquial y amigable.' },
  { id: 'h9', name: 'Héctor (Rudo)', category: 'Masculino', geminiVoiceName: 'Fenrir', styleDescription: 'Voz áspera, intimidante, tipo tipo duro de película.' },
  { id: 'h10', name: 'Sebastián (Intelectual)', category: 'Masculino', geminiVoiceName: 'Charon', styleDescription: 'Voz pedante, muy articulada, pausada y analítica.' },
  { id: 'h11', name: 'Diego (Deportista)', category: 'Masculino', geminiVoiceName: 'Fenrir', styleDescription: 'Voz enérgica, respirada, como de entrenador o comentarista deportivo.' },
  { id: 'h12', name: 'Pablo (Tímido)', category: 'Masculino', geminiVoiceName: 'Puck', styleDescription: 'Voz baja, vacilante, insegura y suave.' },
  { id: 'h13', name: 'Tomás (Poeta)', category: 'Masculino', geminiVoiceName: 'Charon', styleDescription: 'Voz melódica, rítmica, emocional y artística.' },
  { id: 'h14', name: 'Gabriel (Noticias)', category: 'Masculino', geminiVoiceName: 'Fenrir', styleDescription: 'Voz de presentador de noticias de urgencia, rápida y clara.' },
  { id: 'h15', name: 'Ricardo (Padre)', category: 'Masculino', geminiVoiceName: 'Charon', styleDescription: 'Voz cálida, protectora, firme pero cariñosa.' },

  // --- MUJERES (15 Variedades) ---
  { id: 'm1', name: 'Sofía (Clara)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz femenina estándar, muy clara y equilibrada.' },
  { id: 'm2', name: 'Lucía (Amable)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz muy amable, sonriente, estilo servicio al cliente.' },
  { id: 'm3', name: 'Elena (Profesional)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz seria, corporativa, autoridad femenina.' },
  { id: 'm4', name: 'Valentina (Juvenil)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz joven, universitaria, fresca y dinámica.' },
  { id: 'm5', name: 'Isabella (Sensual)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz profunda, lenta, susurrante y atractiva.' },
  { id: 'm6', name: 'Carmen (Abuela)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz de mujer mayor, cariñosa, lenta y maternal.' },
  { id: 'm7', name: 'Ana (Noticias)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz informativa, neutral, rápida y precisa.' },
  { id: 'm8', name: 'Julia (Triste)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz melancólica, suave, pausada, al borde del llanto.' },
  { id: 'm9', name: 'Laura (Enérgica)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz de entrenadora de gym, fuerte, motivadora y alta.' },
  { id: 'm10', name: 'Marta (Maestra)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz educativa, paciente, clara y articulada.' },
  { id: 'm11', name: 'Clara (Susurro)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz ASMR, susurro muy cercano y relajante.' },
  { id: 'm12', name: 'Rosa (Vendedora)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz persuasiva, insistente, rápida y comercial.' },
  { id: 'm13', name: 'Patricia (Directora)', category: 'Femenino', geminiVoiceName: 'Kore', styleDescription: 'Voz de mando, firme, fuerte y decisiva.' },
  { id: 'm14', name: 'Teresa (Cuentacuentos)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz narrativa, con muchas inflexiones y matices mágicos.' },
  { id: 'm15', name: 'Beatriz (Nerviosa)', category: 'Femenino', geminiVoiceName: 'Zephyr', styleDescription: 'Voz rápida, ligeramente aguda, ansiosa.' },
];

// Using reliable public domain or creative commons sources (Google Actions Sounds, etc)
export const BACKGROUND_SOUNDS: SoundOption[] = [
  // --- CLIMA ---
  { id: 'bg_rain', name: 'Lluvia Intensa', category: 'Clima', url: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg' },
  { id: 'bg_thunder', name: 'Tormenta Eléctrica', category: 'Clima', url: 'https://actions.google.com/sounds/v1/weather/thunder_heavy_rain.ogg' },
  { id: 'bg_wind', name: 'Viento Fuerte', category: 'Clima', url: 'https://actions.google.com/sounds/v1/weather/wind_strong.ogg' },
  { id: 'bg_forest', name: 'Bosque y Pájaros', category: 'Clima', url: 'https://actions.google.com/sounds/v1/ambiences/forest_morning.ogg' },
  
  // --- AMBIENTE ---
  { id: 'bg_fire', name: 'Fuego de Chimenea', category: 'Ambiente', url: 'https://actions.google.com/sounds/v1/ambiences/fireplace.ogg' },
  { id: 'bg_ocean', name: 'Olas del Mar', category: 'Ambiente', url: 'https://actions.google.com/sounds/v1/nature/ocean_waves_large_sweep.ogg' },
  { id: 'bg_cafe', name: 'Cafetería / Multitud', category: 'Ambiente', url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg' },
  { id: 'bg_city', name: 'Ciudad / Tráfico', category: 'Ambiente', url: 'https://actions.google.com/sounds/v1/transportation/highway_traffic.ogg' },
  { id: 'bg_keyboard', name: 'Oficina / Teclado', category: 'Ambiente', url: 'https://actions.google.com/sounds/v1/office/typing.ogg' },
  
  // --- TERROR ---
  { id: 'bg_horror1', name: 'Zumbido Siniestro', category: 'Terror', url: 'https://actions.google.com/sounds/v1/horror/horror_ambience.ogg' },
  { id: 'bg_horror2', name: 'Fantasma / Viento', category: 'Terror', url: 'https://actions.google.com/sounds/v1/horror/ghost_breath.ogg' },
  { id: 'bg_creepy', name: 'Cueva Tenebrosa', category: 'Terror', url: 'https://actions.google.com/sounds/v1/horror/monster_alien_growl_prowl.ogg' },
  
  // --- MÚSICA / RELAX (Using longer loops or simulated loopable sounds) ---
  { id: 'bg_piano', name: 'Piano Melancólico', category: 'Música/Relax', url: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_3496924294.mp3' },
  { id: 'bg_zen', name: 'Meditación Zen', category: 'Música/Relax', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3' },
  { id: 'bg_lofi', name: 'Beat Lo-Fi Suave', category: 'Música/Relax', url: 'https://cdn.pixabay.com/download/audio/2022/05/05/audio_13b62d8977.mp3' },
  
  // --- EFECTOS ---
  { id: 'bg_clock', name: 'Reloj Tic-Tac', category: 'Efectos', url: 'https://actions.google.com/sounds/v1/clocks/ticking_clock_long.ogg' },
  { id: 'bg_crickets', name: 'Grillos Nocturnos', category: 'Efectos', url: 'https://actions.google.com/sounds/v1/animals/crickets.ogg' },
];

export const ACCENTS = [
    Accent.NEUTRO,
    Accent.ESPANA,
    Accent.MEXICO,
    Accent.ARGENTINA,
    Accent.COLOMBIA_ROLO,
    Accent.COLOMBIA_PAISA,
    Accent.COLOMBIA_COSTENO,
    Accent.COLOMBIA_CALENO,
    Accent.COLOMBIA_PASTUSO,
];

export const STYLES = Object.values(Style);

export const SPECIAL_TAGS = [
  // Originales
  { 
    tag: '[pausa]', 
    label: 'Pausa (2s)', 
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    tag: '[risa]', 
    label: 'Risa', 
    iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  { 
    tag: '[grito]', 
    label: 'Grito', 
    iconPath: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' 
  },
  { 
    tag: '[llanto]', 
    label: 'Llanto', 
    iconPath: 'M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  },
  
  // Nuevos (10+)
  {
    tag: '[suspiro]',
    label: 'Suspiro',
    iconPath: 'M4 12h16M4 8h10M4 16h10' // Abstract wind
  },
  {
    tag: '[tos]',
    label: 'Tos',
    iconPath: 'M12 4v2m0 12v2m8-8h-2M6 12H4m15.364 6.364l-1.414-1.414M6.05 6.05l-1.414-1.414m0 14.142l1.414-1.414M17.95 6.05l1.414-1.414' // Burst
  },
  {
    tag: '[carraspera]',
    label: 'Carraspera',
    iconPath: 'M5 13l4 4L19 7' // Checkmark (cleared)
  },
  {
    tag: '[bostezo]',
    label: 'Bostezo',
    iconPath: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' // Moon/Sleep
  },
  {
    tag: '[respiracion]',
    label: 'Respiración',
    iconPath: 'M12 4a4 4 0 100 8 4 4 0 000-8z m-4 10a4 4 0 00-4 4v2h16v-2a4 4 0 00-4-4h-4z' // Person
  },
  {
    tag: '[beso]',
    label: 'Beso',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' // Heart
  },
  {
    tag: '[silbido]',
    label: 'Silbido',
    iconPath: 'M9 19V6l12-3v13M9 10l12-3' // Note
  },
  {
    tag: '[chasquido]',
    label: 'Chasquido',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' // Bolt
  },
  {
    tag: '[estornudo]',
    label: 'Estornudo',
    iconPath: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' // Cloud
  },
  {
    tag: '[tarareo]',
    label: 'Tarareo',
    iconPath: 'M9 19V6l12-3v13' // Single note
  }
];