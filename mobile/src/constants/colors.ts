export const Colors = {
  white: '#FFFFFF',
  black: '#000000',

  background: '#140607',
  surface: '#1F0B0D',
  surfaceAlt: '#2A1013',

  brand: '#9E1130',
  brandDark: '#6B0B21',
  brandDeep: '#3A0812',
  brandLight: '#D6455F',

  btnPrimary: '#9E1130',
  btnPrimaryPressed: '#7A0D25',

  labelPrimary: '#FFFFFF',
  txtPrimary: '#FFFFFF',

  cream: '#EEE0DA',

  overlayDark: 'rgba(20,6,7,0.55)',
  overlayBrand: 'rgba(58,8,18,0.62)',

  semantic: {
    error: { bg: '#2A0810', border: '#D6455F', text: '#EB8DA0' },
    success: { bg: '#08251A', border: '#5FD69B', text: '#8CE6BB' },
    warning: { bg: '#241A08', border: '#E8B65D', text: '#F2CE8F' },
    info: { bg: '#0A1C24', border: '#5DB8E8', text: '#8FD3F2' },
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
    '10': 'rgba(158,17,48,0.10)',
    '18': 'rgba(158,17,48,0.18)',
    '25': 'rgba(158,17,48,0.25)',
    '40': 'rgba(158,17,48,0.40)',
    '60': 'rgba(158,17,48,0.60)',
  },
} as const;
