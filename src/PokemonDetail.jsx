import { use, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { toTitleCase } from "./Components/PokeCard";
import { AppContext } from "./appContext";
import Modal from "./Modal";
import Notification from "./Notification";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const {
    favorites,
    setFavorites,
    deletingPokemon,
    setDeletingPokemon,
    popNotification,
    setPopNotification,
  } = use(AppContext);
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
        favicon:
          pokemonData["sprites"]["versions"]["generation-vii"]["icons"][
            "front_default"
          ],
        types: pokemonData.types.map((t) => t.type.name),
        stats: [
          pokemonData.stats.map((stat) => stat.base_stat),
          pokemonData.stats.map((stat) => stat.stat.name),
        ],
      };
      setPokemon(detailedPokemonObject);
      document.title = `${toTitleCase(detailedPokemonObject.name)} | Pokedex`;
    } catch (err) {
      console.log(err);
    }
  }, [name]);

  

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect((document.title = pokemon.name), [pokemon]);

  useEffect(() => {
    if (!pokemon) return;

    if (favorites.find((pkm) => pkm.id === pokemon.id)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [fetchData, pokemon]);

  function addToFavorite() {
    if (!favorites.find((pkm) => pkm.id === pokemon.id)) {
      console.log(`adding ${pokemon.name}`);

      setFavorites([...favorites, pokemon]);
      setIsFav(true);
      setPopNotification(true);
    } else {
      console.log(`${pokemon.name} is already in favorites!`);
    }
  }
  // const [deletingPokemon, setDeletingPokemon] = useState(null);

  function removeFromFavorite() {
    console.log(`deleting  ${pokemon.name}`);

    let newFavs = structuredClone(favorites);

    newFavs = newFavs.filter((pkm) => pkm.id !== pokemon.id);

    console.log("newfavs:", newFavs);

    setFavorites(newFavs);
    setDeletingPokemon(null);
    setIsFav(false);
  }

  function popOffOverlay(e) {
    if (e.target === e.currentTarget) {
      setDeletingPokemon(null);
      e.stopPropagation();
      e.preventDefault();
    }
  }

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
        <button
          onClick={() => {
            console.log(`deleting ${pokemon}`);
            setDeletingPokemon(pokemon);
          }}
        >
          ❤️
        </button>
      ) : (
        <button onClick={addToFavorite}>🖤</button>
      )}

      {popNotification && (
        <Notification>
          {toTitleCase(pokemon.name)} added to favorite!
        </Notification>
      )}

      {!!deletingPokemon && (
        <Modal>
          <h1>Deleting {toTitleCase(deletingPokemon.name)} </h1>
          <div className="abc">
            <button className="btn-delete" onClick={removeFromFavorite}>
              Delete
            </button>
            <button
              className="btn-cancel"
              onClick={() => setDeletingPokemon(null)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
