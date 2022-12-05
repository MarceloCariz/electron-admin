


import { Alert, Box, Button, Input, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { agregarNombreDisponible } from '../../helpers/getAdmin';
import useConsultas from '../../hooks/useConsultas';

export const ModalAgregar = ({modalAgregar, setModalAgregar}) => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('')

    const {cargarDatosProductos} = useConsultas();



    const handleSubmit = async(e) =>{
        e.preventDefault();
        const resp = await agregarNombreDisponible(nombre);
        setMensaje(resp)
        setTimeout(() => {
            setMensaje('')
            setNombre('');
            cargarDatosProductos();
        }, 2000);
    } 
    return (
        <Modal
        open={modalAgregar}
        onClose={() => setModalAgregar(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 400, borderRadius:"10px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Agregar Nombre a la lista
                </Typography>
                {mensaje && <Alert variant='filled' color={ 'success'}>{mensaje}</Alert>}
                <Box display={"flex"} gap={5} marginTop={2}>
                    <form onSubmit={handleSubmit}>
                        <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                        <Button  type="submit" variant="contained"  onClick={handleSubmit} >Agregar a la lista</Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    pt: 2,
    px: 4,
    pb: 3,
};