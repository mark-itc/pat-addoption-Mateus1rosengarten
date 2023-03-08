import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const authStates = createContext();

function AuthContext({ children }) {
  const [value, setValue] = useState({
    name: "",
    lastName: "",
    number: "",
    email: "",
    password: "",
  });

  const [tokenValue, setTokenValue] = useState("");
  const [loginObject, setLoginObject] = useState({});
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: "user",
  });

  useEffect(() => {
    setTokenValue(localStorage.getItem("apiKey"));
    setTimeout(() => {
      console.log("tokenval", localStorage.getItem("apiKey"));
    }, 2000);
  }, []);

  console.log("test", authState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success", response.data);
          setAuthState({
            username: response.data.name,
            email: response.data.email,
            status: true,
            role:response.data.role
          });
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
  }, [tokenValue]);

  return (
    <authStates.Provider
      value={{
        value,
        setValue,
        tokenValue,
        setTokenValue,
        loginObject,
        setLoginObject,
        authState,
        setAuthState,
      }}
    >
      {children}
    </authStates.Provider>
  );
}

export default AuthContext;
