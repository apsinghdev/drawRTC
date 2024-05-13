/* eslint-disable react/prop-types */
// AppContext.js
import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [parentState, setParentState] = useState("Parent State");

  return (
    <AppContext.Provider value={{ parentState, setParentState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };