import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const userStates = createContext();

function UserContexts({ children }) {
  useEffect(() => {
    axios.get("http://localhost:3000/user").then((res) => setUser(res.data));
  }, []);

  const [user, setUser] = useState([]);

  return (
    <userStates.Provider value={{ user, setUser }}>
      {children}
    </userStates.Provider>
  );
}

export default UserContexts;
