import { useState } from 'react'
import './SearchPage.css'
import ModalSearch from './ModalSearch'


function SearchComponent ({handlingBasicSearch,inputValue,setPetInfo}) {

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
    {/* <input onChange={inputValue} type="text" placeholder="Search by pet type" className="search-bar" />  */}
    {/* <button onClick={handlingBasicSearch} className='search'>SEARCH</button>
    <button onClick={openingModal} className='search-advance'>ADVANCED SEARCH</button> */}
    </div>

    {modal && <ModalSearch
    toggleModal={togglingModal}
    setPetInfo ={setPetInfo}>
        </ModalSearch>}

    


        
 

    </>
    )
}

export default SearchComponent