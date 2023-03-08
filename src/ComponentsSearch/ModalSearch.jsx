// import axios from "axios";
// import { useRef } from "react";

// function ModalSearch({ toggleModal, setPetInfo }) {
//   const nameRef = useRef();
//   const heigthRef = useRef();
//   const weightRef = useRef();
//   const typeRef = useRef();

//   const advancedSearch = async () => {
//     let parameters = {
//       petName: nameRef.current.value,
//       heigth: heigthRef.current.value,
//       weight: weightRef.current.value,
//       type: typeRef.current.value,
//     };
//     try {
//       const resp = await axios.get("http://localhost:3000/pet", {
//         params: { ...parameters },
//       });
//       console.log(resp);
//       const data = resp.data;

//       setPetInfo(data);
//       console.log(data);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <div className="modal-auth">
//       <div className="overlay">
//         <div className="modal-content">
//           <label className="label-search" htmlFor="name">
//             Name
//           </label>
//           <input className="input-search" type="text" id="name" ref={nameRef} />

//           <label className="label-search" htmlFor="heigth">
//             Heigth
//           </label>
//           <input
//             className="input-search"
//             type="number"
//             id="heigth"
//             ref={heigthRef}
//           />

//           <label className="label-search" htmlFor="weight">
//             Weight
//           </label>
//           <input
//             className="input-search"
//             type="number"
//             id="weight"
//             ref={weightRef}
//           />

//           <label className="label-search" htmlFor="type">
//             Type
//           </label>
//           <input className="input-search" type="text" id="type" ref={typeRef} />

//           <button onClick={advancedSearch} className="search-modal">
//             SEARCH
//           </button>
//           <button className="modal-exit-button" onClick={toggleModal}>
//             X
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ModalSearch;
