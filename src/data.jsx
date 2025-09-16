import { use, useState } from "react";
import { AppContext } from "./appContext";

let cache = new Map();

export default function getData(page) {
  if (!cache.has(page)) {
    cache.set(page, fetch20PokedexData(page))
  }
  return cache.get(page);
}

async function fetch20PokedexData(page) {
  const limit = 20;
  const pokemonList = [];
  const offset = page * limit;
//   try 
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  const data = await res.json();
  console.log(data);
  
  // return data.results;
//  ) catch 
//   console.log(res);
//   const data = await res.json();

    // console.log('fetching data');


//   return data;
    // .then((res) => res.json())
    // .then(async (data) => {
    //   // console.log(data);
    //   // setPokemon(data.results);
    //   //   setIsLoading(false);
      const { results } = data;
      for (const pkm of results) {
        try {
          const response = await fetch(pkm.url);
          const pkmData = await response.json();
          const pokemonObject = {
            id: pkmData.id,
            name: pkmData.name,
            sprite:
              pkmData["sprites"]["other"]["official-artwork"]["front_default"],
            types: pkmData.types.map((t) => t.type.name),
          };

          // console.log(pkmData.types);

          pokemonList.push(pokemonObject);
        } catch (err) {
          console.log(err);
        }
      }
    //   // console.log(pokemonList);

    //   // setPokemons([...pokemons, ...pokemonList]);
    //   // setIsLoading(false);
    // })
    // .catch((err) => {
    //   console.log("fetch error!!!!");
    // });
  console.log(pokemonList);

  return pokemonList;
}
