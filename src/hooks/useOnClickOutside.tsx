import { useEffect, useRef } from "react";

export let useClickOutside = (
  handler: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let domNode = useRef<any>();

  useEffect(() => {
    let maybeHandler = (event: MouseEvent) => {
      if (!domNode.current!.contains(event.target)) {
        handler(false);
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
