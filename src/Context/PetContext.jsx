import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";
import { authStates } from "./AuthContext";

export const petContext = createContext();

function PetContext({ children }) {
  const [petInfo, setPetInfo] = useState();
  const [myPets, setMyPets] = useState([]);
  const [myPetsResult, setMyPetsResult] = useState([]);
  const [queryType,setQueryType] = useState(false);
  const [stateDogType,setStateDogType] = useState('');
  const [stateCatType,setStateCatType] = useState('');

  const queryTypeDog = 'Dog';
  const queryTypeCat = 'Cat';

  useEffect(() => {
    axios.get("http://localhost:3000/pet").then((res) => {
      console.log("resposta0", res.data);
      
      setPetInfo(res.data);
      
    });
  }, []);

  useEffect(() => {

    axios.get(`http://localhost:3000/search/${queryTypeDog}`).then((res) =>{
      console.log('resposta1',res.data)
      setStateDogType(res.data)
      
    })
  },[])

  useEffect(() => {

    axios.get(`http://localhost:3000/search/${queryTypeCat}`).then((res) =>{
      console.log('resposta2',res.data)
      setStateCatType(res.data)
      
    })
  },[])




  
  





  return (
    <petContext.Provider
      value={{ petInfo, setPetInfo, myPetsResult, setMyPetsResult,queryType,setQueryType,stateDogType,setStateDogType,stateCatType,setStateCatType}}
    >
      {children}
    </petContext.Provider>
  );
}

export default PetContext;
