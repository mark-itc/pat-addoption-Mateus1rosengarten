import SearchComponent from "../ComponentsSearch/SearchBar";
import { useContext } from "react";
import { petContext } from "../Context/PetContext";
import { useNavigate } from "react-router";

function SearchPage() {
  const { searchList, setSearchList } = useContext(petContext);
  const { setPetInfo } = useContext(petContext);
  const { queryType, setQueryType } = useContext(petContext);
  const { stateDogType, setStateDogType } = useContext(petContext);
  const { stateCatType, setStateCatType } = useContext(petContext);
  const { stateFullSearch } = useContext(petContext);
  const navigate = useNavigate();

  // const handleSearch = () => {
  //   if (queryType == "Dog") {
  //     setStateCatType("");
  //     setSearchList(false);
  //   }
  //   if (queryType == "Cat") {
  //     setStateDogType("");
  //     setSearchList(false);
  //   }

  //   if (queryType == "Advanced") {
  //     setStateCatType("");
  //     setStateDogType("");
  //   }
  // };

  

  return (
    <>
      <SearchComponent
        inputCatValue={() => setQueryType("Cat")
        }
        inputDogValue={() => setQueryType("Dog")}
        // handlingBasicSearch={handleSearch}
        setPetInfo={setPetInfo}
      />

      <div className="result-list">
        {queryType === "Cat" && <h1 className="all-pet-text">All Cats</h1>}
        {queryType === "Dog" && <h1 className="all-pet-text">All Dogs</h1>}
        
        {queryType === "Dog" &&
          stateDogType.map((item) => {
            return (
              <>
                <div className="cardPet">
                  <img src="" alt="" />
                  <div className="containerPet">
                  <img className="img-search" src={item.image} alt=""></img>
                    <hr className="hr-card"></hr>
                    <h4 className="h4-card">{item.name.toUpperCase()}</h4>
                    <p className="p-card">{item.status}</p>
                    <button
                      onClick={() => {
                        navigate(`/pet/${item.name}`);
                      }}
                      className="seemore-button"
                    >
                      See More
                    </button>
                  </div>
                </div>
              </>
            );
          })}

        {queryType === "Cat" &&
          stateCatType.map((item) => {
            return (
              <div className="cardPet">
            
                <div className="containerPet">
                <img className="img-search" src={item.image} alt=""></img>
                <hr className="hr-card"></hr>
                  <h4 className="h4-card">{item.name.toUpperCase()}</h4>
                  <p className="p-card">{item.status}</p>

                  <button
                    onClick={() => {
                      navigate(`/pet/${item.name}`);
                    }}
                    className="seemore-button"
                  >
                    See More
                  </button>
                </div>
              </div>
            );
          })}

        {searchList &&
          queryType === "Advanced" &&
          stateFullSearch.map((item) => {
            return (
              <div className="cardPet">
                
                <div className="containerPet">
                <img className="img-search" src={item.image} alt=""></img>
                <hr className="hr-card"></hr>
                  <h4 className="h4-card">{item.name.toUpperCase()}</h4>
                  <p className="p-card">{item.status}</p>
                  <button
                    onClick={() => {
                      navigate(`/pet/${item.name}`);
                    }}
                    className="seemore-button"
                  >
                    See More
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default SearchPage;
