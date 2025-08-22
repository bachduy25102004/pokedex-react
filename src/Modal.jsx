import { createPortal } from "react-dom";
import { AppContext } from "./appContext";
import { use } from "react";

export default function Modal(props) {
  const ctx = use(AppContext);
  function popOffOverlay(e) {
    if (e.target === e.currentTarget) {
      setDeletingPokemon(null);
      e.stopPropagation();
      e.preventDefault();
    }
  }
  if (!!props.children) {
    return createPortal(
      <div className="modal-overlay" onClick={popOffOverlay}>
        <div className="modal-content">{props.children}</div>
      </div>,
      document.querySelector("#modal-container")
    );
  }
    else {
      return createPortal((
      <div className="modal-overlay" onClick={popOffOverlay}>
        <div className="modal-content">
            Add 
        </div>
      </div>
      ), document.querySelector("#modal-container"))
    }
}
