import { useState } from "react";
import SearchComponent from "../ComponentsSearch/SearchBar";
import { useContext } from "react";
import { petContext } from "../Context/PetContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function SearchPage() {
  const [searchList, setSearchList] = useState(false);
  const { petInfo, setPetInfo } = useContext(petContext);
  const { queryType, setQueryType } = useContext(petContext);
  const { stateDogType, setStateDogType } = useContext(petContext);
  const { stateCatType, setStateCatType } = useContext(petContext);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (queryType == "Dog") {
      console.log("Dog", queryType);
      console.log('dogArray',stateDogType)
      setStateCatType("");
      setSearchList(true);
    }
    if (queryType == "Cat") {
      console.log("Cat", queryType);
      console.log('catArray',stateCatType)
      setStateDogType("");
      setSearchList(true);
    }

  };



  return (
    <>
      <SearchComponent
        inputCatValue={(e) => setQueryType('Cat')}
        inputDogValue = {(e) => setQueryType('Dog')}
        handlingBasicSearch={handleSearch}
        setPetInfo={setPetInfo}
      />

    

      <div className="result-list">
      {queryType === 'Cat' && <h1 className="all-pet-text">All Cats</h1>}
      {queryType === 'Dog' && <h1 className="all-pet-text">All Dogs</h1>}
        { queryType === 'Dog' && 
          stateDogType.map((item) => {
            return (
              <> 
              
              <div className="cardPet">
                <img src="" alt="" />
                <div className="containerPet">
                  <h4 className="h4-card">{item.petInfo.name.toUpperCase()}</h4>
                  <p>{item.petInfo.status}</p>

                  <button
                    onClick={() => {
                      navigate(`/pet/${item._id}`);
                    }}
                    className="seemore-button"
                  >
                    See More
                  </button>
                </div>
              </div>
              </>
            );
          })
        
        }

        { queryType === 'Cat' && (
          stateCatType.map((item) => {
            return (
              <div className="cardPet">
                <img src="" alt="" />
                <div className="containerPet">
                  <h4 className="h4-card">{item.petInfo.name.toUpperCase()}</h4>
                  <p>{item.petInfo.status}</p>

                  <button
                    onClick={() => {
                      navigate(`/pet/${item._id}`);
                    }}
                    className="seemore-button"
                  >
                    See More
                  </button>
                </div>
              </div>
            );
          })
        ) 
        }
      </div>
    </>
  );
}

export default SearchPage;
