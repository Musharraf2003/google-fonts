import React from 'react'
import { GrPowerReset } from "react-icons/gr";
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LiaPenFancySolid } from "react-icons/lia";
import { RxSlider } from "react-icons/rx";
import { FiX } from "react-icons/fi";
import { useState, useEffect } from 'react';
import './Sidebar.scss'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../context/store';
import { toggleSidebar } from '../../context/features/toggleSlice';
import { setTextValue } from '../../context/features/textSlice';
import { setFontSize } from '../../context/features/fontSizeSlice';
import { setNumberOfStyles } from '../../context/features/fontStylesSlice';


const Sidebar = () => {
    const fontSize = useSelector((state: RootState) => state.fontSize.value)
    const fontStyles = useSelector((state: RootState) => state.fontStyles.numberOfStyles)
    const isOpen = useSelector((state: RootState) => state.sidebar.isOpen)
    const dispatch = useDispatch<AppDispatch>();
    const [value, setValue] = useState(fontSize);

    useEffect(() => {
        setValue(fontSize); 
    }, [fontSize]);

    const handleSliderChange = (e: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        dispatch(setFontSize(newValue as number)); 
        console.log(e)
      };
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
        dispatch(setFontSize(Number(event.target.value))); 
      };
    
      const handleBlur = () => {
        if (value < 0) {
          setValue(0);
        } else if (value > 100) {
          setValue(100);
        }
        dispatch(setFontSize(value));
      };

    const handleNumberofStyles = (e: Event, newValue: number | number[]) => {
        dispatch(setNumberOfStyles(newValue as number));
        console.log(e)
    }

    return isOpen && (
         <div className={`sidebar-menu ${isOpen ? 'isOpen' : ''}`}>
            <div className='sidebar_reset'>
                <button onClick={() => {
                    dispatch(setTextValue(''));
                    dispatch(setFontSize(50));
                    dispatch(setNumberOfStyles(50));
                }} className='reset-btn'><GrPowerReset /> Reset All</button>
                <button onClick={() => dispatch(toggleSidebar())} className='close-btn'><FiX/></button>
            </div>
            <p>Preview</p>
            <textarea onChange={(e) => dispatch(setTextValue(e.target.value))} placeholder='Type something' cols={10} rows={10}></textarea>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        style={{ margin: "30px 0" }}
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === "number" ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                    />
                </Grid>
            </Grid>
            <hr />
            <p>Filter</p>
            <Accordion className='decoration_wrapper'>
                <AccordionSummary className='decoration_title'
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    disabled
                >
                    <LiaPenFancySolid /> Decorative stroke
                </AccordionSummary>
                <AccordionDetails className='btn_wrapper'>
                    <button>Serif</button>
                    <button>Slab Serif</button>
                    <button>Sans Serif</button>
                </AccordionDetails>
            </Accordion>
            <Accordion className='properties_wrapper'>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    className='properties_title'
                >
                    <RxSlider />  Properties
                </AccordionSummary>
                <AccordionDetails>
                    <div className='properties-input_wrapper'>
                        <span>Number of styles</span>
                        <Slider 
                        defaultValue={50} 
                        aria-label="Default" 
                        value={fontStyles}
                        onChange={handleNumberofStyles}
                        valueLabelDisplay="auto" />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Sidebar