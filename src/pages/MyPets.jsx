import axios from "axios";
import '../ComponentsSearch/SearchPage.css'
import { petContext } from "../Context/PetContext";
import { useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function MyPets () {

  const { authState,setAuthState,value,setValue,tokenValue} = useContext(authStates);
  const [IdInfo,setIdInfo] = useState('')
  const [savedList,setSavedList] = useState('');
  const [adoptedList,setAdoptedList] = useState('');
  const [fosteredList,setFosteredList] = useState('')
  const [search,setSearch] = useState('')
  const [toggle,setToggle] = useState(false)
  const navigate = useNavigate()



  const toglingSaved = () => {
    setToggle(!toggle)

  }   
  


   setTimeout(() => {
    
    console.log('vl',value)
    setSearch(true)
    
   }, 100);

  //  setTimeout(() => {
    
  //   console.log('fos',fosteredList)
  //   console.log('ado',adoptedList)
  //   console.log('sv',savedList)
  //   setSearch(true)
    
  //  }, 5000);

   
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
 
 
  useEffect(() => {
    let resp;
    const getPetList = async () => {
      try{
        
        resp = await axios.get(`http://localhost:3000/petuser/${IdInfo}`)
        console.log('teste',resp)
      ;
      const data = resp
      console.log('minhadata',data.data.adopted)
      setAdoptedList(data.data.adopted)
      setSavedList(data.data.saved)
      setFosteredList(data.data.fostered)

  
    }
    catch(error){
     console.log(error)
    }
    }
  getPetList()

  },[search])


  

 





 return(

  <>
  
  <label className="saved-pets">
          <input
            onChange={toglingSaved}   
            type="checkbox"
            className="saved-pets-check"
            id="saved"
          />
          <h2 className="h2-savedpets"> 
          Click here for see/unsee Saved Pets
          </h2>
        </label>

  <div className="adopted-list"> 
  {adoptedList.length === 0 && <h1 className="fostered-h1">You dont have any pet</h1>}
  {adoptedList.length !== 0 && !toggle && <h1 className="adopted-h1">My adopted Pets</h1>}
{adoptedList && !toggle && adoptedList.map((item) =>{
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
</div> )

})
}

</div>
<div className="fostered-list"> 
{fosteredList.length === 0 && <h1 className="fostered-h1">You dont foster any pet</h1>}
{fosteredList.length !== 0 && !toggle && <h1 className="fostered-h1">My Fostered Pets</h1>}
{fosteredList && !toggle && fosteredList.map((item) =>{
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
</div> )

})
 }
</div>

<div className="adopted-list"> 
{toggle && !savedList && <h1 className="fostered-h1">You dont have pets saved</h1>}
{toggle && <h1 className="fostered-h1">My Saved Pets</h1>}
{toggle &&  savedList.map((item) =>{
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
</div> )

})
}
</div>







  </>
)

 }
export default MyPets