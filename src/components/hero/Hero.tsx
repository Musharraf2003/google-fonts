import { useEffect, useState } from "react";
import { v4 } from "uuid";
import './Hero.scss';
import { Font } from "../../types";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../context/store';
import instance from "../helpers/api";
import { toggleSidebar } from "../../context/features/toggleSlice";
import { useDispatch } from "react-redux";
import { FaSliders } from "react-icons/fa6";


const Hero = ({searchQuery} : {searchQuery: string}) => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const searchedFont = searchQuery;
  const API_KEY = 'AIzaSyCcIk4-M6B2GIw5CqrKlFugFBE9tp7M4t4';
  const selectedOption = useSelector((state: RootState) => state.option.selectedOption);
  const dispatch = useDispatch<AppDispatch>()
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [searchFonts, setSearchFonts] = useState<Font[]>([]);
  const textValue = useSelector((state: RootState) => state.text.value);
  const setFontSize = useSelector((state: RootState) => state.fontSize.value);
  const numberOfStyles = useSelector((state: RootState) => state.fontStyles.numberOfStyles);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await instance(`/v1/webfonts?${selectedOption && `&sort=${selectedOption}`}&key=${API_KEY}`);
        const data = await response.data;
        setFonts(data.items);  
      }
      catch(error: any) {
        alert(error.response.data.error.message)
      }
    }

    fetchFonts()
  }, [selectedOption, searchedFont])

  useEffect(() => {
    const filtering = () => {
      searchedFont.trim().length > 0
        ? setSearchFonts(
            fonts.filter((font) =>
              font.family.toLowerCase().includes(searchedFont.toLowerCase())
            )
          )
        : "";
    };
    filtering();
  }, [searchedFont]);


  const renderFontFaces = () => {
    return fonts.map((item: Font) => (
      <style key={v4()}>
        {`@font-face {
          font-family: '${item.family}';
          src: url('${item.files.regular}');
        }`}
      </style>
    ));
  };
  

  return (
    <div className="hero">
      <button onClick={() => dispatch(toggleSidebar())} className={`filter ${isSidebarOpen ? 'isOpen' : ''}`}>{isSidebarOpen ? <FaSliders /> : <FiX/>} Filters</button>
      <small>{searchedFont.length !== 0 ? searchFonts.length : fonts.length} of 1603 families</small>
      {renderFontFaces()}
      {searchedFont.trim().length === 0 ? (
      fonts.map((font: Font) => (
        <Link to={`/single-page/${font.family}`} className="hero-font_card" key={v4()}>
          <div className="font-family-name">
            <p>{font.family}</p>
            <p>{font.variants.length} styles</p>
          </div>
          <p className="font-text" style={{ fontFamily: font.family, fontSize: setFontSize }}>
            {textValue
              ? textValue
              : `Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
                Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.
                Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.`}
          </p>
          <hr />
        </Link>
      ))
    ) : (
      searchFonts.map((font: Font) => (
        <Link to={`/single-page/${font.family}`} className="hero-font_card" key={v4()}>
          <div className="font-family-name">
            <p>{font.family}</p>
            <p>{font.variants.length} styles</p>
          </div>
          <p className="font-text" style={{ fontFamily: font.family, fontSize: setFontSize }}>
            {textValue
              ? textValue
              : `Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
                Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.
                Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.`}
          </p>
          <hr />
        </Link>
      ))
    )}
      {/* {
        searchFonts.length !== 0 ? 
          searchFonts.map((font: Font) => 
          <Link to={`/single-page/${font.family}`} className="hero-font_card" key={v4()}>
            <div className="font-family-name">
            <p>{font.family}</p>
            <p>{font.variants.length} styles</p>
            </div>
            <p className="font-text" style={{ fontFamily: font.family, fontSize: setFontSize }}>{textValue ? textValue : `Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
              Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.
              Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.`}</p>
            <hr /> 
          </Link>
          ) :
          fonts.map((font: Font) => 
          <Link to={`/single-page/${font.family}`} className="hero-font_card" key={v4()}>
            <div className="font-family-name">
            <p>{font.family}</p>
            <p>{font.variants.length} styles</p>
            </div>
            <p className="font-text" style={{ fontFamily: font.family, fontSize: setFontSize }}>{textValue ? textValue : `Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.
              Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.
              Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.`}</p>
            <hr /> 
          </Link>
          )
      } */}
    </div>
  )
}

export default Hero