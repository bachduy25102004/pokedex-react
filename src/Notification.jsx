import { use, useEffect } from "react";
import { AppContext } from "./appContext";
import "./Pokedex.css";
import { X } from "lucide-react";

export default function Notification(props) {
  const ctx = use(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.setPopNotification(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
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
    </>
  );
}
