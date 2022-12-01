import { Box,  Grid, Typography } from '@mui/material'
import { useState,  useEffect} from 'react'
import { CardProducto } from '../components/productos/CardProducto';
import { NombresProducto } from '../components/productos/NombresProducto';
import { listarNombresDisponibles, listarProductosProductor } from '../helpers/getAdmin'

export const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombres, setNombres] = useState([]);
    useEffect(()=>{
        const cargarDatos = async() =>{
            const resp = await listarProductosProductor();
            setProductos(resp)
            const names = await listarNombresDisponibles();
            setNombres(names)
        }
        cargarDatos()
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
