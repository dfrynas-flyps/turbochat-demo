import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: '6px',
                },
            },
        },
    },
    typography: {
        fontFamily: `"Inter", "Roboto", sans-serif`,
    },
    palette: {
        grey: {
            A100: '#FCFCFC',
            A200: '#F7FAFF',
            '50': '#F8F9F9',
            '75': '#F1F2F3',
            '100': '#EAEBEE',
            '200': '#DADBE0',
            '300': '#C2C5CB',
            '400': '#aaafb6',
            '500': '#9299A1',
            '600': '#72767D',
            '700': '#505358',
            '800': '#404040',
            '900': '#0C0D0E',
        },
        brand: {
            '100': '#F4F9F7',
            '500': '#1B845C',
            '600': '#166E4D',
        },
        primary: {
            main: '#1F2617',
            '50': '#FFFBF3',
            '100': '#FFF6E5',
            '200': '#FFEDCC',
            '400': '#ff9a3f',
            '500': '#FF6B00',
            '600': '#DB4F00',
            '700': '#B73800',
        },
        secondary: {
            main: '#0000ff',
            '50': '#00071A14',
        },
        error: {
            '100': '#FFF4F3',
            '200': '#FEE8E7',
            main: '#ff0000',
            '400': '#fa958e',
            '500': '#F44336',
            '600': '#BD3328',
            '900': '#0C0D0E',
        },
        warning: {
            main: '#c5811e',
            '100': '#fff5e5',
            '200': '#ffe3b6',
            '300': '#ffcf86',
            '400': '#ffbb56',
            '500': '#ffa726',
            '600': '#c5811e',
            '700': '#8c5b14',
            '800': '#4f130e',
            '900': '#1a0f00',
        },
        success: {
            contrastText: '#fff',
            dark: '#1b5e20',
            light: '#4caf50',
            main: '#2e7d32',
            '100': '#f3fff8',
            '200': '#e5fff0',
            '300': '#ABECC7',
            '400': '#72DA9E',
            '500': '#00b64c',
            '600': '#008f3b',
        },
        info: {
            '100': '#e6eefe',
            '200': '#B7CEFD',
            '300': '#87ACFB',
            '400': '#578af9',
            '500': '#2768f7',
            '600': '#1f50c1',
            '700': '#153889',
            '800': '#3753D87A',
        },
        turkish: {
            '25': '#DCEDEF',
            '50': '#CFE4E7',
            '500': '#097F8A',
            '600': '#097079',
        },
        hibiscus: {
            '25': '#F6E5EB',
            '50': '#F2D9E3',
            '500': '#B13F6B',
            '600': '#B13F6B',
        },
        grape: {
            '25': '#EDE3F7',
            '50': '#E4D7F2',
            '500': '#5A11A1',
            '600': '#5A11A1',
        },
        sapphire: {
            '25': '#E1E6F9',
            '50': '#D7DFF6',
            '500': '#3049BD',
            '600': '#3049BD',
        },
        forest: {
            '25': '#DDEEE1',
            '50': '#CFE5D5',
            '500': '#063619',
            '600': '#063619',
        },
        olive: {
            '25': '#DEE5CD',
            '50': '#D2D9BB',
            '500': '#496501',
            '600': '#496501',
        },
        amber: {
            '25': '#F4DBD2',
            '50': '#EFCEC3',
            '500': '#912801',
            '600': '#902801',
        },
        common: {
            black: '#000000',
            white: '#ffffff',
        },
    },
    customPalette: {
        form: {
            primary: '#fa6b02',
            secondary: '#fffbf3',
            inputBackground: '#f8f9f9',
            link: '#2768f7',
            borderColor: '#eaebee',
            textGreyed: '#72767D',
            textMuted: '#aaafb6',
            borderRadius: '7px',
        },
    },
});
export default theme;
//# sourceMappingURL=theme.js.map