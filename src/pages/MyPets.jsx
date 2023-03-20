import axios from "axios";
import '../ComponentsMyPets/PetCard.css'
import { petContext } from "../Context/PetContext";
import { useContext, useEffect, useState } from "react";
import { authStates } from "../Context/AuthContext";

function MyPets () {

  const { authState,setAuthState,value,setValue,tokenValue} = useContext(authStates);
  const [savedList,setSavedList] = useState('');
  const [adoptedList,setAdoptedList] = useState('');



   let response
  useEffect(() => {
    const fetchData = async () => {
      try {
        response = await axios.get("http://localhost:3000/auth", {
          headers: {
            accessToken: tokenValue,
          },
        });
        if (response.data.error) {
          console.log("No success", response.data.error);
          setAuthState((prevState) => ({ ...prevState, status: false }));
        } else {
          console.log("success", response.data.id);
          setValue(response.data.id)
          setSavedList(true)
          
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
        
        resp = await axios.get(`http://localhost:3000/petuser/${value}`)
        console.log('teste',resp)
      ;
      const data = resp
      console.log('minhadata',data)
      setAdoptedList(data.pets.owned)
      setSavedList(data.pets.savd)
  
    }
    catch(error){
     console.log(error)
    }
    }
  getPetList()

  },[savedList])
  

 





 return(

  <h1>oi</h1>
)

 }
export default MyPets