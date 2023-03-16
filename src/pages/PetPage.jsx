import { useEffect } from "react";
import { useParams,useNavigate } from "react-router";
import PetCard from "../ComponentsMyPets/PetCard";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import "../ComponentsMyPets/Card.css";
import { authStates } from "../Context/AuthContext";


function PetPage() {
  const [fullInfoPet, setFullInfoPet] = useState({});
  const [statusInfo, setStatusInfo] = useState("");
  const { authState, setAuthState } = useContext(authStates);
  const navigate = useNavigate()
  const { id } = useParams();
  


  useEffect(() => {
    if (id) {
      console.log("id", id);
      axios.get(`http://localhost:3000/pet/${id}`).then((res) => {
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
        .post(`http://localhost:3000/adopt/${authState.email}/${id}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to addopt");
          } else {
            alert("Pet Adopted !!");
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
        .post(`http://localhost:3000/foster/${authState.email}/${id}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to foster");
          } else {
            alert("Pet Fostered !!");
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
        .post(`http://localhost:3000/return/${authState.email}/${id}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to return");
          } else {
            alert("Pet Returned !!");
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
        .post(`http://localhost:3000/save/${authState.email}/${id}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to save");
          } else {
            alert("Pet saved !!");
            navigate()
          }
        });
    }
  };

  const handleUnSave = () => {
    if (!authState.email) {
      alert("Functionalitty Avaible just to loged Users,Please Login");
    } else {
      axios
        .post(`http://localhost:3000/unsave/${authState.email}/${id}`)
        .then((res) => {
          if (res.sucess === false) {
            alert("Error trying to Unsave");
          } else {
            alert("Pet Unsaved !!");
            navigate()
          }
        });
    }
  };

  return (
    <>
      <PetCard
        name={fullInfoPet.name}
        status={statusInfo}
        type={fullInfoPet.type}
        hei={fullInfoPet.heigth}
        wei={fullInfoPet.weight}
        color={fullInfoPet.color}
        bio={fullInfoPet.bio}
        breed={fullInfoPet.breed}
        dietary={fullInfoPet.diet}
      />

      <button onClick={handleAdopt} className="addopt-button">
        Addopt
      </button>
      <button onClick={handleFoster} className="foster-button">
        Foster
      </button>
      <button onClick={handleReturn} className="return-button">
        Return
      </button>
      <button onClick={handleSave} className="save-buton">
        Save
      </button>
      <button onClick={handleUnSave} className="unSave-buton">
        UnSave
      </button>
    </>
  );
}

export default PetPage;
