import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box, Button } from '@mui/material';
import { ModalLista } from './ModalLista';
import { useState } from 'react';
import { ModalAgregar } from './ModalAgregar';

export const NombresProducto = ({nombres}) => {
    const [modal, setModal] = useState(false)
    const [modalAgregar, setModalAgregar] = useState(false)
    return (
        <Box display={"flex"} justifyContent="center" marginBottom={5} gap={5}>
            <Button onClick={()=> setModalAgregar(true)} startIcon={<PlaylistAddIcon/>} variant='contained' >Agregar nuevo nombre a la lista</Button>
            <Button onClick={()=> setModal(true)} startIcon={<FormatListBulletedIcon/>} variant='contained' color="success" >Ver Lista de nombres disponibles</Button>
            <ModalLista modal={modal} setModal={setModal} nombres={nombres}/>
            <ModalAgregar modalAgregar={modalAgregar} setModalAgregar={setModalAgregar} />
        </Box>
    )
}
