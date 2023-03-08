import { useState } from "react";
import SaveButton from "../ComponentsProfileSettings/Savebutton";
import "../ComponentsProfileSettings/Form.css";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function ProfileSettings() {
  const { authState } = useContext(authStates);
  const navigate = useNavigate();

  const [update, setUpdate] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    repeatPass: "",
    bio: "",
  });

  const handleUpdate = async () => {
    console.log(authState.email);

    axios
      .post(`http://localhost:3000/update/${authState.email}`, {
        userData: update,
      })
      .then((response) => console.log(response))
      .then((data) => {
        if (data.success === false) {
          let message = data.message;
          alert(message);
        } else {
          alert("User updated successfully");
          navigate(0);
        }
      });
  };

  return (
    <>
      <h2 className="h2-text">Edit Profile</h2>
      <hr className="hr-form-init"></hr>

      <div className="Form-Box">
        <label className="label-prof" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, name: e.target.value })}
          className="input-prof"
          type="text"
          id="name"
        />

        <label className="label-prof" htmlFor="LastName">
          Last Name
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, lastName: e.target.value })}
          className="input-prof"
          type="text"
          id="LastName"
        />

        <label className="label-prof" htmlFor="phone">
          Phone Number
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, phone: e.target.value })}
          className="input-prof"
          type="number"
          id="phone"
        />

        <label className="label-prof" htmlFor="e-mail">
          Email
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, email: e.target.value })}
          className="input-prof"
          type="email"
          id="e-mail"
        />

        <label className="label-prof" htmlFor="pass">
          Password
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, password: e.target.value })}
          className="input-prof"
          type="password"
          id="pass"
        />

        <label className="label-prof" htmlFor="passConfirmation">
          Repeat your Password{" "}
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, repeatPass: e.target.value })}
          className="input-prof"
          type="password"
          id="passConfirmation"
        />

        <label className="label-prof" htmlFor="bio">
          Bio
        </label>
        <textarea
          onChange={(e) => setUpdate({ ...update, bio: e.target.value })}
          className="input-prof"
          id="bio"
        >
          {" "}
        </textarea>
      </div>
      <hr className="hr-form-end"></hr>

      <SaveButton handleButton={handleUpdate} />
    </>
  );
}

export default ProfileSettings;
