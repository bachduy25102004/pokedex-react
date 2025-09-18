import { use, useEffect } from "react";
import { AppContext } from "./appContext";
import "./Pokedex.css";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Notification(props) {
  const ctx = use(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.setPopNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [ctx.popNotification]);

  useEffect(() => {
    console.log('Notification alert: ', ctx.popNotification);
  }, [ctx.popNotification]);

  return createPortal(
    <>
      {ctx.popNotification && (
        <div className={"notification-container"}>
          <span className="text-[1.1rem]">{props.children}</span>
          <X
            size={32}
            onClick={() => {
              ctx.setPopNotification(false);
            }}
          ></X>
        </div>
      )}
    </>,
    document.querySelector("#notification-container")
  );
}
