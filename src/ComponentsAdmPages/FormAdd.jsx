import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./FormAdd.css";

function Form() {
  const navigate = useNavigate();

  const [petInfo, setPetInfo] = useState({
    type: "",
    name: "",
    heigth: "",
    weight: "",
    color: "",
    bio: "",
    dietary: "",
    breed: "",
    image: ""
    
  });
  const [petPhoto,setPetPhoto] = useState('');

  const type = petInfo.type;
  const name = petInfo.name;
  const heigth = petInfo.heigth;
  const weight = petInfo.weight;
  const color = petInfo.color;
  const bio = petInfo.bio;
  const dieatary = petInfo.dietary;
  const breed = petInfo.breed;
  const image = petInfo.image
  

  const addPet = (event) => {
    event.preventDefault();
    console.log(petInfo);
    axios
      .post("http://localhost:3000/petadd", {
        type,
        name,
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
        navigate("/adm/addpet");
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
      <div className="box-add">
        <h2 className="h2-form">Add a Pet</h2>
        <form encType="multipart/form-data"> 
        <label className="label-form" htmlFor="typeOf">
          Type
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, type: e.target.value })}
          type="text"
          id="typeOf"
        />
        <label className="label-form" htmlFor="nameOf">
          Name
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
          type="text"
          id="nameOf"
        />

        <label className="label-form" htmlFor="heigthOf">
          Heigth
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, heigth: e.target.value })}
          type="text"
          id="heigthOf"
        />
        <label className="label-form" htmlFor="weightOf">
          Weight
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, weight: e.target.value })}
          type="text"
          id="weightOf"
        />
        <label className="label-form" htmlFor="colorOf">
          Color
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, color: e.target.value })}
          type="text"
          id="colorOf"
        />
        <label className="label-form" htmlFor="bioOf">
          Bio
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, bio: e.target.value })}
          type="text"
          id="bioOf"
        />
        <label className="label-form" htmlFor="dietOf">
          Dietary
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, dietary: e.target.value })}
          type="text"
          id="dietOf"
        />
        <label className="label-form" htmlFor="breedOf">
          Breed
        </label>
        <input
          className="input-form"
          onChange={(e) => setPetInfo({ ...petInfo, breed: e.target.value })}
          type="text"
          id="breedOf"
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

        <button type="submit" className="add-btn" onClick={addPet}>
          ADD PET
        </button>
        </form>
      </div>
    </>
  );
}

export default Form;
