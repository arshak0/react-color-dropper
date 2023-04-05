import React, {useEffect, useState, useRef} from "react";
import {Box} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as TEXTS from "../../constants/texts";

function rgb2hex(rgb: string){
    let rgbRegularExpression = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgbRegularExpression && rgbRegularExpression.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function randomizeArray(){
    var finalArray=[]
    for (let ii=0; ii<=10; ii++) {
        var arrayRow = []
        for (let jj=0; jj<=10; jj++) {
            arrayRow.push(`#${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}${Math.floor(Math.random()*9)+1}`)
        }
        finalArray.push(arrayRow)
    }

    return finalArray
}

export default function HomePage() {
    const canvasRef = useRef(null);

    const [pixelsArray, setPixelsArray] = useState<Array>([])

    const [isDropperActivated, setIsDropperActivated] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>('Current Color');
    const [keepDropper, setKeepDropper] = useState<boolean>(false)

    const [dropperOffSetX, setDropperOffSetX] = useState<boolean>(null);
    const [dropperOffSetY, setDropperOffSetY] = useState<boolean>(null);

    useEffect(() => {
        let randomArray=randomizeArray();
        setPixelsArray((randomArray))
        const context = canvasRef.current.getContext('2d');
        const image = new Image();
        image.onload = function(res) {
            context.drawImage(image, 0, 0, window.innerWidth-80, window.innerHeight);
        }
        image.src = require('./BackgroundImage.jpg');
    } ,[])

    const dropperMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if ( !keepDropper ) {
            setDropperOffSetX(0);
            setDropperOffSetY(0);
        }
    }

    useEffect(() => {
        if ( dropperOffSetX ) {
            setKeepDropper(true)
            setTimeout(() => {
                setKeepDropper(false)
            }, 400)
        }
    },[dropperOffSetX])

    const imageMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        if (isDropperActivated) {
            const context = canvasRef.current.getContext('2d');
            var x=event.pageX-event.target.offsetLeft;
            var y=event.pageY-event.target.offsetTop;
            setDropperOffSetX(event.pageX-50)
            setDropperOffSetY(event.pageY-50)
            const imageData = context.getImageData(x, y, 1, 1);
            let red = imageData.data[0];
            let green = imageData.data[1];
            let blue = imageData.data[2];
            let alpha = imageData.data[3];
            setCurrentColor(rgb2hex(`rgba(${red}, ${green}, ${blue}, ${alpha})`))

            var forPixelsArray=[]
            for (let ii=-5; ii<=5; ii++) {
                var arrayRow = []
                for (let jj=-5; jj<=5; jj++) {
                    const imageData = context.getImageData(x+jj, y+ii, 1, 1);
                    let red = imageData.data[0];
                    let green = imageData.data[1];
                    let blue = imageData.data[2];
                    let alpha = imageData.data[3];
                    arrayRow.push(rgb2hex(`rgba(${red}, ${green}, ${blue}, ${alpha})`))
                }
                forPixelsArray.push(arrayRow)
            }
            setPixelsArray(forPixelsArray)
        }
    }

    return (
        <Box className={isDropperActivated ? 'App-dropper-active' : 'App'} sx={{ backgroundColor: 'white.main'}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black.main' }}>
                {TEXTS.HEADER_TEXT}
            </Typography>

            {isDropperActivated && !!dropperOffSetX &&
                <Box sx={{position: 'absolute', top: dropperOffSetY, left: dropperOffSetX, display: 'flex', flexDirection: 'column', borderRadius: '50%', outline: `10px solid ${currentColor}`}}
                     className='Dropper-box' onMouseMove={dropperMouseEnter} >
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
                         onClick={() => setIsDropperActivated(!isDropperActivated)}
                    >
                        <img src='./assets/IconColorPicker.svg'/>
                    </Box>
                    <Typography variant="body2" sx={{ width: 105, paddingTop: 1, fontWeight: 'bold', textAlign: 'center', marginLeft: '50%', transform: 'translateX(-50%)' }}>
                        {currentColor}</Typography>
                    <Box sx={{width: 25, height: 25, borderRadius: '50%', border: '1px solid gray', backgroundColor: currentColor }}></Box>

                </Box>
                <Box sx={{width: '100%', height: '100%', marginTop: 2, alignItems: { xs: 'center', md: 'unset'}}}>
                    <canvas ref={canvasRef} width={window.innerWidth-80} height={window.innerHeight}
                        onMouseMove={imageMouseEnter} willreadfrequently='true'
                    />
                </Box>
            </Box>
        </Box>
    )
}
