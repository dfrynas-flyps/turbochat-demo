import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteColor {
    '25'?: string
    '50'?: string
    '75'?: string
    '100'?: string
    '200'?: string
    '300'?: string
    '400'?: string
    '500'?: string
    '600'?: string
    '700'?: string
    '800'?: string
    '900'?: string
    A100?: string
    A200?: string
  }

  interface Color {
    '25'?: string
    '50'?: string
    '75'?: string
  }

  interface PaletteOptions {
    brand?: PaletteColorOptions
    turkish?: PaletteColorOptions
    hibiscus?: PaletteColorOptions
    grape?: PaletteColorOptions
    sapphire?: PaletteColorOptions
    forest?: PaletteColorOptions
    olive?: PaletteColorOptions
    amber?: PaletteColorOptions
  }

  interface Palette {
    brand: PaletteColor
    turkish: PaletteColor
    hibiscus: PaletteColor
    grape: PaletteColor
    sapphire: PaletteColor
    forest: PaletteColor
    olive: PaletteColor
    amber: PaletteColor
  }

  interface TypeBackground {
    light?: string
  }

  interface ThemeOptions {
    customPalette?: {
      form?: {
        primary: string
        secondary: string
        inputBackground: string
        link: string
        borderColor: string
        textGreyed: string
        textMuted: string
        borderRadius: string
      }
    }
  }

  interface Theme {
    customPalette: {
      form: {
        primary: string
        secondary: string
        inputBackground: string
        link: string
        borderColor: string
        textGreyed: string
        textMuted: string
        borderRadius: string
      }
    }
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    brand: true
    turkish: true
    hibiscus: true
    grape: true
    sapphire: true
    forest: true
    olive: true
    amber: true
  }
}
