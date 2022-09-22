import {  faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { agregarClientes, obtenerClientes, editarClientes, borrarClientes} from '../helpers/getAdmin';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModalAgregar from '../components/ui/ModalAgregar';
import ModalEditar from '../components/ui/ModalEditar';

const Clientes = () => {
  // Datos
  const [clientes, setClientes] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [alerta, setAlerta] = useState({msg:'', error:false})
  const [formValues, setFormValues] = useState({nombre: '', correo: '', id: 0, password: ''});
  const {nombre, correo, password } = formValues;

  //MODALES
  const [openAgregar, setOpenAgregar] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem("token") == "" ) {
        navigate('/')
      }
      const cargarClientes = async()=>{
        const respuesta = await obtenerClientes();
        console.log(respuesta)
        setClientes(respuesta);
      }
  
      cargarClientes();
    },[] )
  
  // FUNCIONES CERRAR MODAL EDITAR
  const handleOpen = (e) => {
      setOpen(true);
      setFormValues({ nombre: e.NOMBRE, correo: e.CORREO, id: e.ID || '' });
  };
  const handleClose = () => {
    setFormValues({ nombre: '', correo: '', id:  '' ,password: ''});
    setOpen(false)
  };
  // FUNCIONES CERRAR MODAL AGREGAR
  const handleOpenAgregar =(e) => {
    setOpenAgregar(true);
  };
  const handleCloseAgregar = () => {
    setFormValues({ nombre: '', correo: '', id:  '' ,password: ''});
    setOpenAgregar(false)
  };

  const onChange = ({target}) =>{
    setFormValues({
      ...formValues,
      [target.name] : target.value
    });
  }

  const  handleAgregar = async(e) =>{
    e.preventDefault();
    if ([correo, nombre, password].includes("")) {
      console.log('to')
      return;
  }
    const respuesta = await agregarClientes(formValues);
  
    window.location.reload();
  
  }

  const handleEditarCliente = async(e) =>{
    e.preventDefault();
    if ([correo, nombre].includes("")) {
        setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
        });
        setTimeout(() => {
        setAlerta({ error: false, msg: "" });
        }, 2000);
        return;
    }
    const respuesta = await editarClientes(formValues);
    window.location.reload();
}

const RemoveCliente = async(e)=>{
  await borrarClientes(e)
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
      <Boton variant='contained' color='error'   onClick={(e)=> RemoveCliente(params.row.ID,e)}>
          <FontAwesomeIcon   icon={faTrash}/>
        Eliminar
      </Boton>
    </div>},];
    
  return (
    <>
    <div>
        <h1>Clientes</h1>
        <Boton onClick={handleOpenAgregar} variant='contained'>
          <FontAwesomeIcon icon={faUserPlus}/>
          Agregar Cliente
        </Boton>
        <ModalAgregar  open={openAgregar} handleClose={handleCloseAgregar} handleAgregar={ handleAgregar} onChange={onChange} nombre={nombre} correo={correo} password={password}/>
        {/* -------------------FORM------------------------ */}
        <DataGrid
            style={{  width: '70vw' }}
            rows={clientes}
            getRowId={(row)=>row.ID}
            columns={columns}
            pageSize={5}
            autoHeight={true}
            autoPageSize={true}
            
            
        />
        
        <ModalEditar open={open} handleClose={handleClose} handleEditar={handleEditarCliente} onChange={onChange} nombre={nombre} correo={correo} />

    </div>
    </>
  )
}
const Boton = styled(Button)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 10px;
`
export default Clientes