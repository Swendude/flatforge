import { createUseEnsureContext } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type State = {
  gridCountI: number;
  size: number;
  gridCounts: number[];
  boundingBoxes: boolean;
};

type Action =
  | { type: "GridCountI_set"; payload: number }
  | { type: "boundingBoxes_toggle" };

const context = createContext<{
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
    case "boundingBoxes_toggle":
      return { ...state, boundingBoxes: !state.boundingBoxes };
  }
};

export const useCanvasContext = createUseEnsureContext(context);

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
    boundingBoxes: false,
  });

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
};
