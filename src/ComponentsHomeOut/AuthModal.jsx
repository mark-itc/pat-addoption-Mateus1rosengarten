import { useContext, useEffect } from "react";
import { authStates } from "../Context/AuthContext";
import "./AuthModal.css";
import { useNavigate } from "react-router";

function AuthModal({ toggleModal }) {
  const navigate = useNavigate();
  const { value, setValue } = useContext(authStates);

  useEffect(() => {
    console.log(value);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(value);
      value.adopted = []
      value.fostered = []
      value.saved = []
      const data = await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify({ ...value }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((resp) => {
          if (resp.sucess === false) {
            let message = resp.message;
          } else {
            // localStorage.setItem("apiKey", resp.token);
            alert("Sucess,please Login ** working on implement autologin!");
            navigate(0)
          }
        });

      if (data) {
        if (data.errors) {
          console.log(data.errors);
        } else {
          console.log("data", data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal-auth">
      <div className="overlay">
        <div className="modal-content">
          <h1 className="h1-modal-content">Create your account </h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <label className="label-name" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => setValue({ ...value, name: e.target.value })}
              className="input-modal"
              type="text"
              id="name"
            />

            <label className="label-lastname" htmlFor="LastName">
              Last Name
            </label>
            <input
              onChange={(e) => setValue({ ...value, lastName: e.target.value })}
              className="input-modal"
              type="text"
              id="LastName"
            />

            <label className="label-number" htmlFor="number">
              Phone Number
            </label>
            <input
              onChange={(e) => setValue({ ...value, number: e.target.value })}
              className="input-modal"
              type="text"
              id="number"
            />

            <label className="label-email" htmlFor="e-mail">
              Email
            </label>
            <input
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              className="input-modal"
              type="email"
              id="e-mail"
            />

            <label className="label-pass" htmlFor="pass">
              Password
            </label>
            <input
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              className="input-modal"
              type="password"
              id="pass"
            />

            <label
              className="label-passConfirmation"
              htmlFor="passConfirmation"
            >
              Repeat your Password{" "}
            </label>
            <input
              className="input-modal"
              type="password"
              id="passConfirmation"
            />

            <button type="submit" className="modal-signup-button">
              SignUp
            </button>
            <button className="modal-exit-button" onClick={toggleModal}>
              X
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
