import React, {useEffect, useState} from "react";
import {Box} from '@mui/material';
import * as CONSTANTS from "../../constants/constants";
import {NavLink} from "react-router-dom";

const links = [
    { to : '/', name: 'Homepage' },
]
export default function NavBar() {

    useEffect(() => {
    })

    const [click, setClick] = useState<boolean>(false);
    const handleClick = () => setClick(!click);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 2, backgroundColor: 'primary.main'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4, padding: 1}}>
                <img style={{width: CONSTANTS.BASE_IMG_SIZE, height: CONSTANTS.BASE_IMG_SIZE}} src='logo512.png' alt='logo-img' />
                {links.map((link, index) =>
                    (<NavLink key = {index}
                        style={({ isActive }) => ({
                        color:  isActive ? 'white' : 'black',
                        textDecoration: 'none'
                    })}
                    to={link.to}
                    onClick={handleClick}
                >
                    {link.name}
                </NavLink>))}
            </Box>
        </Box>
    )
}
