import { useEffect, useState } from "react";
import "../Pokedex.css";
import { Link, useLocation } from "react-router";
import Pokedex from "../Pokedex";

export function toTitleCase(name) {
  const firstChar = name[0];
  return firstChar.toUpperCase() + name.slice(1);
};

export default function PokeCard(props) {
  const { pokemon, onClicked } = props;
  const [selected, setSelected] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  

  const onPokemonSelect = () => {
    setSelected(!selected);
  }

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

  return (
    
    // <div className="pokecard" onClick={onPokemonSelect}>
    <Link 
            to={`/pokedex/${pokemon.id}`} 
            className="pokecard" 
        >
      {/* <div className={`image-wrapper type-${pokemon.types[0]}`}> */}
      <img src={pokemon.sprite} alt="" />
      {/* </div> */}
      <p className="pokeID">{formatID(pokemon.id)}</p>
      <p className="pokeName">{toTitleCase(pokemon.name)}</p>
        <div className="types">
          {pokemon.types.map((type) => (
            <div key={type} className={`type-${type}`}>
              {toTitleCase(type)}
           </div>
          ))}
        </div>
      {/* </div> */}
    </Link>
  );
}
