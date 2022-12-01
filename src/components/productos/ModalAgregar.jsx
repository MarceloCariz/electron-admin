


import { Alert, Box, Button, Input, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { agregarNombreDisponible } from '../../helpers/getAdmin';

export const ModalAgregar = ({modalAgregar, setModalAgregar}) => {
    const [nombre, setNombre] = useState('');
    const [mensaje, setMensaje] = useState('')



    const handleSubmit = async() =>{
        const resp = await agregarNombreDisponible(nombre);
        setMensaje(resp)
        setTimeout(() => {
            setMensaje('')
            window.location.reload();
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
                    <Input value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <Button variant="contained"  onClick={handleSubmit} >Agregar a la lista</Button>
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