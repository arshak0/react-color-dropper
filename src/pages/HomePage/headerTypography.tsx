import React from "react";
import {Box, Typography} from '@mui/material';
import * as TEXTS from "../../constants/texts";

export default function HeaderTypography() {
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black.main' }}>
                {TEXTS.HEADER_TEXT_1}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black.main' }}>
                {TEXTS.HEADER_TEXT_2}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black.main' }}>
                {TEXTS.DROPPER_INSTRUCTIONS_1}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black.main' }}>
                {TEXTS.DROPPER_INSTRUCTIONS_2}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black.main' }}>
                {TEXTS.DROPPER_INSTRUCTIONS_3}
            </Typography>
        </Box>
    )
}
