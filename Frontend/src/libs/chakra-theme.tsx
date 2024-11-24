// import { extendTheme } from "@chakra-ui/react";
// const theme = extendTheme({
//     colors: {
//         circle: {
//             grey: '#909090',
//             greyCard: '#262626',
//             greyBg: '#444444',
//             followBg: '#1D1D1D'
//         },
//         error: {
//             primary: '#FF0000'
//         }
//     },
// })

// export default theme;


import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        circle: {
            grey: '#909090',
            greyCard: '#262626',
            greyBg: '#444444',
            followBg: '#1D1D1D',
        },
        error: {
            primary: '#FF0000',
        },
    },
    styles: {
        global: {
            'html, body, #root': {
                margin: 0,
                padding: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden', // Hilangkan scroll jika ada
            },
        },
    },
});

export default theme;
