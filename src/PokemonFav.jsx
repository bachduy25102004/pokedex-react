import { use } from "react";
import { AppContext } from "./appContext";
import PokeCard, { toTitleCase } from "./Components/PokeCard";
import Modal from "./Modal";

export default function PokemonFav() {
  const { favorites, setFavorites, deletingPokemon, setDeletingPokemon } =
    use(AppContext);
  document.title = "Favorite";
  function removeFromFavorite() {
    // console.log(`deleting  ${pokemon.name}`);

    let newFavs = structuredClone(favorites);

    newFavs = newFavs.filter((pkm) => pkm.id !== deletingPokemon.id);

    console.log("newfavs:", newFavs);

    setFavorites(newFavs);
    setDeletingPokemon(null);
  }
  return (
    <>
      <div
        className="pokegrid"
        //   style={{
        //     gridTemplateColumns: width <= 425 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        //   }}
      >
        {favorites.map((pkm) => (
          <PokeCard pokemon={pkm} key={pkm.name} />
        ))}
      </div>
      {!!deletingPokemon && (
        <Modal>
          <h1>Deleting {toTitleCase(deletingPokemon.name)} </h1>
          <div className="flex mb-[64px] justify-center gap-8 mt-12">
            <button className="bg-red-500 px-6 py-1 rounded-lg text-[1.7rem] hover:bg-red-700" onClick={removeFromFavorite}>
              Delete
            </button>
            <button
              className="bg-gray-500 px-6 py-1 rounded-lg text-[1.7rem] hover:bg-gray-400 "
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
