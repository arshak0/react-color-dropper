import {createTheme} from "@mui/material/styles";
import {green, red} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4369EE',//blue
        },
        secondary: {
            main: '#cccccc',//lightgray
            light: '#e4e4e4',
        },
        error: {
            main: red.A400,
        },
        success: {
            main: green.A400,
        },
    },
    spacing: [0, 4, 8, 16, 32, 64],
    typography: {
        button: {
            textTransform: 'none'
        },
        subtitle1: {
            fontSize: 11,
        },
        subtitle2: {
            fontSize: 9,
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 1024,
            xl: 1536,
        },
    },
});
