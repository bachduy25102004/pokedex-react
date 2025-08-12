import { useEffect, useState } from "react";

export default function useWindowDimension() {
  const [windowDimension, setWindowDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const onResizehandler = () => {
    setWindowDimension([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    window.addEventListener("resize", onResizehandler);

    return () => {
        window.removeEventListener('resize', onResizehandler)
    }
  }, []);

  return windowDimension;
}
