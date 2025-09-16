import { use, useEffect, useMemo, useState } from "react";
import getData from "./data";
import { AppContext } from "./appContext";
import PokeCard from "./Components/PokeCard";

export default function Pokemon() {
  const { page, setPage, pokemonFetched, setPokemonFetched } = use(AppContext);
  const [pokemons, setPokemons] = useState([]);
  // const pokeList = [{}];
  const pokemonResource = use(getData(page));

  

  useEffect(() => {
    // if (!!pokemonResource) {
      setPokemonFetched(prev => ([...prev, ...pokemonResource]))
    // pokemonResource.array.forEach((element) => {
    //   console.log("element", element);

    //   setPokemon([...pokemon, element]);
    //   // po(element);
    // });
    // }
    
  }, [pokemonResource]);

  // pokeList.push(pokemonResource);
  console.log(">> pokemon resource", pokemonResource);
  

  return (
    // <div
    //   className="pokegrid"
    //   style={
    //     {
    //       // gridTemplateColumns: width <= 425 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
    //     }
    //   }
    // >
      // {/* <div className="side-column"></div> */}
      <>
        {/* {pokemonFetched.map((pkm) => (
          <PokeCard
            pokemon={pkm}
            key={pkm.name}
            //  onClicked={onClickHandler}
          />
        ))} */}
      </>
      // {/* <div className="side-column"></div> */}
    // </div>
  );
}
