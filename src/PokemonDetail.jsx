import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toTitleCase } from "./Components/PokeCard";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
//   console.log(name);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = await res.json();
      const detailedPokemonObject = {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite:
          pokemonData["sprites"]["other"]["official-artwork"][
            "front_default"
          ],
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

  if (!pokemon) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
            <Link to='/pokedex'>Back to Home</Link>
            <h1>{toTitleCase(pokemon.name)}</h1>
            <img src={pokemon.sprite} alt="" />
            <p>#{pokemon.id}</p>
            <p></p>
        </>
    )
}
