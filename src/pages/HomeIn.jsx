import "../ComponentsHomeOut/Navbar.css";
import {useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";
import axios from "axios";

function HomeLogIn() {
  const { loginObject, setLoginObject,authState,value,tokenValue } = useContext(authStates);
  const [getID,setGetID] = useState(false);

  let idUser;

  useEffect(()=> {
console.log('loginobj',loginObject)
console.log('authst',authState)
console.log('valeue',value)
console.log('tokenvl',tokenValue)
  },[])

  


  // useEffect(() => {
  //   axios.get(`http://localhost:3000/user/${idUser.id}`).then((res) => {
  //     console.log("minharesp", res);
      
    
  //   });

  // },[getID])
  

  return (
    <> <h1 className="styleh1">Welcome </h1> 
    <h2 className="styleh2">Start your search for Pets !!  </h2>
    <h3 className="styleh3">HAVE FUN </h3>
     
    </>
  );
}

export default HomeLogIn;
