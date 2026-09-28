// Paleta "Grafite Elétrico" do AteliêSP: a noite paulistana como fundo,
// o violeta do spray como cor primária e o magenta neon como destaque,
// inspirados nos murais/grafites de referência do projeto.
//
// Use sempre os tokens semânticos (background, surface, primary, accent,
// text*, error, success...). Os nomes antigos no fim do objeto são apelidos
// mantidos para as telas que ainda não migraram.

const palette = {
  night: '#100B1A',
  nightSurface: '#1E1730',
  nightRaised: '#2A2040',

  violet: '#7C3AED',
  violetPressed: '#6425D0',
  violetDark: '#5B21B6',
  violetDeep: '#3B0764',
  violetLight: '#A78BFA',

  magenta: '#FF4FA3',
  cyan: '#22D3EE',
  yellow: '#FFD23D',

  paper: '#F5F0FF',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Colors = {
  // Fundo e superfícies
  background: palette.night,
  surface: palette.nightSurface,
  surfaceRaised: palette.nightRaised,
  border: 'rgba(255,255,255,0.10)',
  borderStrong: 'rgba(255,255,255,0.18)',
  scrim: 'rgba(16,11,26,0.78)',

  // Primária: botões e ações principais
  primary: palette.violet,
  primaryPressed: palette.violetPressed,
  primaryLight: palette.violetLight,
  primarySoft: 'rgba(124,58,237,0.18)',
  onPrimary: palette.white,

  // Destaque: item ativo, marcadores e detalhes neon
  accent: palette.magenta,
  accentSoft: 'rgba(255,79,163,0.15)',
  highlight: palette.yellow,
  highlightSoft: 'rgba(255,210,61,0.15)',

  // Texto (contraste mínimo de 4.5:1 sobre background e surface)
  text: palette.paper,
  textMuted: 'rgba(245,240,255,0.72)',
  textSubtle: 'rgba(245,240,255,0.56)',
  textDisabled: 'rgba(245,240,255,0.36)',

  // Estados
  error: '#FCA5A5',
  errorStrong: '#F04438',
  errorSoft: '#2A0F1A',
  errorPressed: 'rgba(240,68,56,0.22)',
  success: '#86EFAC',
  successStrong: '#22C55E',
  successSoft: '#0F2419',

  // Controles sobre a câmera/fotos (legíveis em qualquer imagem)
  mediaControl: 'rgba(0,0,0,0.45)',
  mediaBar: 'rgba(0,0,0,0.35)',
  mediaShutterRing: 'rgba(255,255,255,0.25)',

  // Tema escuro do mapa (Google Maps), no mesmo tom da paleta
  map: {
    land: '#1A1428',
    poi: '#221A33',
    park: '#1D2A26',
    road: '#2E2442',
    roadStroke: '#1A1428',
    highway: '#4A3470',
    highwayLabel: '#D6C8F5',
    transit: '#261D38',
    transitLabel: '#C4B5FD',
    water: '#0B0713',
    waterLabel: '#6B6280',
    label: '#A9A1BD',
    labelStroke: '#100B1A',
    border: '#3A2F52',
  },

  // ---- Apelidos antigos (evite em código novo) ----
  white: palette.white,
  black: palette.black,

  surfaceAlt: palette.nightRaised,

  brand: palette.violet,
  brandDark: palette.violetDark,
  brandDeep: palette.violetDeep,
  brandLight: palette.violetLight,

  btnPrimary: palette.violet,
  btnPrimaryPressed: palette.violetPressed,

  labelPrimary: palette.white,
  txtPrimary: palette.paper,

  cream: '#EDE6F5',

  overlayDark: 'rgba(16,11,26,0.55)',
  overlayBrand: 'rgba(59,7,100,0.62)',

  overlay: {
    '55': 'rgba(16,11,26,0.55)',
    '60': 'rgba(16,11,26,0.60)',
    '78': 'rgba(16,11,26,0.78)',
    '88': 'rgba(16,11,26,0.88)',
  },

  semantic: {
    error: { bg: '#2A0F1A', border: '#F04438', text: '#FCA5A5' },
    success: { bg: '#0F2419', border: '#22C55E', text: '#86EFAC' },
    warning: { bg: '#241C08', border: '#E8B65D', text: '#F2CE8F' },
    info: { bg: '#0D1424', border: '#5DB8E8', text: '#8FD3F2' },
  },

  gray: {
    100: '#F2F2F2',
    500: '#999999',
    800: '#333333',
  },

  whiteAlpha: {
    '05': 'rgba(255,255,255,0.05)',
    '06': 'rgba(255,255,255,0.06)',
    '07': 'rgba(255,255,255,0.07)',
    '08': 'rgba(255,255,255,0.08)',
    '10': 'rgba(255,255,255,0.10)',
    '12': 'rgba(255,255,255,0.12)',
    '30': 'rgba(255,255,255,0.30)',
    '35': 'rgba(255,255,255,0.35)',
    '40': 'rgba(255,255,255,0.40)',
    '45': 'rgba(255,255,255,0.45)',
    '50': 'rgba(255,255,255,0.50)',
    '55': 'rgba(255,255,255,0.55)',
    '65': 'rgba(255,255,255,0.65)',
  },

  brandAlpha: {
    '10': 'rgba(124,58,237,0.10)',
    '18': 'rgba(124,58,237,0.18)',
    '25': 'rgba(124,58,237,0.25)',
    '40': 'rgba(124,58,237,0.40)',
    '60': 'rgba(124,58,237,0.60)',
  },

  neon: {
    pink: palette.magenta,
    cyan: palette.cyan,
    yellow: palette.yellow,
    purple: palette.violet,
  },

  neonAlpha: {
    pink15: 'rgba(255,79,163,0.15)',
    pink30: 'rgba(255,79,163,0.30)',
    cyan15: 'rgba(34,211,238,0.15)',
    cyan30: 'rgba(34,211,238,0.30)',
    yellow15: 'rgba(255,210,61,0.15)',
    yellow30: 'rgba(255,210,61,0.30)',
  },
} as const;
