import axios from "axios";
import '../ComponentsMyPets/PetCard.css'
import { petContext } from "../Context/PetContext";
import { useContext } from "react";

function MyPets () {

  const {myPetsResult } = useContext(petContext)





 


setTimeout(() => {
  console.log(myPetsResult)

},5000)

 return(
  // <> 
  //   <div className="cardMyPet">
  //       <img src="" alt="" />
  //       <div className="containerMyPet">
  //         <h4>{myPetsResult.name.toUpperCase()}</h4>
  //         <p>{myPetsResult.type}</p>
  
  //       </div>
  //      </div> 



  // </>
  <h1>oi</h1>
)
}

export default MyPets