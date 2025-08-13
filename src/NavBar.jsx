import { Link } from "react-router";

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
  return (
    <nav style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', borderColor: 'black', borderWidth: '3px', borderStyle: 'solid'}}>
      {routes.map((route) => {
        return (
          <Link to={route.path} key={route.name} style={{textDecoration: 'none', display: 'flex', padding: '20px'}}>
            <div >{route.name}</div>
          </Link>
        );
      })}
    </nav>
  );
}
