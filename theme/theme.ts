import { createTheme } from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: "#9C27B0",
        },
        secondary: {
            main: "#E8B4BC",
        },
    },
    typography: {
        fontFamily: "VAG Rounded Next, sans-serif",
        fontSize: 16,
        button: {
            textTransform: "none",
        },
    }
});

export default theme;
