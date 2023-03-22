import { useEffect } from "react";
import { useParams,useNavigate } from "react-router";
import PetCard from "../ComponentsMyPets/PetCard";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import "../ComponentsMyPets/Card.css";
import { authStates } from "../Context/AuthContext";
import { userStates } from "../Context/UserContext";


function PetPage() {
  const [fullInfoPet, setFullInfoPet] = useState({});
  const [statusInfo, setStatusInfo] = useState("");
  const { authState, setAuthState,value,tokenValue } = useContext(authStates);
  const [idInfo,setIdInfo] = useState('');
  const [fullInfoUser,setFullInfoUser] = useState('');
  const [isAdoptOrFost,setIsAdoptOrFost] = useState(false);
  const [isSaved,setIsSaved] = useState(false)
  const navigate = useNavigate()
  const {name} = useParams();


     
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success", response.data.id);
          setIdInfo(response.data.id)
          
          
        }
      } catch (error) {
        console.log("fetchData error:", error);
        setAuthState((prevState) => ({ ...prevState, status: false }));
      }
    };
    fetchData();
   
    
  }, []);

  let myresp
  
  useEffect(() => {
    if (idInfo) {
      
      axios.get(`http://localhost:3000/user/${idInfo}`).then((res) => {
        console.log("mypey", res.data);
        myresp = res.data
       
        if (myresp.adopted.includes(name)) {
          setIsAdoptOrFost(true)
        }
      
        if(myresp.fostered.includes(name)) {
          setIsAdoptOrFost(true)
        }
        if(myresp.saved.includes(name)){
          setIsSaved(true)
        }
       setFullInfoUser(res.data);
        console.log('test',fullInfoUser)
      });
    }
  }, [idInfo]);



  useEffect(() => {
    if (name) {
      console.log("id", name);
      axios.get(`http://localhost:3000/pet/${name}`).then((res) => {
        console.log("mypey", res.data.pet.name);
        const petFullInfo = res.data.pet;
        console.log("info", petFullInfo);
        setFullInfoPet(petFullInfo);
        setStatusInfo(res.data.pet.status);
      });
    }
  }, []);

  const handleAdopt = () => {
    if (!authState.email) {
      alert("Functionalitty Avaible just to loged Users,Please Login");
    } else {
      console.log("estado", authState);
      axios
        .post(`http://localhost:3000/adopt/${authState.email}/${name}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to addopt");
          } else {
            alert("Pet Adopted !!");
            navigate('/mypets')
            navigate(0)
          }
        });
    }
  };

  const handleFoster = () => {
    if (!authState.email) {
      alert("Functionalitty Avaible just to loged Users,Please Login");
    } else {
      axios
        .post(`http://localhost:3000/foster/${authState.email}/${name}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to foster");
          } else {
            alert("Pet Fostered !!");
            navigate('/mypets')
            navigate(0)
          }
        });
    }
  };

  const handleReturn = () => {
    if (!authState.email) {
      alert("Functionalitty Avaible just to loged Users,Please Login");
    } else {
      axios
        .post(`http://localhost:3000/return/${authState.email}/${name}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to return");
          } else {
            alert("Pet Returned !!");
            navigate('/mypets')
            navigate(0)
          }
        });
    }
  };

  const handleSave = () => {
    if (!authState.email) {
      alert("Functionalitty Avaible just to loged Users,Please Login");
    } else {
      axios
        .post(`http://localhost:3000/save/${authState.email}/${name}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to save");
          } else {
            alert("Pet saved !!");
            navigate('/mypets')
            navigate(0)
          }
        });
    }
  };

  const handleUnSave = () => {
    if (!authState.email) {
      alert("Functionalitty Avaible just to loged Users,Please Login");
    } else {
      axios
        .post(`http://localhost:3000/unsave/${authState.email}/${name}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to Unsave");
          } else {
            alert("Pet Unsaved !!");
            navigate('/mypets')
            navigate(0)
          }
        });
    }
  };

  
  
  // setTimeout(() => {
 
  //  console.log('10',name)
  //  console.log('myresp',myresp)
  //  console.log('myresp2',fullInfoUser.fostered)      
  // }, 200);

  // setTimeout(() => {
  //   console.log('myresp2',fullInfoUser.fostered)    
  //   itsMine = fullInfoUser.fostered.includes({name}) || fullInfoUser.adopted.includes({name}) ? true : false;
  //   console.log('fim',itsMine)
  //   },500)


  return (
    <>
      <PetCard
      imag={fullInfoPet.image}
        name={fullInfoPet.name}
        status={statusInfo}
        type={fullInfoPet.type}
        hei={fullInfoPet.heigth}
        wei={fullInfoPet.weight}
        color={fullInfoPet.color}
        bio={fullInfoPet.bio}
        breed={fullInfoPet.breed}
        dietary={fullInfoPet.dieatary}
      />
        { fullInfoUser && 
      <button disabled={fullInfoPet.status === 'Adopted'|| fullInfoPet.status === 'Fostered'} onClick={handleAdopt} className="addopt-button">
        Addopt
      </button> }
      {fullInfoUser && <button disabled={fullInfoPet.status === 'Fostered' || fullInfoPet.status === 'Adopted'}  onClick={handleFoster} className="foster-button">
        Foster
      </button> }
      {fullInfoUser &&   <button disabled={fullInfoPet.status === 'Avaible' || !isAdoptOrFost } onClick={handleReturn} className="return-button">
        Return
      </button> }
      {fullInfoUser && <button disabled={isSaved} onClick={handleSave} className="save-buton">
        Save
      </button> }
     {fullInfoUser &&  <button disabled={!isSaved} onClick={handleUnSave} className="unSave-buton">
        UnSave
      </button> }
    </>
  );
}

export default PetPage;
