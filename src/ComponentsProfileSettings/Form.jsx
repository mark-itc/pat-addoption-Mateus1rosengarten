import { useState } from "react";
import "./Form.css";

function Form() {
  const [update, setUpdate] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    repeatPass: "",
    bio: "",
  });

  return (
    <>
      <h2 className="h2-text">Edit Profile!!!</h2>
      <hr className="hr-form-init"></hr>

      <div className="Form-Box">
        <label className="label-profile" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, name: e.target.value })}
          className="input-profile"
          type="text"
          id="name"
        />

        <label className="label-profile" htmlFor="LastName">
          Last Name
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, lastName: e.target.value })}
          className="input-profile"
          type="text"
          id="LastName"
        />

        <label className="label-profile" htmlFor="phone">
          Phone Number
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, phone: e.target.value })}
          className="input-profile"
          type="number"
          id="phone"
        />

        <label className="label-profile" htmlFor="e-mail">
          Email
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, email: e.target.value })}
          className="input-profile"
          type="email"
          id="e-mail"
        />

        <label className="label-profile" htmlFor="pass">
          Password
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, password: e.target.value })}
          className="input-profile"
          type="password"
          id="pass"
        />

        <label className="label-profile" htmlFor="passConfirmation">
          Repeat your Password{" "}
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, repeatPass: e.target.value })}
          className="input-profile"
          type="password"
          id="passConfirmation"
        />

        <label className="label-profile" htmlFor="bio">
          Bio
        </label>
        <textarea
          onChange={(e) => setUpdate({ ...update, bio: e.target.value })}
          id="bio"
        >
          {" "}
        </textarea>

        <button className="save-button">Save</button>
      </div>
      <hr className="hr-form-end"></hr>
    </>
  );
}

export default Form;
