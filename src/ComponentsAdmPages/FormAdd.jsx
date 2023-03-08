import axios from "axios";
import { Axios } from "axios";
import { useState } from "react";
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
  });

  const addPet = () => {
    console.log(petInfo);
    axios
      .post("http://localhost:3000/petadd", { petInfo })
      .then(function (res) {
        console.log(res);
        navigate("/adm/addpet");
      });
  };

  return (
    <>
      <div className="box-add">
        <h2 className="h2-form">Add a Pet</h2>
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
          name="file"
          className="input-form"
          onChange={(e) => {
            setPetInfo({ ...petInfo, file: e.target.files[0] });
          }}
          type="file"
          id="imageOf"
        />

        <button className="add-btn" onClick={addPet}>
          ADD PET
        </button>
      </div>
    </>
  );
}

export default Form;
