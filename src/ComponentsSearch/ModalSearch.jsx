import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef,useContext } from "react";
import { petContext } from "../Context/PetContext";

function ModalSearch({ toggleModal}) {
const {stateFullSearch,setStateFullSearch} = useContext(petContext)
const { queryType, setQueryType } = useContext(petContext);
const {searchList,setSearchList} = useContext(petContext);
const [petobject,setPetObject] = useState(false)


  const nameRef = useRef();
  const heigthRef = useRef();
  const weightRef = useRef();
  const typeRef = useRef();
  const statusRef = useRef();
  
  let resp;

  const advancedSearch = async () => {
    setTimeout(() => {
        
        setQueryType('Advanced')
        setSearchList(true)

    },2000)

    
    
    let parameters = {
      name: nameRef.current.value,
      heigth: heigthRef.current.value,
      weight: weightRef.current.value,
      type: typeRef.current.value,
      status: statusRef.current.value
    };
    try {
        resp = await axios.get("http://localhost:3000/fullsearch", {
        params: { ...parameters },
      });
      console.log(resp.data.pets);
      setStateFullSearch(resp.data.pets)
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="modal-auth">
      <div className="overlay">
        <div className="modal-content">
          <label className="label-search" htmlFor="name">
            Name
          </label>
          <input className="input-search" type="text" id="name" ref={nameRef} />

          <label className="label-search" htmlFor="heigth">
            Heigth
          </label>
          <input
            className="input-search"
            type="number"
            id="heigth"
            ref={heigthRef}
          />

          <label className="label-search" htmlFor="weight">
            Weight
          </label>
          <input
            className="input-search"
            type="number"
            id="weight"
            ref={weightRef}
          />

<label className="label-search" htmlFor="status">
            Status
          </label>
          <input
            className="input-search"
            type="text"
            id="status"
            ref={statusRef}
          />

          <label className="label-search" htmlFor="type">
            Type
          </label>
          <input className="input-search" type="text" id="type" ref={typeRef} />

          <button onClick={advancedSearch} className="search-modal">
            SEARCH
          </button>
          <button className="modal-exit-button" onClick={toggleModal}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSearch;
