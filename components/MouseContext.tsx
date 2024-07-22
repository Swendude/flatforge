import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type MousePosition = { x: number; y: number };

const MouseContext = createContext<
  undefined | [MousePosition, FC<{ children: ReactNode }>]
>(undefined);

export const useMouseContext = () => {
  const mouseContextI = useContext(MouseContext);
  if (!mouseContextI) {
    throw new Error(
      "No MouseContext provider found when calling useMouseContext",
    );
  }
  return mouseContextI;
};

export const MouseProvider = ({ children }: { children: ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (wrapperRef.current?.nodeType === Node.ELEMENT_NODE) {
        const { left, top, width, height } =
          wrapperRef.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        setMousePos(() => {
          return {
            x: Math.round(elementX - 0.5 * width),
            y: Math.round(elementY - 0.5 * height),
          };
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <div className="h-fit w-fit" ref={wrapperRef}>
        {children}
      </div>
    );
  };
  return (
    <MouseContext.Provider value={[mousePos, Wrapper]}>
      {children}
    </MouseContext.Provider>
  );
};
