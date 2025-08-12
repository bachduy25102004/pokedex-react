import { useState } from "react";
import MovieCard from "./Components/MovieCard";

const movieData = [
  { 
    poster:
      "https://static.nutscdn.com/vimg/400-0/6851d117d10b27330999205e42568126.webp",
    title: "The Fantastic Four: First Steps",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/e638f641bb9792173cab22cb5f4ce738.jpg",
    title: "Thám Tử Lừng Danh Conan Movie 27: Ngôi Sao 5 Cánh 1 Triệu Đô",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/58193a004ba1bf56b271215bd51c093c.jpg",
    title: "Bí Kíp Luyện Rồng",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/58193a004ba1bf56b271215bd51c093c.jpg",
    title: "Bí Kíp Luyện Rồng",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/58193a004ba1bf56b271215bd51c093c.jpg",
    title: "Bí Kíp Luyện Rồng",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/58193a004ba1bf56b271215bd51c093c.jpg",
    title: "Bí Kíp Luyện Rồng",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/58193a004ba1bf56b271215bd51c093c.jpg",
    title: "Bí Kíp Luyện Rồng",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
  {
    poster:
      "https://static.nutscdn.com/vimg/400-0/58193a004ba1bf56b271215bd51c093c.jpg",
    title: "Bí Kíp Luyện Rồng",
    genres: ["Chiếu Rạp", "Siêu Anh Hùng"],
  },
];

export default function Rophim() {
  const [movies, setMovies] = useState(movieData);
  const [input, setInput] = useState('');
  
  const onInput = (e) => {      
    console.log(e.target.value);
    setInput(e.target.value);
    if (e.target.value === null) {
      setMovies(movieData);
      return;           
    }
    const filteredMovies = movieData.filter(mv => mv.title.toLowerCase().includes(e.target.value));
    setMovies(filteredMovies);
  }

  const onDeleteHandler = (i) => {
    console.log("deleting");

    const copy = [...movies];
    copy.splice(i, 1);
    setMovies(copy);
  };

  const resetHandler = () => {
    setInput('');
    setMovies(movieData);
  }

  return (
    <>
      <input value={input} type="text" onChange={onInput}/>
      <button onClick={resetHandler}>X</button>
      <div
        style={{
          display: "flex",
          gap: "20px",
          overflow: "scroll",
          width: "100%",
        }}
      >
        {movies.map((mov, index) => (
          <MovieCard
            movie={mov}
            key={Math.random()}
            onDelete={() => onDeleteHandler(index)}
          />
        ))}
      </div>
    </>
  );
}
