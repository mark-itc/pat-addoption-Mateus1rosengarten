function UserCard({
  name,
  lastname,
  number,
  email,
  createdAt,
  role,
  adopted,
  fostered,
  saved,
}) {
  return (
    <div className="card">
      <img src="" alt="" />
      <div className="info-user-card">
        <h6 style={{ fontSize: "40px" }}>Name : {name} </h6>
        <h6>LastName : {lastname}</h6>
        <h6>Number : {number}</h6>
        <h6>Email : {email} </h6>
        <h6>Created : {createdAt} </h6>
        <h6>Role : {role}</h6>
        <h6>Adopted : {adopted} </h6>
        <h6>Fostered : {fostered}</h6>
        <h6>Saved: {saved}</h6>
      </div>
    </div>
  );
}

export default UserCard;
