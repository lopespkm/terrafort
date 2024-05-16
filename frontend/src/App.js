import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: mode === "light" ? "#00461E" : "#00461E",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#00461E",
                },
            },
            palette: {
                type: mode,
                primary: { main: "#00461E" },
                textPrimary: mode === "light" ? "#00461E" : "#FFFFFF",
                borderPrimary: mode === "light" ? "#00461E" : "#FFFFFF",
                dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#00461E" },
                tabHeaderBackground: mode === "light" ? "#EEE" : "#00461E",
                optionsBackground: mode === "light" ? "#fafafa" : "#00461E",
				options: mode === "light" ? "#fafafa" : "#666",
				fontecor: mode === "light" ? "#00461E" : "#fff",
                fancyBackground: mode === "light" ? "#fafafa" : "#00461E",
				bordabox: mode === "light" ? "#eee" : "#00461E",
				newmessagebox: mode === "light" ? "#eee" : "#00461E",
				inputdigita: mode === "light" ? "#fff" : "#333",
				contactdrawer: mode === "light" ? "#fff" : "#333",
				announcements: mode === "light" ? "#ededed" : "#333",
				login: mode === "light" ? "#fff" : "#1C1C1C",
				announcementspopover: mode === "light" ? "#fff" : "#333",
				chatlist: mode === "light" ? "#eee" : "#333",
				boxlist: mode === "light" ? "#ededed" : "#333",
				boxchatlist: mode === "light" ? "#ededed" : "#00461E",
                total: mode === "light" ? "#fff" : "#222",
                messageIcons: mode === "light" ? "grey" : "#00461E",
                inputBackground: mode === "light" ? "#FFFFFF" : "#333",
                barraSuperior: mode === "light" ? "linear-gradient(to right, rgb(0, 70, 30), rgb(0, 70, 30), rgb(0, 70, 30))" : "#666",
				boxticket: mode === "light" ? "#EEE" : "#00461E",
				campaigntab: mode === "light" ? "#ededed" : "#333",
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Routes />
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
