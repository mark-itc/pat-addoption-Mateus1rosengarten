import "./AuthModal.css";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function LoginModal({ toggleModal }) {
  const { loginObject, setLoginObject } = useContext(authStates);

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(loginObject);

    const loginPath = "http://localhost:3000/login";
    axios.post(loginPath, { ...loginObject }).then((res) => {
      console.log(res);
      const mytoken = res.data.token;
      localStorage.setItem("apiKey", mytoken);
      navigate("/user");
      navigate(0);
    });
  };

  return (
    <div className="modal-auth">
      <div className="overlay">
        <div className="modal-content">
          <h1 className="h1-modal-content">Login to your account</h1>

          <input
            className="input-modal"
            onChange={(e) =>
              setLoginObject({ ...loginObject, email: e.target.value })
            }
            type="email"
            id="login"
            placeholder="email"
          />

          <input
            className="input-modal"
            onChange={(e) =>
              setLoginObject({ ...loginObject, password: e.target.value })
            }
            type="password"
            id="pass"
            placeholder="password"
          />
          <button onClick={handleLogin} className="modal-signup-button">
            Login
          </button>
          <button onClick={toggleModal} className="modal-exit-button">
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
