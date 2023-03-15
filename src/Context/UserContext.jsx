import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const userStates = createContext();

function UserContexts({ children }) {
  const [user, setUser] = useState('');
  const [userList,setUserList] = useState('')
  
  useEffect(() => {
    axios.get("http://localhost:3000/user").then((res) => setUser(res.data));
  }, []);



  return (
    <userStates.Provider value={{ user, setUser,userList,setUserList }}>
      {children}
    </userStates.Provider>
  );
}

export default UserContexts;
