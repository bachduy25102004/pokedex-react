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

  // console.log('favs', favorites);
  const [deletingPokemon, setDeletingPokemon] = useState(null);
  const [popNotification, setPopNotification] = useState(false);
  const [page, setPage] = useState(0);
  const [pokemonFetched, setPokemonFetched] = useState([]);
  console.log('pop:', popNotification)
  
  const ctx = {
    favorites,
    setFavorites,
    deletingPokemon,
    setDeletingPokemon,
    popNotification,
    setPopNotification,
    page,
    setPage,
    pokemonFetched,
    setPokemonFetched
  };

  return <AppContext value={ctx}>{children}</AppContext>;
}
