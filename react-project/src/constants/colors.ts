export const Colors = {
  white: '#FFFFFF',
  black: '#000000',

  background: '#100B1A',
  surface: '#1E1730',
  surfaceAlt: '#2A2040',

  brand: '#7C3AED',
  brandDark: '#5B21B6',
  brandDeep: '#3B0764',
  brandLight: '#A78BFA',

  btnPrimary: '#7C3AED',
  btnPrimaryPressed: '#6425D0',

  labelPrimary: '#FFFFFF',
  txtPrimary: '#F5F0FF',

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

  // Paleta neon usada em elementos de destaque (header, menu, carrossel),
  // inspirada nos murais/grafites de referência do projeto.
  // "Grafite Elétrico": roxo como cor primária, magenta como destaque.
  neon: {
    pink: '#FF4FA3',
    cyan: '#22D3EE',
    yellow: '#FFD23D',
    purple: '#7C3AED',
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
