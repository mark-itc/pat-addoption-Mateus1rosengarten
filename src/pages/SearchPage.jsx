import { useState } from "react";
import SearchComponent from "../ComponentsSearch/SearchBar";
import { useContext } from "react";
import { petContext } from "../Context/PetContext";
import { useNavigate } from "react-router";




function SearchPage() {
  const [searchList, setSearchList] = useState(false);
  const {petInfo, setPetInfo} = useContext(petContext);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('type search');
   
  };


  setTimeout(() => {
    setSearchList(true)
   
  },1000)
  
 


  return (
    <>
      <SearchComponent
        inputValue={(e) => setSearchParam(e.target.value)}
        handlingBasicSearch={handleSearch}
        setPetInfo={setPetInfo}
      />

   
      
       <div className="result-list"> 
        { searchList && petInfo.map((item) => {

        return    <div className="cardPet">
        <img src="" alt="" />
        <div className="containerPet">
          <h4 className="h4-card">{item.petInfo.name.toUpperCase()}</h4>
          <p>{item.petInfo.status}</p>

          <button onClick={() => {
            navigate(`/pet/${item._id}`)
          }} className="seemore-button">See More</button>

        </div>
       </div> 
       
  
           

        }) }
        </div>
        
      
    </>
  );
}

export default SearchPage;
