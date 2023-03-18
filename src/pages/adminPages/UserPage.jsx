import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import UserCard from "../../ComponentsAdmPages/UserCard";

function UserPage() {
  const [fullInfoUser, setFullInfoUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      
      axios.get(`http://localhost:3000/user/${id}`).then((res) => {
        console.log("mypey", res.data);
        const userFullInfo = res.data;
        console.log("userinfo", userFullInfo);
        setFullInfoUser(userFullInfo);
      });
    }
  }, []);
  return (
    <UserCard
      name={fullInfoUser.name}
      lastname={fullInfoUser.lastName}
      number={fullInfoUser.number}
      email={fullInfoUser.email}
      createdAt={fullInfoUser.created_at}
      role={fullInfoUser.role}
      adopted={fullInfoUser.adopted}
      fostered={fullInfoUser.fostered}
      saved={fullInfoUser.saved}
    />
  );
}

export default UserPage;
