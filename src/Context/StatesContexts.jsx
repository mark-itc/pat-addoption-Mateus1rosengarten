import { useState } from "react";
import { createContext } from "react";

export const globalStates = createContext();

function StateContexts({ children }) {
  const [isModal, setIsModal] = useState(false);

  return (
    <globalStates.Provider value={{ isModal, setIsModal }}>
      {children}
    </globalStates.Provider>
  );
}

export default StateContexts;
