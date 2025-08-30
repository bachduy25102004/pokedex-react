import { use, useEffect } from "react";
import { AppContext } from "./appContext";
import './Pokedex.css';

export default function Notification(props) {
  const ctx = use(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.setPopNotification(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div
      className={`notification-container ${
        ctx.popNotification ? "hide" : "show"
      }`}
    >
      {props.children}
      <button
        onClick={() => {
          ctx.setPopNotification(false);
        }}
      >
        X
      </button>
    </div>
  );
}
