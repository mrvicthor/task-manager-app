import { useState, useEffect } from "react";

interface Size {
  width: number | undefined;
}

export const useWindowSize = () => {
  const [windowsWidth, setWindowsWidth] = useState<Size>({ width: undefined });

  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth((prev) => ({ ...prev, width: window.innerWidth }));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowsWidth;
};
