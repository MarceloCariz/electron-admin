import { ErrorMessage, useField } from "formik";
import { Box, FormLabel, TextField } from "@mui/material";



export const MyTextInput = ({label, ...props}) => {

    const [field] = useField(props); /// con meta se puede agregar estilos con los errores que proporciona el meta

    return (
        <Box display={"flex"} flexDirection="column">
            {/* <FormLabel className="text-left  font-semibold text-lg" htmlFor={props.id || props.name}>{label}</FormLabel> */}
            <TextField margin='dense' variant="filled"  label={props.labelmui} {...field} {...props} />
            <ErrorMessage style={{color: 'red'}} name={props.name} component="span"/>
        </Box>
    )
}