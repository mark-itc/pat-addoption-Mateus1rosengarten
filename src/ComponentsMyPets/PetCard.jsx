import "./PetCard.css";

function PetCard({ name, status, type, hei, wei, color, bio, breed, dietary }) {
  return (
    <div className="card">
      <img src="" alt="" />
      <div className="info-card">
        <h6>Name : {name} </h6>
        <h6>Status : {status}</h6>
        <h6>Type : {type}</h6>
        <h6>Heigth : {hei} cm</h6>
        <h6>Weigth : {wei} kg</h6>
        <h6>Color : {color}</h6>
        <h6>Bio : {bio} </h6>
        <h6>Breed : {breed}</h6>
        <h6>Dietary Restrictions: {dietary}</h6>
      </div>
    </div>
  );
}

export default PetCard;
