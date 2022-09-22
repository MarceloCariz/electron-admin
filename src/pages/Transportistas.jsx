import {  faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { agregarTransportistas, borrarTransportistas, editarTransportistas, obtenerTransportistas } from '../helpers/getAdmin';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModalAgregar from '../components/ui/ModalAgregar';
import ModalEditar from '../components/ui/ModalEditar';


const Transportistas = () => {
  //DATOS
  const [alerta, setAlerta] = useState({msg:'', error:false})
  const [formValues, setFormValues] = useState({nombre: '', correo: '', id: 0, password: ''});
  const {nombre, correo, password } = formValues;
  const [transportistas, setTransportistas] = useState([])
  ///MODALES
  const [openAgregar, setOpenAgregar] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

    
  
    

// FUNCIONES CERRAR MODAL EDITAR
const handleOpen = (e) => {
    setOpen(true);
    setFormValues({ nombre: e.NOMBRE, correo: e.CORREO, id: e.ID || '' });
};
const handleClose = () => {
  setFormValues({ nombre: '', correo: '', id:  ''  ,password: ''});
  setOpen(false)
};

// FUNCIONES CERRAR MODAL AGREGAR
const handleOpenAgregar =(e) => {
    setOpenAgregar(true);
};
const handleCloseAgregar = () => {
  setFormValues({ nombre: '', correo: '', id:  '' ,password: '' });
  setOpenAgregar(false)
};

useEffect(() => {
      if (localStorage.getItem("token") === "") {
        navigate("/");
      }
      const cargartransportistas = async () => {
        const respuesta = await obtenerTransportistas();
        console.log(respuesta);
        setTransportistas(respuesta);
      };

      cargartransportistas();
      console.log(transportistas);
}, []);

const onChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
};

/// AGREGAR TRANSPORTISTA
const  handleAgregar = async(e) =>{
  e.preventDefault();
  const respuesta = await agregarTransportistas(formValues);
  window.location.reload();

}

const handleEditarTransport = async(e) =>{
    e.preventDefault();
    if ([correo, nombre].includes("")) {
      console.log('to')

        return;
    }
    const respuesta = await editarTransportistas(formValues);
    window.location.reload();
}

const RemoveTransportista = async(e)=>{
    await borrarTransportistas(e)
    window.location.reload();
}

const columns =[
        { field: 'NOMBRE', headerName: 'Nombre', flex:1, minWidth: 150 , renderCell: (params) => <p> {params.row.NOMBRE} </p>},
        { field: 'CORREO', headerName: 'Correo', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.CORREO}</>},
        { field: 'acciones', headerName: 'Acciones', flex:1 , minWidth: 150 , renderCell: (params) => 
        <div style={{display:'flex', gap:'10px' , alignItems: 'center'}}>
          <Boton variant='contained'  onClick={(e) => handleOpen(params.row,e)}>
            <FontAwesomeIcon   icon={faPenToSquare} />
            Editar
          </Boton>
          <Boton variant='contained' color='error'   onClick={(e)=> RemoveTransportista(params.row.ID,e)}>
              <FontAwesomeIcon   icon={faTrash}/>
            Eliminar
          </Boton>
        </div>},
        
];

  return (
    <div>
        <h1>Transportistas</h1>
        <Boton onClick={handleOpenAgregar} variant='contained'>
          <FontAwesomeIcon icon={faUserPlus}/>
          Agregar Transportista
        </Boton>
        <ModalAgregar  open={openAgregar} handleClose={handleCloseAgregar} handleAgregar={ handleAgregar} onChange={onChange} nombre={nombre} correo={correo} password={password}/>
        {/* -------------------FORM------------------------ */}
        <DataGrid
            style={{  width: '70vw' }}
            rows={transportistas}
            getRowId={(row)=>row.ID}
            columns={columns}
            pageSize={5}
            autoHeight={true}
            autoPageSize={true}
            
            
        />
        
        <ModalEditar open={open} handleClose={handleClose} handleEditar={handleEditarTransport} onChange={onChange} nombre={nombre} correo={correo} />

    </div>
  )
}

const Boton = styled(Button)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 10px;
`


export default Transportistas