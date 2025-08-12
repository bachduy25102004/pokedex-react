import { useState } from "react";

export default function MovieCard(props) {
  const { movie: mv, onDelete } = props;

  // const isClicked = false;

  const [click, setClick] = useState(false);

  const borderColorChange = () => {
    console.log("Clicked");

    // let copy = click;
    // copy = !copy;
    setClick(!click);
  };

  return (
    <div
      onClick={borderColorChange}
      style={{
        border: `1px solid ${click ? "red" : "black"}`,
        position: "relative",
      }}
    >
      <img src={mv.poster} alt="" width={"200px"} />
      <p>{mv.title}</p>
      <p>genre</p>
      <p>{props.button}</p>
      <button
        onClick={onDelete}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        X
      </button>
    </div>
  );
}
