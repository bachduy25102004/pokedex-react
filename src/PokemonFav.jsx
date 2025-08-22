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
