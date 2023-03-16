import { useState } from "react";
import SaveButton from "../ComponentsProfileSettings/Savebutton";
import "../ComponentsProfileSettings/Form.css";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import { userStates } from "../Context/UserContext";
import { useEffect } from "react";

function ProfileSettings() {
  const { authState,setAuthState,value,setValue} = useContext(authStates);
  const {userList,setUserList} = useContext(userStates);

  
 
  const navigate = useNavigate();

  const { user, setUser } = useContext(userStates);
  const [update, setUpdate] = useState({
    name: "",
    lastName: "",
    number: "",
    password: "",
    repeatPass: "",
    bio: "",
    role : "user"
  });


  setTimeout(()=>{

  
    console.log('valor',value)
    setUserList(true)
    

  },500)

  const handleUpdate = async () => {
    console.log(authState.email);

    

    axios
      .post(`http://localhost:3000/update/${authState.email}`, {
        userData: update,
      })
      .then((res) =>{
        if (res.data.success === false) {
          let message = res.data.message;
          alert(message);
        } else {
          
          alert("User updated successfully");
          console.log('state',user)
          setUser(update)
          console.log('stateAfter',user)
          setUserList(false)
          alert('Please Login to see Changes =)')
          window.localStorage.clear();
    
    navigate("/");
    navigate(0);
        }

      } )
      
      };


  return (
    
    <>
    
      <h2 className="h2-text">Edit Profile</h2>
      <hr className="hr-form-init"></hr>
      {userList && 
      <div className="Form-Box">
        <label className="label-prof" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, name: e.target.value })}
          className="input-prof"
          type="text"
          id="name"
          placeholder={value.data.name}
         
        />

        <label className="label-prof" htmlFor="LastName">
          Last Name
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, lastName: e.target.value })}
          className="input-prof"
          type="text"
          id="LastName"
          placeholder={value.data.lastName}
          
        />

        <label className="label-prof" htmlFor="phone">
          Phone Number
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, number: e.target.value })}
          className="input-prof"
          type="number"
          id="phone"
          placeholder={value.data.number}
          
        />

         <label className="label-prof" htmlFor="e-mail">
          Email
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, email: e.target.value })}
          className="input-prof"
          type="email"
          id="e-mail"
          placeholder={value.data.email}
         
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
          placeholder={user[0].bio}
        >
          {" "}
        </textarea>
      </div>
}
      <hr className="hr-form-end"></hr>

      <SaveButton handleButton={handleUpdate} />
    </>
  );
}

export default ProfileSettings;
