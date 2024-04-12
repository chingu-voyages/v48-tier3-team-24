import type React from "react";
import { useEffect } from "react";

export const useClickOutside = (ref:React.MutableRefObject<HTMLElement|null>, handler:() => void) => {
  useEffect(() => {
    const listener = (e:Event) => {
      if(!ref?.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      }
      handler();
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
    };
  }, [handler, ref]);
}