import { useState } from 'react'
import './SearchPage.css'
import ModalSearch from './ModalSearch'


function SearchComponent ({handlingBasicSearch,inputCatValue,inputDogValue,setPetInfo}) {

    const [modal,setModal] = useState(false)
    

    const openingModal = () => {
        setModal(true)
    };

    const togglingModal = () => {
        setModal(!modal)
    };






    return (
    <>
    <div className='navbar'> 
   
    <label className='search-cat'> 
    <input onChange={inputCatValue} type="checkbox" className="check-cat" id="cat" /> 
        Cat
    </label>

    <label className='search-dog'> 
    <input onChange={inputDogValue} type="checkbox" className="check-dog" id="dog" /> 
       Dog
    </label>

    <button onClick={handlingBasicSearch} className='search'>SEARCH</button>
    {/* <button onClick={openingModal} className='search-advance'>ADVANCED SEARCH</button> */}
    </div>

    {modal && <ModalSearch
    toggleModal={togglingModal}
    setPetInfo ={setPetInfo}>
        </ModalSearch>}

    


        
 

    </>
    )
}

export default SearchComponent