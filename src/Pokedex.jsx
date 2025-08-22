import { useEffect, useRef, useState } from "react";
import PokeCard from "./Components/PokeCard";
import "./Pokedex.css";
import titleImg from "./assets/title.png";
import { toTitleCase } from "./Components/PokeCard";
import useWindowDimension from "./hooks/useWindowDimension";
import { Link } from "react-router";
import { useLocation } from "react-router";
import MyButton from "./Components/MyButton";
import { use } from "react";
import { AppContext } from "./appContext";
import Modal from "./Modal";

export default function Pokedex() {
  const { favorites, setFavorites, deletingPokemon, setDeletingPokemon} = use(AppContext)
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const fetchAPI = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  const [page, setPage] = useState(0);
  const limit = 20;
  const offset = page * limit;
  const isFirstRender = useRef(true);
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const inputSearchRef = useRef(null);
  const timeoutRef = useRef(null);
  const [width, height] = useWindowDimension();
  const location = useLocation();
  console.log("dimensions:", width, height);

  document.title = "Pokedex";
  const fakePokemonData = [
    {
      name: "bulbasaur",
      id: 1,
    },
    {
      name: "ivysaur",
      id: 2,
    },
    {
      name: "venusaur",
      id: 3,
    },
    {
      name: "charmander",
      id: 4,
    },
    {
      name: "charmeleon",
      id: 5,
    },
    {
      name: "charizard",
      id: 6,
    },
    {
      name: "squirtle",
      id: 7,
    },
    {
      name: "wartortle",
      id: 8,
    },
    {
      name: "blastoise",
      id: 9,
    },
  ];

  const onClickHandler = (pkm, selected) => {
    if (selected) {
      setSelectedPokemon([...selectedPokemon, pkm]);
    } else {
      setSelectedPokemon((prev) =>
        prev.filter((pokemon) => pokemon.id !== pkm.id)
      );
    }
  };

  useEffect(() => {
    console.log("useeffect with no deps");

    setIsLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        const { results } = data;

        console.log(results);

        const pokemonList = [];

        for (const pkm of results) {
          try {
            const pokemonDetailResponse = await fetch(pkm.url);
            const pokemonDetailData = await pokemonDetailResponse.json();

            const pokemonObject = {
              id: pokemonDetailData.id,
              name: pokemonDetailData.name,
              sprite:
                pokemonDetailData["sprites"]["other"]["official-artwork"][
                  "front_default"
                ],
              types: [],
            };
            pokemonList.push(pokemonObject);
          } catch (err) {
            console.log(err);
          }
        }

        console.log("pokemonlist: ", pokemonList);
        setPokemons(pokemonList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("network error");
        setFailed(true);
        setIsLoading(false);
      });
  }, []);

  const fetchData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data);
        // setPokemon(data.results);
        //   setIsLoading(false);
        const pokemonList = [];
        const { results } = data;
        for (const pkm of results) {
          try {
            const response = await fetch(pkm.url);
            const pkmData = await response.json();
            const pokemonObject = {
              id: pkmData.id,
              name: pkmData.name,
              sprite:
                pkmData["sprites"]["other"]["official-artwork"][
                  "front_default"
                ],
              types: pkmData.types.map((t) => t.type.name),
            };

            // console.log(pkmData.types);

            pokemonList.push(pokemonObject);
          } catch (err) {
            console.log(err);
          }
        }
        // console.log(pokemonList);

        setPokemons([...pokemons, ...pokemonList]);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log("fetch error!!!!");
      });
  };

  useEffect(() => {
    console.log("page", page);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    fetchData();
    // setIsLoading(true);
    // setTimeout(() => {
    // }, 3000);
  }, [page]);

  // useEffect(() => {
  //   if (pokemons.length === 0) setIsLoading(true);
  //   else setIsLoading(false);
  // }, [pokemons]);

  const searchHandler = () => {
    console.log();

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (inputSearchRef.current) {
        console.log(inputSearchRef.current.value);

        const searchValue = inputSearchRef.current.value.toLowerCase();
        if (!searchValue) {
          setSearchResults([]);
          return;
        }
        const matchedPokemons = fakePokemonData.filter((pkm) =>
          pkm.name.toLowerCase().includes(searchValue)
        );
        console.log(matchedPokemons);

        setSearchResults(matchedPokemons);
      }
    }, 500);
  };

  function removeFromFavorite() {
    // console.log(`deleting  ${pokemon.name}`);

    let newFavs = structuredClone(favorites);

    newFavs = newFavs.filter((pkm) => pkm.id !== deletingPokemon.id);

    console.log("newfavs:", newFavs);

    setFavorites(newFavs);
    setDeletingPokemon(null);
    // setIsFav(false);
  }

  return (
    <>
      <div>
        {/* <h1>My Pokemons</h1> */}
        <div>
          {selectedPokemon.map((pkm) => (
            <div key={pkm.id}>{pkm.name}</div>
          ))}
        </div>
      </div>

      {/* <h1>Pokedex</h1> */}
      <div className="title-container">
        <img src={titleImg} alt="" />
      </div>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search pokemon..."
            ref={inputSearchRef}
            onChange={searchHandler}
          />
          <button>🔎</button>

          {searchResults.length > 0 && (
            <div className="search-result-box">
              {searchResults.map((pkm) => (
                <Link
                  to={`${location.pathname}/${pkm.id}`}
                  key={pkm.id}
                  className="linku"
                >
                  <div key={pkm.id}>{toTitleCase(pkm.name)}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <p>is Loading...</p>
      ) : (
        <div
          className="pokegrid"
          style={{
            gridTemplateColumns:
              width <= 425 ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          }}
        >
          {/* <div className="side-column"></div> */}
          {pokemons.map((pkm) => (
            <PokeCard pokemon={pkm} key={pkm.name} onClicked={onClickHandler} />
          ))}
          {/* <div className="side-column"></div> */}
        </div>
      )}

      <MyButton className="showmore-button" onClick={() => setPage(page + 1)}>
        Show more Pokemon
      </MyButton>
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
