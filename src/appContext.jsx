import { createContext, useState } from "react";

export const AppContext = createContext();

export function ContextProvider({ children }) {
  const [favorites, setFavorites] = useState([
    {
      name: "charizard",
      id: 6,
      sprite:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
      types: ['fire', 'flying'],
    },
  ]);

  console.log('favs', favorites);
  
  const ctx = {
    favorites,
    setFavorites,
  };

  return <AppContext value={ctx}>{children}</AppContext>;
}
