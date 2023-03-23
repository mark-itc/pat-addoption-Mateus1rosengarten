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
  const { authState,setAuthState,value,setValue,tokenValue,setTokenValue} = useContext(authStates);
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

  setTimeout(()=>{

  
    console.log('valorAqui',value)
    setUserList(true)
    

  },500)

  const handleUpdate = () => {
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
          alert('Please Login to see Changes =) ** working on solve it **')
          window.localStorage.clear();
          setValue(update)
    
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
          Short Bio
        </label>
        <input
          onChange={(e) => setUpdate({ ...update, bio: e.target.value })}
          className="input-prof"
          id="bio"
          placeholder={value.data.bio}
        >
          
        </input>
      </div>
}
      <hr className="hr-form-end"></hr>

      <SaveButton handleButton={handleUpdate} />
    </>
  );
}

export default ProfileSettings;
