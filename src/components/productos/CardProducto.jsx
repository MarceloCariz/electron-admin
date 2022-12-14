import React, { useState } from 'react'
import styled from 'styled-components';
import { Alert,  Button, Card, CardActions,  CardHeader, CardMedia, Grid} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { eliminarProductoProductor } from '../../helpers/getAdmin';
import useConsultas from '../../hooks/useConsultas';


export const CardProducto = ({ID_PRODUCTO, NOMBRE, IMAGE_URL}) => {
    const [mensaje, setMensaje] = useState('');
    const {cargarDatosProductos} = useConsultas();

    const eliminarProducto = async() =>{
        const resp = await eliminarProductoProductor(ID_PRODUCTO);
        setMensaje(resp);

        setTimeout(() => {
            setMensaje('');
            cargarDatosProductos();
        }, 2000);
    }

    return (
        <Grid item>
            <CardProductotyle>
                <CardMedia   height="150"   component={"img"} src={IMAGE_URL} alt={"imagen"}/>
                <CardHeader title={NOMBRE} subheader={`ID: ${ID_PRODUCTO}`} />
                {mensaje && <Alert variant='filled' color='success'>{mensaje}</Alert>}
                <CardActions>
                    <Button onClick={eliminarProducto} variant='contained' color='error' startIcon={<DeleteIcon />}>
                        Eliminar
                    </Button>
                </CardActions>
            </CardProductotyle>
        </Grid>
    )
}


const CardProductotyle = styled(Card)`
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    /* max-width: 500px; */
    width: 190px;
    /* height: 200px; */
    min-height: 100px;
`;