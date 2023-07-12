import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#7d1400',
            light: '#FFE6A7',
        },
        secondary: {
            main: '#BB9457',
        },
        success: {
            main: '#283618', 
            light: '#606C38'
        },
        info: {
            main: '#432818',
            light: '#99582A'
        }
    },
    typography:{
        fontFamily: [
            'Josefin Sans, sans-serif',
            'Roboto Slab, serif',
        ].join(','),
    },
    components:{
        MuiButton:{
            styleOverrides:{
                root:{
                    backgroundColor: '#432818',
                    '&:hover': {
                        backgroundColor: '#7d1400',
                    },
                },
            },
        },
    },
});