import './Nav.scss';
import fonts_logo from '../../assets/google-fonts-seeklogo.svg';
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from 'react'
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../../context/features/optionSlice';
import { AppDispatch, RootState } from '../../context/store';
import { FiX } from 'react-icons/fi';


const Nav = ({ setSearchQuery} : {setSearchQuery: React.Dispatch<React.SetStateAction<string>>}) => {
  const [searchQueryLocal, setSearchQueryLocal] = useState<string>("");
  const SelectCategories = ['trending', 'popularity', 'style', 'date', 'alpha'];
  const dispatch = useDispatch<AppDispatch>();
  const handleSearchFamily = (e: any) => {
    e.preventDefault();
    setSearchQuery(searchQueryLocal);
  }

  const handleDeleteSearch = () => {
    setSearchQueryLocal("");
  }
  
  return (
    <div className='nav_wrapper'>
      <div className='navigation'>
        <div className='nav_logo_wrapper'>
          <img src={fonts_logo} alt="" width={60} height={60} />
          <p className='nav_logo_title'>Google Fonts</p>
        </div>
        <form onSubmit={handleSearchFamily} className='search_form'>
          <label className='search-icon'><AiOutlineSearch /></label>
          <input type="text" placeholder='Search fonts' value={searchQueryLocal} onChange={(e) => setSearchQueryLocal(e.target.value)} />
          <label className='delete-search' onClick={handleDeleteSearch}><FiX/></label>
          <select onChange={(e) =>dispatch(setSelectedOption(e.target.value))}>
            <option value="All">Sort by: trending</option>
          {
            SelectCategories.map((item) => 
              <option value={item} key={v4()}>
                {item}
              </option>
              )
          }
          </select>
        </form>
      </div>
    </div>

  )
}

export default Nav

