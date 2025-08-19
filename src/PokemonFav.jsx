import { use } from "react";
import { AppContext } from "./appContext";
import PokeCard from "./Components/PokeCard";

export default function PokemonFav() {
  const ctx = use(AppContext);

  return (
    <div
      className="pokegrid"
    //   style={{
    //     gridTemplateColumns: width <= 425 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
    //   }}
    >
      {ctx.favorites.map((pkm) => (
        <PokeCard pokemon={pkm} key={pkm.name} />
        
      ))}
    </div>
  );
}
