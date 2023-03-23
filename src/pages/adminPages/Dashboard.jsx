import UserList from "./UserList";
import "./Adm.css";
import { petContext } from "../../Context/PetContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";

function DashBoard() {
  const [searchList, setSearchList] = useState(false);
  const { petInfo, setPetInfo } = useContext(petContext);
  const navigate = useNavigate();

  setTimeout(() => {
    setSearchList(true);
  }, 1000);

  return (
    <>
      <div className="users-list ">
        <UserList> </UserList>
      </div>

      <hr className="hr-list" />

      <button
        onClick={() => {
          navigate("/adm/addpet");
        }}
        className="addpet-button"
      >
        ADD NEW PET
      </button>
       <h1 className="h1-pet-list">All Pets:</h1>
      <div className="result-pet-list">
        {searchList &&
          petInfo.map((item) => {
            return (
              <div
                onClick={() => {
                  navigate(`/pet/${item.name}`);
                }}
              >
               {item.name.toUpperCase()}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default DashBoard;
