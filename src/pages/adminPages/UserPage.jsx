import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import UserCard from "../../ComponentsAdmPages/UserCard";

function UserPage() {
  const [fullInfoPet, setFullInfoPet] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("id", id);
      axios.get(`http://localhost:3000/user/${id}`).then((res) => {
        console.log("mypey", res.data);
        const userFullInfo = res.data;
        console.log("userinfo", userFullInfo);
        setFullInfoPet(userFullInfo);
      });
    }
  }, []);
  return (
    <UserCard
      name={fullInfoPet.name}
      lastname={fullInfoPet.lastName}
      number={fullInfoPet.number}
      email={fullInfoPet.email}
      createdAt={fullInfoPet.created_at}
      role={fullInfoPet.role}
      adopted={fullInfoPet.adopted}
      fostered={fullInfoPet.fostered}
      saved={fullInfoPet.saved}
    />
  );
}

export default UserPage;
