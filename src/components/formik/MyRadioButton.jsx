import { Box, FormControlLabel, FormLabel, Input, Radio } from "@mui/material";
import { ErrorMessage, useField } from "formik"



export const MyRadioButton = ({label, ...props}) => {

    const [field] = useField(props); /// con meta se puede agregar estilos con los errores que proporciona el meta

    return (
        <Box >
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <FormControlLabel label={props.labelmui} control={<Radio />} type="radio"  {...field} {...props} />
            <ErrorMessage className="text-red-500 font-semibold" name={props.name} component="span"/>
        </Box>
    )
}