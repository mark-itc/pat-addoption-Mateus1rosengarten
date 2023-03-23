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
  const [modalEdit,setModalEdit] = useState(false)
  const navigate = useNavigate()
  const {name} = useParams();

  const [petInfo, setPetInfo] = useState({
    type: fullInfoPet.type,
    // name: fullInfoPet.name,
    heigth: fullInfoPet.hei,
    weight: fullInfoPet.wei,
    color: fullInfoPet.color,
    bio: fullInfoPet.bio,
    dietary: fullInfoPet.dieatary,
    breed: fullInfoPet.breed,
    image: fullInfoPet.image
    
  });
  const [petPhoto,setPetPhoto] = useState('');

  const type = petInfo.type;
  // const nam = petInfo.name;
  const heigth = petInfo.heigth;
  const weight = petInfo.weight;
  const color = petInfo.color;
  const bio = petInfo.bio;
  const dieatary = petInfo.dietary;
  const breed = petInfo.breed;
  const image = petInfo.image



// FUNCTIONS TO GET USER AND PET INFOS

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



// BUTTONS FUNCTIONS  

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

 // EDIT PET FUNCTIONS 

  const updatePet = (event) => {
    event.preventDefault();
    console.log(petInfo);
    axios
      .post(`http://localhost:3000/petedit/${name}`, {
        type,
        // nam,
        heigth,
        weight,
        color,
        bio,
        dieatary,
        breed,
        image
        
        
      })
      .then((res) => {
        console.log(res);
        alert('Pet Edited !! =)')
        navigate("/adm");
        setModalEdit(false)
      });
  };

  const addPic = async () => {
    const formData = new FormData();
    formData.append("image", petPhoto);

    const response = await fetch("http://localhost:3000/petadd/pic", {
      method: "POST",
      body: formData,
    });
    
    const data = await response.json();
    setPetInfo((prevState) => ({
      ...prevState,
      image: data.url,
    }));

  };


  useEffect(() => {
    addPic();

  },[petPhoto])

  const handlePictureUpload = async (e) => {
    setPetPhoto(e.target.files[0])
  }

  
  


  return (
    <>
    
      {!modalEdit && <PetCard
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
      /> }
        { !modalEdit && fullInfoUser && 
      <button disabled={fullInfoPet.status === 'Adopted'|| fullInfoPet.status === 'Fostered'} onClick={handleAdopt} className="addopt-button">
        Addopt
      </button> }
      { !modalEdit && fullInfoUser && <button disabled={fullInfoPet.status === 'Fostered' || fullInfoPet.status === 'Adopted'}  onClick={handleFoster} className="foster-button">
        Foster
      </button> }
      { !modalEdit && fullInfoUser &&   <button disabled={fullInfoPet.status === 'Avaible' || !isAdoptOrFost } onClick={handleReturn} className="return-button">
        Return
      </button> }
      {!modalEdit && fullInfoUser && <button disabled={isSaved} onClick={handleSave} className="save-buton">
        Save
      </button> }
     {!modalEdit && fullInfoUser &&  <button disabled={!isSaved} onClick={handleUnSave} className="unSave-buton">
        UnSave
      </button> }

     {!modalEdit && fullInfoUser.email === 'mateus.rosengartenn@gmail.com' && <button className="modal-button-updatepet" onClick={() => {setModalEdit(true)}}>Update Pet</button>}

    
     {modalEdit && <div className="box-add">
        <h2 className="h2-form">Edit {name}</h2>
        <form encType="multipart/form-data"> 
        <label className="label-form" htmlFor="typeOf">
          Type
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, type: e.target.value })}
          type="text"
          id="typeOf"
          placeholder={fullInfoPet.type}
        />
        {/* <label className="label-form" htmlFor="nameOf">
          Name
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
          type="text"
          id="nameOf"
          placeholder={fullInfoPet.name}
        /> */}

        <label className="label-form" htmlFor="heigthOf">
          Heigth
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, heigth: e.target.value })}
          type="text"
          id="heigthOf"
          placeholder={fullInfoPet.heigth}
        />
        <label className="label-form" htmlFor="weightOf">
          Weight
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, weight: e.target.value })}
          type="text"
          id="weightOf"
          placeholder={fullInfoPet.weight}
        />
        <label className="label-form" htmlFor="colorOf">
          Color
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, color: e.target.value })}
          type="text"
          id="colorOf"
          placeholder={fullInfoPet.color}
        />
        <label className="label-form" htmlFor="bioOf">
          Bio
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, bio: e.target.value })}
          type="text"
          id="bioOf"
          placeholder={fullInfoPet.bio}
        />
        <label className="label-form" htmlFor="dietOf">
          Dietary
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, dietary: e.target.value })}
          type="text"
          id="dietOf"
          placeholder={fullInfoPet.dieatary}
        />
        <label className="label-form" htmlFor="breedOf">
          Breed
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
          type="text"
          id="breedOf"
          placeholder={fullInfoPet.breed}
        />
        <label className="label-form" htmlFor="imageOf">
          Image
        </label>
        <input
         type="file"
          name="image"
          className="input-form"
          onChange={handlePictureUpload}
      
          id="imageOf"
        />

        <button type="submit" className="add-btn" onClick={updatePet}>
          EDIT PET
        </button>
        <button className="button-backpage" onClick={()=>{setModalEdit(false)}}>BACK TO PET</button>
        </form>
      </div> }
      

    </>
  );
}


export default PetPage;
