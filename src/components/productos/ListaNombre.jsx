import { Alert, Box, IconButton, Input, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { editarNombreDisponible, eliminarNombreDisponible } from '../../helpers/getAdmin';
import useConsultas from '../../hooks/useConsultas';
export const ListaNombre = ({NOMBRE, ID}) => {

    const {cargarDatosProductos} = useConsultas();

    const [nombre, setNombre] = useState(NOMBRE)
    const [mensaje, setMensaje] = useState({error: false, msg:''})
    

        const handleChange = (e) =>{
            setNombre(e.target.value)
        }
        const handleEliminar = async() =>{
            const resp = await eliminarNombreDisponible(ID)
            setMensaje({error:true, msg:resp})
            setTimeout(() => {
                setMensaje({error: false, msg:''})
                cargarDatosProductos();
            }, 2000);
        }

        const handleEditar = async() =>{
            const resp = await editarNombreDisponible({nombre, id:ID})
            setMensaje({error:false, msg:resp})
            setTimeout(() => {
                setMensaje({error: false, msg:''})
                cargarDatosProductos();
            }, 2000);
        }
    return (
        <ListItem  secondaryAction={
                <Box display={"flex"} gap={4}>
                    <IconButton onClick={handleEditar} edge="end" aria-label="editar">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleEliminar} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            }
        >
            <ListItemIcon>
                <FeaturedPlayListIcon/>
            </ListItemIcon>
            {mensaje.msg ? <Alert variant='filled' color={`${mensaje.error ? 'error' : 'success'}`}>{mensaje.msg}</Alert>
                : 
                <>
                        <Input sx={{width: 200}}  value={nombre || ''} onChange={handleChange} />
                        <ListItemText secondary={`ID: ${ID}`}/>
                </>
            }

        </ListItem>
    )
}
