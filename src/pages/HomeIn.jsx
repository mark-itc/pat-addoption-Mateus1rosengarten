import "../ComponentsHomeOut/Navbar.css";
import {useContext } from "react";
import { authStates } from "../Context/AuthContext";

function HomeLogIn() {
  const { authState } = useContext(authStates);
  

  return (
    <>
      <h1 className="styleh1">Welcome {authState.username} </h1>
    </>
  );
}

export default HomeLogIn;
