import "../ComponentsHomeOut/Navbar.css";
import {useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";
import axios from "axios";

function HomeLogIn() {
  const { loginObject, setLoginObject,authState,setAuthState,value,setValue,tokenValue,setTokenValue } = useContext(authStates);




  useEffect(()=> {
setTokenValue(localStorage.getItem("apiKey"));


  },[])



  setTimeout(() => {
    

   
    setLoginObject('Authorized')

  },500)



  

  let response 
  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success", response.data.name);
          setValue(response)
          
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
    
  }, [tokenValue]);
  

  return (  
    <> 
    {loginObject === "Authorized" && <h1 className="styleh1">Welcome {value.data.name} {value.data.lastName} </h1> }
    <h2 className="styleh2">Start your search for Pets !!  </h2>
    <h3 className="styleh3">HAVE FUN </h3> 
     
    </>
  );
}

export default HomeLogIn;
