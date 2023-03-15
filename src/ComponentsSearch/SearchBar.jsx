import { useState, useContext } from "react";
import "./SearchPage.css";
import ModalSearch from "./ModalSearch";
import { petContext } from "../Context/PetContext";

function SearchComponent({ inputCatValue, inputDogValue }) {
  const [modal, setModal] = useState(false);
  const { queryType, setQueryType } = useContext(petContext);

  const openingModal = () => {
    setQueryType(false)
    setModal(true);
  };

  const togglingModal = () => {
    
    setModal(!modal);
    
  };

  return (
    <>
      <div className="search-filters">
        <label className="search-cat">
          <input
            onChange={inputCatValue}
            type="checkbox"
            className="check-cat"
            id="cat"
          />
          Cats
        </label>

        <label className="search-dog">
          <input
            onChange={inputDogValue}
            type="checkbox"
            className="check-dog"
            id="dog"
          />
          Dogs
        </label>

        <button onClick={openingModal} className="search-advance">
          ADVANCED SEARCH
        </button>
      </div>

      {modal && <ModalSearch toggleModal={togglingModal}></ModalSearch>}
    </>
  );
}

export default SearchComponent;
