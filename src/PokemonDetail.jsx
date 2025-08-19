import { use, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { toTitleCase } from "./Components/PokeCard";
import { AppContext } from "./appContext";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { favorites, setFavorites } = use(AppContext);
  const [isFav, setIsFav] = useState(false);

  //   console.log(name);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = await res.json();
      const detailedPokemonObject = {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite:
          pokemonData["sprites"]["other"]["official-artwork"]["front_default"],
        types: pokemonData.types.map((t) => t.type.name),
        stats: [
          pokemonData.stats.map((stat) => stat.base_stat),
          pokemonData.stats.map((stat) => stat.stat.name),
        ],
      };
      setPokemon(detailedPokemonObject);
    } catch (err) {
      console.log(err);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!pokemon) return;

    if (favorites.find((pkm) => pkm.id === pokemon.id)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [fetchData, pokemon]);

  function AddToFavorite() {
    if (!favorites.find((pkm) => pkm.id === pokemon.id)) {
      console.log(`adding ${pokemon.name}`);

      setFavorites([...favorites, pokemon]);
      setIsFav(true);
    } else {
      console.log(`${pokemon.name} is already in favorites!`);
    }
  };

  function RemoveFromFavorite() {
    console.log(`deleting  ${pokemon.name}`);

    let newFavs = structuredClone(favorites);

    newFavs = newFavs.filter((pkm) => pkm.id !== pokemon.id);

    console.log("newfavs:", newFavs);

    setFavorites(newFavs);
    setIsFav(false);
  };

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/pokedex">Back to Home</Link>
      <h1>{toTitleCase(pokemon.name)}</h1>
      <img src={pokemon.sprite} alt="" />
      <p>#{pokemon.id}</p>
      {isFav ? (
        <button onClick={RemoveFromFavorite}>❤️</button>
      ) : (
        <button onClick={AddToFavorite}>🖤</button>
      )}
    </>
  );
}
