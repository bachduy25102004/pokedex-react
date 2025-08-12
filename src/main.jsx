import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Rophim from "./Rophim.jsx";
import App from "./App.jsx";
import Pokedex from "./Pokedex.jsx";
import { Route, Routes, BrowserRouter } from "react-router";
import PokemonDetail from "./PokemonDetail.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rophim" element={<Rophim />} />
        <Route path="/pokedex">
          <Route index element={<Pokedex />} />
          <Route path=":name" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
