import { use, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { formatID, toTitleCase } from "./Components/PokeCard";
import { AppContext } from "./appContext";
import Modal from "./Modal";
import Notification from "./Notification";
import ReturnArrow from "./Components/ReturnArrow";
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
  const [notiAlert, setNotiAlert] = useState("");

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
      console.log(detailedPokemonObject.stats[1]);

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

  const nextPokemonID = () => {
    if (pokemon.id === 1025) {
      return 1;
    } else {
      return pokemon.id + 1;
    }
  };

  const previousPokemonID = () => {
    if (pokemon.id === 1) {
      return 1025;
    } else {
      return pokemon.id - 1;
    }
  };

  function addToFavorite() {
    if (!favorites.find((pkm) => pkm.id === pokemon.id)) {
      console.log(`adding ${pokemon.name}`);

      setFavorites([...favorites, pokemon]);
      setIsFav(true);
      setPopNotification(true);
      setNotiAlert(`Added ${toTitleCase(pokemon.name)} to Favorites!!!`);
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
    setNotiAlert(`Removed ${toTitleCase(pokemon.name)} from Favorites`);
    setPopNotification(true);
  }

  function popOffOverlay(e) {
    if (e.target === e.currentTarget) {
      setDeletingPokemon(null);
      e.stopPropagation();
      e.preventDefault();
    }
  }

  const fuckingArrowLeft = "<";
  const fuckingArrowRight = ">";
  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/pokedex">
        <ReturnArrow />
      </Link>
      <div className="grid grid-cols-2 text-5xl  p-4 pb-6">
        <Link
          className="ml-2 hover:bg-blue-400"
          to={`/pokedex/${previousPokemonID()}`}
        >
          <span className="m-6 bg-white rounded-4xl pl-3 pr-4 pb-1 text-3xl">
            {fuckingArrowLeft}
          </span>
          {formatID(previousPokemonID())}
        </Link>
        <Link
          className="ml-auto mr-3 hover:bg-blue-400"
          to={`/pokedex/${nextPokemonID()}`}
        >
          {formatID(nextPokemonID())}
          <span className="m-6 bg-white rounded-4xl pr-3 pl-4 pb-1 text-3xl">
            {fuckingArrowRight}
          </span>
        </Link>
      </div>

      <div className="text-5xl flex gap-5 justify-center">
        <p className="text-gray-500">{formatID(pokemon.id)}</p>
        <h1>{toTitleCase(pokemon.name)}</h1>
      </div>
      <div className="grid grid-cols-4 mt-10 text-3xl bg-gray-500 p-4">
        <img
          className="bg-gray-300 rounded-2xl ml-25"
          src={pokemon.sprite}
          alt=""
        />
        <div className="flex flex-col mt-12">
          {pokemon.stats[1].map((statType) => (
            <div className="ml-auto mr-2 mt-1.5 p-[5px] text-amber-50">{statType}</div>
          ))}
        </div>
        <div className="col-span-2 mt-12">
          {pokemon.stats[0].map((stat) => (
            <div className="w-[40vw] border-2 border-solid border-black bg-amber-50 mt-1">
              <div
                className="bg-emerald-300 p-1 pl-2 border-r-2 border-solid border-black "
                style={{ width: `${(stat / 255) * 100}%` }}
              >
                {" "}
                {stat}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isFav ? (
        <button
          className=""
          onClick={() => {
            console.log(`deleting ${pokemon}`);
            setDeletingPokemon(pokemon);
          }}
        >
          ❤️ {toTitleCase(pokemon.name)} is already in Favorites
        </button>
      ) : (
        <button
          className="bg-gray-400 p-2 rounded-[14px] m-2"
          onClick={addToFavorite}
        >
          🖤 Add {toTitleCase(pokemon.name)} to Favorites ?{" "}
        </button>
      )}

      <Notification>{notiAlert}</Notification>

      {!!deletingPokemon && (
        <Modal>
          <h1>Deleting {toTitleCase(deletingPokemon.name)} </h1>
          <div className="flex mb-[64px] justify-center gap-8 mt-12">
            <button
              className="bg-red-500 px-6 py-1 rounded-lg text-[1.7rem] hover:bg-red-700"
              onClick={removeFromFavorite}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 px-6 py-1 rounded-lg text-[1.7rem] hover:bg-gray-400"
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
