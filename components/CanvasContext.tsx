import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type State = { gridCountI: number; size: number; gridCounts: number[] };

type Action = { type: "GridCountI_set"; payload: number };

const Context = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GridCountI_set":
      return {
        ...state,
        gridCountI: action.payload,
      };
  }
};

export const useCanvasContext = () => {
  const canvasContextMaybe = useContext(Context);
  if (!canvasContextMaybe) {
    throw new Error("No <CanvasProvider/> found when calling useCanvasContext");
  }
  return canvasContextMaybe;
};

export const CanvasProvider = ({
  children,
  size = 500,
  gridCountI = 2,
}: {
  children: ReactNode;
  size?: number;
  gridCountI?: number;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    size: size,
    gridCountI: gridCountI,
    gridCounts: [10, 20, 50, 100],
  });

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
