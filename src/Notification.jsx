import { use, useEffect } from "react";
import { AppContext } from "./appContext";

export default function Notification(props) {
  const ctx = use(AppContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.setPopNotification(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  console.log('pop:', ctx.popNotification)

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
