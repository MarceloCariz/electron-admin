import { Box,  Grid, Typography } from '@mui/material'
import {   useEffect} from 'react'
import { CardProducto } from '../components/productos/CardProducto';
import { NombresProducto } from '../components/productos/NombresProducto';
import useConsultas from '../hooks/useConsultas';

export const Productos = () => {

    const {cargarDatosProductos, nombres, productos} = useConsultas();
    useEffect(()=>{

        cargarDatosProductos()
    },[])
    return (
        <Box marginTop={4} >
            <Typography textAlign={"center"} marginBottom={5} variant='h4'>Productos Disponibles</Typography>
            
            <NombresProducto nombres={nombres}/>

            <Grid container spacing={3}  justifyContent={"center"}>
                {
                    productos.length > 0 && productos.map((producto)=>(
                        <CardProducto key={producto.ID_PRODUCTO} {...producto} />
                    ))  
                }
            </Grid>



        </Box>
    )
}
