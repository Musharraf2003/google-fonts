import './Footer.scss';
import fonts_logo from '../../assets/google-fonts-seeklogo.svg';
import { BsGithub } from "react-icons/bs";
import { SiMaterialdesign } from "react-icons/si";
import { FaGooglePlus } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { FaFonticons } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='footer'>
     <div className='footer-content-wrapper'>
     <div className='google-fonts-wrapper'>
      <p className='google-fonts-header'><span>Google</span> Fonts</p>
      <p className='google-fonts-description'>
        Google Fonts makes it easy to bring personality and performance to your websites and products. 
        Our robust catalog of open-source fonts and icons makes it easy to integrate expressive type and 
        icons seamlessly — no matter where you are in the world.</p>
     </div>
      <ul className='about-us-wrapper'>
        <li>
           <FaFonticons color='#137333' />
          <div className='about-description'>
            <span>About Us</span>
            <p>Making the web more beautiful, fast, and open through great typography and icons</p>
          </div>
        </li>
        <li>
        <BsGithub />
        <div className='about-description'>
            <span>Fonts Github</span>
            <p>This repository contains the binary font files served by Google Fonts</p>
          </div>
        </li>
        <li>
        <BsGithub />
        <div className='about-description'>
            <span>Icons Github</span>
            <p>This repository contains the binary font files served by Google Fonts</p>
          </div>
        </li>
      </ul>
      <ul className='about-us-wrapper'>
        <li>
        <GrDocumentText color='#F19900' />
          <div className='about-description'>
            <span>Fonts blog</span>
            <p>This blog has stories about how different fonts were designed for various languages and sripts</p>
          </div>
        </li>
        <li>
        <SiMaterialdesign color='#0957D0' />
          <div className='about-description'>
            <span>Material Design</span>
            <p>A cross-platform design system for creating high quality digital experiences</p>
          </div>
        </li>
        <li>
        <FaGooglePlus className='google-design-icon' />
          <div className='about-description'>
            <span>Google Design</span>
            <p>Google Design highlights the breadth and craft of design and fonts from speculation, to work in progress, to finished product</p>
          </div>
        </li>
      </ul>
     </div>
     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '40px 0'}}>
      <img src={fonts_logo} width={60} height={60} alt="" />
      <div>
      <span>Privacy</span> <span>Terms of service</span>
      </div>
     </div>
    </div>
  )
}

export default Footer