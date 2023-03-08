import "./Navbar.css";
import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthModal from "./AuthModal";
import LoginModal from "./LoginModal";
import { useContext } from "react";
import { globalStates } from "../Context/StatesContexts";
import { NavLink } from "react-router-dom";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [modal, setModal] = useState(false);
  const [log, setLog] = useState(false);
  const { isModal, setIsModal } = useContext(globalStates);
  const { authState, setAuthState } = useContext(authStates);
  const { loginObject, setLoginObject } = useContext(authStates);
  const navigate = useNavigate();

  const signUpHandle = () => {
    setModal(!modal);
    setIsModal(!isModal);
  };

  const loginHandle = () => {
    setLog(!log);
    setIsModal(!isModal);
  };

  const logoutFunction = () => {
    window.localStorage.clear();
    setLoginObject("");
    navigate("/");
    navigate(0);
  };

  return (
    <div className="navbar-style">
      <ul>
        <li className="profile-link">
          <NavLink to={"/Profile"}>Profile</NavLink>
        </li>
        <li className="search-loged-link">
          <NavLink to={"/search"}>Search</NavLink>
        </li>

        {authState.email === "mateus.rosengartenn@gmail.com" && (
          <li className="adm-link">
            <NavLink to={"/adm"}>Dash</NavLink>
          </li>
        )}

        <li>
          {" "}
          <AuthButton
            handleSignUp={signUpHandle}
            handleLogin={loginHandle}
          ></AuthButton>{" "}
        </li>

        <li>
          {modal && <AuthModal toggleModal={signUpHandle}></AuthModal>}
          {log && <LoginModal toggleModal={loginHandle}></LoginModal>}
        </li>

        <li>
          {authState.status && (
            <button className="button-logout" onClick={logoutFunction}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
