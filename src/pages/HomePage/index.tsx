import React, {useEffect, useState, useRef} from "react";
import {Box, Typography} from '@mui/material';
import * as FUNCTIONS from "../../constants/functions";
import HeaderTypography from "./headerTypography";

export default function HomePage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [pixelsArray, setPixelsArray] = useState<Array<Array<string>>>([])

    const [isDropperActivated, setIsDropperActivated] = useState<boolean>(false);
    const [isDropperClicked, setIsDropperClicked] = useState<string>('');
    const [currentColor, setCurrentColor] = useState<string>('Current Color');
    const [keepDropper, setKeepDropper] = useState<boolean>(false)

    const [dropperOffSetX, setDropperOffSetX] = useState<number>(0);
    const [dropperOffSetY, setDropperOffSetY] = useState<number>(0);

    useEffect(() => {
        setPixelsArray(FUNCTIONS.randomizeArray()) //Initial filling of the dropper cells colors array
        const context = canvasRef?.current?.getContext('2d');
        if (context) {
            const image = new Image();
            image.onload = function (res) {
                context.drawImage(image, 0, 0, window.innerWidth - 80, window.innerHeight);
            }
            image.src = require('./assets/BackgroundImage.jpg');
        }
    }, [])

    const dropperMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if (!keepDropper) {
            setDropperOffSetX(0);
            setDropperOffSetY(0);
        }
    }

    const dropperActivateClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!isDropperActivated) setIsDropperActivated(!isDropperActivated)
        else {
            setIsDropperActivated(!isDropperActivated)
            setIsDropperClicked('')
        }
    }

    useEffect(() => {
        if ( dropperOffSetX ) {
            setKeepDropper(true)
            setTimeout(() => {
                setKeepDropper(false)//Just for keeping that dropper for some time
            }, 400)
        }
    },[dropperOffSetX])

    const imageMouseEnter = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const { target } = event;
        if (target && canvasRef.current && isDropperActivated) {
            const context = canvasRef?.current?.getContext('2d')
            let x=event.clientX-canvasRef?.current?.getBoundingClientRect()?.x;
            let y=event.clientY-canvasRef?.current?.getBoundingClientRect()?.y;
            setDropperOffSetX(event.pageX-50)//Centralizing the dropper circle in realtion with the cursor
            setDropperOffSetY(event.pageY-50)//Centralizing the dropper circle in realtion with the cursor
            const imageData = context?.getImageData(x, y, 1, 1);
            let [red, green, blue, alpha] = [imageData?.data[0], imageData?.data[1], imageData?.data[2], imageData?.data[3]];
            setCurrentColor(FUNCTIONS.rgb2hex(`rgba(${red}, ${green}, ${blue}, ${alpha})`))

            //Start of filling the dropper big circle cells with the surrounding pixels colors
            let forPixelsArray=[]
            for (let ii=-5; ii<=5; ii++) {
                let arrayRow = [];
                for (let jj=-5; jj<=5; jj++) {
                    const imageData = context?.getImageData(x+jj, y+ii, 1, 1);
                    let [red, green, blue, alpha] = [imageData?.data[0], imageData?.data[1], imageData?.data[2], imageData?.data[3]];
                    arrayRow.push(FUNCTIONS.rgb2hex(`rgba(${red}, ${green}, ${blue}, ${alpha})`))
                }
                forPixelsArray.push(arrayRow)
            }
            setPixelsArray(forPixelsArray)
            //End of filling the dropper big circle cells with the surrounding pixels colors
        }
    }

    return (
        <Box className={isDropperActivated ? 'App-dropper-active' : 'App'} sx={{ backgroundColor: 'white.main'}}>
            <HeaderTypography />

            {isDropperActivated && !!dropperOffSetX &&
                <Box sx={{position: 'absolute', top: dropperOffSetY, left: dropperOffSetX, display: 'flex', flexDirection: 'column', borderRadius: '50%', outline: `10px solid ${currentColor}`}}
                     className='Dropper-box' onMouseMove={dropperMouseEnter} onClick={() => setIsDropperClicked(currentColor)} >
                    <Box sx={{position: 'absolute', fontSize: 11}} className='Pixel-dropper-text'>{currentColor}</Box>
                {pixelsArray.map((row, index) => (
                    <Box key={index} sx={{display: 'flex', flexDirection: 'row'}} className='Dropper-box-row'>
                        {row.map((element, index) => (
                            <Box key={index} sx={{backgroundColor: element, width: 10, height: 10, border: '1px solid gray'}} className='Dropper-box-row-element'></Box>
                        ))}
                    </Box>
                ))}
            </Box>}

            <Box sx={{marginTop: 4}}>
                <Box sx={{display: 'flex', flexDirection: 'row', paddingLeft: 3, paddingRight: 3}}>
                    <Box sx={{backgroundColor: 'secondary.light', borderRadius: '50%', width: 26, height: 26, padding: 1}}
                         onClick={dropperActivateClick}
                    >
                        <img src='./assets/IconColorPicker.svg'/>
                    </Box>
                    {isDropperClicked &&
                        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <Typography variant="body2" sx={{ width: 105, paddingTop: 1, fontWeight: 'bold', textAlign: 'center', marginLeft: '50%', transform: 'translateX(-50%)' }}>
                            {isDropperClicked}</Typography>
                            <Box sx={{width: 25, height: 25, borderRadius: '50%', border: '1px solid gray', backgroundColor: isDropperClicked, transform: 'translateX(-60px)' }}></Box>
                        </Box>}

                </Box>
                <Box sx={{width: '100%', height: '100%', marginTop: 2, alignItems: { xs: 'center', md: 'unset'}}}>
                    <canvas ref={canvasRef} width={window.innerWidth-80} height={window.innerHeight}
                        onMouseMove={imageMouseEnter}
                    />
                </Box>
            </Box>
        </Box>
    )
}
