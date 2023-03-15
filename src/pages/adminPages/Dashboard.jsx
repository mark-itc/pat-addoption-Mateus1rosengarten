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

      <div className="result-pet-list">
        {searchList &&
          petInfo.map((item) => {
            return (
              <>
                <div className="cardPet">
                  <img src="" alt="" />
                  <div className="containerPet">
                    <h4 className="h4-card">
                      {item.name.toUpperCase()}
                    </h4>
                    <p>{item.status}</p>

                    <button
                      onClick={() => {
                        navigate(`/pet/${item._id}`);
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
      </div>
    </>
  );
}

export default DashBoard;
