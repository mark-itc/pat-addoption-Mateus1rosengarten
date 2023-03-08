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
  const { authState, setAuthstate } = useContext(authStates);

  useEffect(() => {
    axios.get("http://localhost:3000/pet").then((res) => {
      console.log("resposta", res.data);
      //   console.log("query", searchParam);
      setPetInfo(res.data);
      //   setSearchList(true);
      //   console.log(searchList);
    });
  }, []);

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/getpets/${authState.email}`)
  //   .then((res) => { console.log(res.data.adopted)
  //    setMyPets(res.data.adopted)})

  // },[])

  // useEffect(() => {
  //   console.log(myPets)
  //   myPets.map((item) => {
  //     axios.get(`http://localhost:3000/pet/${item}`)
  //     .then((res) =>  setMyPetsResult(res.data.pet.petInfo))

  //   })

  // },[myPets])

  setTimeout(() => {
    console.log("dados", myPetsResult);
  }, 1000);

  return (
    <petContext.Provider
      value={{ petInfo, setPetInfo, myPetsResult, setMyPetsResult }}
    >
      {children}
    </petContext.Provider>
  );
}

export default PetContext;
