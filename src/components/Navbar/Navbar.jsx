import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "../../App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fcfcfc",
    },
  },
});

const Navbar = () => {
  return (
    <>
      {" "}
      <ThemeProvider theme={darkTheme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <GitHubIcon
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              ></GitHubIcon>

              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {" "}
                GithubSearch
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Navbar;
