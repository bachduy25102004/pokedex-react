import { use } from "react";
import { Link } from "react-router";
import { AppContext } from "./appContext";

const routes = [
  {
    name: "Home Page",
    path: "/",
  },
  {
    name: "Rophim Page",
    path: "/rophim",
  },
  {
    name: "Pokedex",
    path: "/pokedex",
  },
  
];

export default function Navbar() {
  const ctx = use(AppContext);
  return (
    // <nav style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', borderColor: 'black', borderWidth: '3px', borderStyle: 'solid', position: 'fixed', top: '0', width: '100vw', background: '#bdc3c7'}}>
    <nav className="flex justify-evenly items-center border-black border-3 border-solid fixed top-0 w-screen h-24 bg-gray-400 z-10">  
    {routes.map((route) => {
        return (
          <Link to={route.path} key={route.name} style={{textDecoration: 'none', display: 'flex', padding: '20px'}}>
            
            <div>{route.name}</div>
          </Link>
        );
      })}

      <Link to='/pokedex/favorite' key='FavPokemon' style={{textDecoration: 'none', display: 'flex', padding: '20px'}}>
        <div>Favorite {ctx.favorites.length}</div>
      </Link>
    </nav>
  );
}
