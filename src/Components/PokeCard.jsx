import { use, useEffect, useState } from "react";
import "../Pokedex.css";
import { Link, useLocation } from "react-router";
import Pokedex from "../Pokedex";
import { AppContext } from "../appContext";
import Modal from "../Modal";
export function toTitleCase(name) {
  const firstChar = name[0];
  return firstChar.toUpperCase() + name.slice(1);
}

export default function PokeCard(props) {
  const { pokemon, onClicked } = props;
  const [selected, setSelected] = useState(false);
  const location = useLocation();
  const { favorites, setFavorites, deletingPokemon, setDeletingPokemon } = use(AppContext);
  const [isFav, setIsFav] = useState(false);
  // console.log(location.pathname);

  const onPokemonSelect = () => {
    setSelected(!selected);
  };

  // useEffect(() => {
  //   onClicked(pokemon, selected)
  // }, [selected]);

  const formatID = (num) => {
    let newID = num.toString();
    while (newID.length < 4) {
      newID = "0" + newID;
      // console.log(newID);
    }

    return "#" + newID;
  };

  useEffect(() => {
    if (!pokemon) return;

    if (favorites.find((pkm) => pkm.id === pokemon.id)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [pokemon]);

  function AddToFavorite(evt) {
    console.log(evt);

    evt.stopPropagation();
    evt.preventDefault();
    if (!favorites.find((pkm) => pkm.id === pokemon.id)) {
      console.log(`adding ${pokemon.name}`);

      setFavorites([...favorites, pokemon]);
      setIsFav(true);
    } else {
      console.log(`${pokemon.name} is already in favorites!`);
    }
  }

  function RemoveFromFavorite(evt) {
    console.log("evt:", evt);
    // return;

    evt.stopPropagation();
    evt.preventDefault();
    console.log(`deleting  ${pokemon.name}`);
    let newFavs = structuredClone(favorites);

    newFavs = newFavs.filter((pkm) => pkm.id !== pokemon.id);

    console.log("newfavs:", newFavs);

    setFavorites(newFavs);
    setDeletingPokemon(null);
    setIsFav(false);
  }

  function togglePopUp(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    setDeletingPokemon(pokemon);
  }

  return (
    
    // <div className="pokecard" onClick={onPokemonSelect}>
    <>
      <Link to={`/pokedex/${pokemon.id}`} className="pokecard">
        {/* <div className={`image-wrapper type-${pokemon.types[0]}`}> */}
        <img src={pokemon.sprite} alt="" />
        {/* </div> */}
        {favorites.find((pkm) => pkm.id === pokemon.id) ? (
          <button onClick={togglePopUp}>❤️</button>
        ) : (
          <button onClick={AddToFavorite}>🖤</button>
        )}
        <p className="pokeID">{formatID(pokemon.id)}</p>
        {!favorites.find((pkm) => pkm.id === pokemon.id) ? (
          <p className="pokeName">{toTitleCase(pokemon.name)}</p>
        ) : (
          <p className="pokeName">❤️{toTitleCase(pokemon.name)}❤️</p>
        )}
        <div className="types">
          {pokemon.types.map((type) => (
            <div key={type} className={`type-${type}`}>
              {toTitleCase(type)}
            </div>
          ))}
        </div>
        {/* </div> */}
      </Link>
      {/* {!!deletingPokemon && (
        <Modal>
          <h1>Deleting {toTitleCase(deletingPokemon.name)} </h1>
          <div className="abc">
            <button className="btn-delete" onClick={RemoveFromFavorite}>
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
      )} */}
    </>
  );
}
