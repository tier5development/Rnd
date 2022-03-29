import { FormControl, TextField, Container } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
 
const TextFill = () => {

    const handleChange = () => {

    };

    return(
        <Container maxWidth="sm">
        <Box mt={3} width="100%">
            <FormControl fullWidth size="small">
                <TextField 
                onChange={handleChange}
                variant="outlined"
                label="Amount of Questions"
                type="number"
                size="small"
                />
            </FormControl>
        </Box>
        </Container>
    )
}

export default TextFill;