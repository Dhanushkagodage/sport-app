import React, {
    createContext,
    useReducer,
    ReactNode,
    Dispatch,
    useEffect,
  } from "react";
  
  type CountAction =
      | { type: "increment" }
      | { type: "decrement" }
   
  
  interface CountContextType {
      state: number;
      dispatch: Dispatch<CountAction>;
      }
  
  
  export const UpdateCountContext = createContext<CountContextType | null>(
      null
  );
  
  
  const countReducer = (state: number, action: CountAction) => {
      switch (action.type) {
          case "increment":
              if (state === 100) {
                  return state;
              }
              return state + 1;
          case "decrement":
              if (state === 0) {
                  return state;
              }
              return state - 1;
          default:
              return state;
      }
  }
  
  export const UpdateCountContextProvider = ({ children }: { children: ReactNode }) => {
      const [state, dispatch] = useReducer(countReducer, 0);
  
      useEffect(() => {
          console.log("Count: ", state);
      }, [state]);
  
      return (
          <UpdateCountContext.Provider value={{ state, dispatch }}>
              {children}
          </UpdateCountContext.Provider>
      );
  }