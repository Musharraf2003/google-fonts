import { useDispatch, useSelector } from 'react-redux'
import './Bag.scss'
import { AppDispatch, RootState } from '../../context/store'
import { FiX } from 'react-icons/fi'
import { v4 } from 'uuid';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { removeFromBag } from '../../context/features/bagSlice';
import { useEffect, useState } from 'react';
import { GrCopy } from "react-icons/gr";


const Bag = ({open, setOpen} : {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const chosenFont = useSelector((state: RootState) => state.bag.items);
  const dispatch = useDispatch<AppDispatch>();
  
  const [fontURL, setFontUrl] = useState<string>("");

  useEffect(() => {
    const generateFontUrl = (font: any) => {
      const apiUrl = ['https://fonts.googleapis.com/css?family='];
      apiUrl.push(font.family.replace(/ /g, '+'));
      if (font.fontStyles && font.fontStyles.includes('italic')) {
        apiUrl.push(':italic');
      }
      return apiUrl.join('');
    };
  
    if (chosenFont.length > 0) {
      const url = generateFontUrl(chosenFont[0]);
      setFontUrl(url);
    }
  }, [chosenFont]);

  return open && (
    <div className={`bag ${open ? 'open' : ''}`}>
      <div className='bag_header'>
      <h1>Selected Fonts</h1>
      <button onClick={() => setOpen(false)}><FiX/></button>
      </div>
      <div className='font_wrapper'>
        {chosenFont.length === 0  ?
          <h4 className='no_fonts'>It's empty in here!</h4>
          : (
            chosenFont.map((font: any) => 
          <div key={v4()} className='chosen_font'>
            <h3>{font.family}</h3>
            <p className='font-weight'>Font-weight: <strong>{font.fontWeight?.includes('italic') ? font.fontWeight.replace('italic', ' italic') : font.fontWeight }</strong></p>
            <button onClick={() => dispatch(removeFromBag(font))} className='remove-btn'>Remove <IoIosRemoveCircleOutline/></button>
          </div>
          ))
        }
      </div>
      <div className='embeded-code-wrapper'>
        <p>Link: {fontURL}</p>
        <button onClick={
          () => {
            navigator.clipboard.writeText(fontURL)
              .then(() => alert('Font URL copied to clipboard'))
              .catch(error => console.error('Failed to copy font URL:', error));
          }
        }><GrCopy /> Copy here</button>
      </div>
      <div className='font-famiy_style'>
        <p>Style:</p>
        <div className='font-style-wrapper' key={v4()}>
        { chosenFont && 
          chosenFont.filter((font, index, self) => self.findIndex((f) => f.family === font.family) === index).map(font =>
              <p key={font.family}>font-family: "{font.family}", sans-serif;</p>
            )
        }
         </div>
      </div>
    </div>
  )
}

export default Bag

