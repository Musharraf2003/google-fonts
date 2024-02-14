import { useEffect, useState } from "react"
import { Font } from "../../types"
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import './SingleP.scss';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToBag } from "../../context/features/bagSlice";
import Bag from "../../components/bag/Bag";
import { AppDispatch } from "../../context/store";
import { SlBag } from "react-icons/sl";
import Footer from "../../components/footer/Footer";


const SinglePage = () => {
  const [font, setFont] = useState<Font[]>([]);
  const API_KEY = 'AIzaSyCcIk4-M6B2GIw5CqrKlFugFBE9tp7M4t4';
  const { family } = useParams();
  const [isActive, setIsActive] = useState(false);
  const files = font.length > 0 ? font[0].files : {};
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);


  useEffect(() => {
    const renderFontData = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?family=${family}&key=${API_KEY}`)
        const data = await response.json();
        setFont(data.items)
      }
      catch(error) {
        console.log(error)
      }
    }

    renderFontData()
  }, [])

  const renderFontFace = () => {
    return font.map((item: Font) => (
      <style key={v4()}>
        {`@font-face {
          font-family: '${item.family}';
          src: url('${item.files.regular}');
        }`}
      </style>
    ));
  };


  const handleClickAndAdd = (fontWeight: string, fontStyle: string, family: string) => {
    setIsActive(!isActive);
    dispatch(addToBag({fontWeight, fontStyle, family}));
    setOpen(true)
  };

  const renderFontFiles = () => {
    return (<>
        {Object.entries(files).map(([key, value]) => {
           let fontWeight;
           if(!isNaN(parseInt(key, 10))) {
            fontWeight = parseInt(key, 10);
           }
           else {
            fontWeight = 400;
           }
           return (
             <div className="font-details" key={v4()}>
               <hr />
               <span>{key.includes('italic') ? key.replace('italic', ' italic') : key}</span>
               <button onClick={() => handleClickAndAdd(key, value, family as string)} className="select-style-btn">select {key.includes('italic') ? key.replace('italic', ' italic') : key} <IoMdAddCircleOutline/></button>
               <p style={{ fontFamily: family, fontWeight, fontStyle: key.includes('italic') ? 'italic' : 'normal' }}>Whereas disregard and contempt for human rights have resulted</p>
               <hr />
             </div>
           )
  })}
    </>);
  };


  return (
    <>
    <div className="single-page">
      <div>
      <div className="single-font-page">
        {renderFontFace()}
        <div className="single-font-header">
        <h1>{family}</h1>
        <button onClick={() => setOpen(!open)} className="bag-btn"><SlBag/></button>
        </div>
        <p className="font-preview" style={{fontFamily: family}}>Whereas disregard and contempt for human rights have resulted</p>
        <div className="font-details_wrapper">
          {renderFontFiles()}
        </div>
      </div>
      <Footer/>
      </div>
      <Bag setOpen={setOpen} open={open} />
    </div>
     </>
  )
}

export default SinglePage