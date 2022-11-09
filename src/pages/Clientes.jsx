import {  faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { agregarClientes, editarClientes, borrarClientes} from '../helpers/getAdmin';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModalAgregar from '../components/ui/ModalAgregar';
import ModalEditar from '../components/ui/ModalEditar';
import useConsultas from '../hooks/useConsultas';


const Clientes = () => {
  // Datos
  const [alerta, setAlerta] = useState("")
  const [formValues, setFormValues] = useState({nombre: '', correo: '', id: 0, password: '', tipo: 'local', rut:''});
  //MODALES
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);;
  //
  const {cargarClientes, clientes} = useConsultas();
  const navigate = useNavigate();
  
  const {nombre, correo, password, rut, tipo } = formValues

  useEffect(() => {
      if (localStorage.getItem("token") === "" ) {
        navigate('/')
      }

  
      cargarClientes();
    },[] )
  


  // FUNCIONES CERRAR MODAL EDITAR
  const handleOpenEditar = (e) => {
    setOpenEditar(true);
      setFormValues({ nombre: e.NOMBRE, correo: e.CORREO, id: e.ID || '' });
  };
  const handleCloseEditar = () => {
    setFormValues({ nombre: '', correo: '', id:  ''  ,password: '', tipo: 'local', rut:''});
    setOpenEditar(false)
  };
  // FUNCIONES CERRAR MODAL AGREGAR
  const handleOpenAgregar =(e) => {
    setOpenAgregar(true);
  };
  const handleCloseAgregar = () => {
    setFormValues({ nombre: '', correo: '', id:  '' ,password: '',  tipo: 'local',rut:''});
    setOpenAgregar(false)
  };

  const onChange = ({target}) =>{
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  const handleChangeTipoCliente = ({target}) =>{
    // console.log(target.value)
    if(target.value === "externo") return setFormValues({...formValues, tipo: target.value, rut: ""})
    setFormValues({...formValues, tipo: target.value});
  
  }

  const  handleAgregar = async(e) =>{
    e.preventDefault();

    if(tipo === "local" && rut === ""){
      setAlerta('El rut es obligatorio para el cliente local')
      setTimeout(() => {
        setAlerta('');
      }, 3000);
      return;
    }
    if ([correo, nombre, password,  tipo ].includes('')) {
      setAlerta('Todos los campos son obligatorios')
      setTimeout(() => {
        setAlerta('');
      }, 3000);
      return;
    }
    // console.log(formValues);
    // return;
    await agregarClientes(formValues);
    cargarClientes();
    handleCloseAgregar();
  }



  const handleEditarCliente = async(e) =>{
    e.preventDefault();
    if ([correo, nombre].includes("")) {
      setAlerta('Todos los campos son obligatorios')
      setTimeout(() => {
        setAlerta('');
      }, 2000);
      return;
    }
    await editarClientes(formValues);
    cargarClientes();
    handleCloseEditar();
}

const RemoveCliente = async(e)=>{
  await borrarClientes(e)
  cargarClientes();
}
    
  const columns =[
    { field: 'NOMBRE', headerName: 'Nombre', flex:1, minWidth: 150 , renderCell: (params) => <p> {params.row.NOMBRE} </p>},
    { field: 'CORREO', headerName: 'Correo', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.CORREO}</>},
    { field: 'RUT', headerName: 'Rut', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.RUT}</>},
    { field: 'acciones', headerName: 'Acciones', flex:1 , minWidth: 150 , renderCell: (params) => 
    <div style={{display:'flex', gap:'10px' , alignItems: 'center'}}>
      <Boton variant='contained'  onClick={(e) => handleOpenEditar(params.row,e)}>
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
        <ModalAgregar handleChangeTipoCliente={handleChangeTipoCliente} usuario="cliente" tipoCliente={tipo} rut={formValues.rut}
        error={alerta}  open={openAgregar} handleClose={handleCloseAgregar} 
        handleAgregar={ handleAgregar} onChange={onChange} nombre={nombre} correo={correo} password={password}/>
        {/* -------------------FORM------------------------ */}
        <DataGrid
            style={{  width: '70vw' , backgroundColor: 'white'}}
            rows={clientes}
            getRowId={(row)=>row.ID}
            columns={columns}
            pageSize={8}
            autoHeight={true}
            autoPageSize={true}
            
            
        />
        
        <ModalEditar error={alerta}  open={openEditar} handleClose={handleCloseEditar} handleEditar={handleEditarCliente} onChange={onChange} nombre={nombre} correo={correo} />

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