import React from "react";
import './styles/App.scss';
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "./styles/theme";
import HomePage from "./pages/HomePage";
import {CssBaseline} from "@mui/material";
import NavBar from "./components/NavBar";
import {BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
