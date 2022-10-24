import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { obtenerContratos, renovarContrato } from '../helpers/getAdmin'
import styled from 'styled-components';
import {  faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModalAgregar from '../components/ui/ModalAgregar';
import ModalEditar from '../components/ui/ModalEditar';










const Contratos = () => {
  const [formValues, setFormValues] = useState({id: 0, FechaInicio: '', FechaTermino: ''});
  const [contratos, setContratos] = useState([])
  const {FechaInicio, FechaTermino } = contratos;
  const navigate = useNavigate();

  //plano
  const [alerta, setAlerta] = useState("")
  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") == "" ) {
      navigate('/')
    }
    const cargarContratos = async () => {
      const respuesta = await obtenerContratos();
      console.log(respuesta);
      setContratos(respuesta);
    };

    cargarContratos();
    console.log(contratos);

  },[])
// ===================================== PLANO ===========================================================================

  // FUNCIONES CERRAR MODAL EDITAR
  const handleOpenEditar = (e) => {
    setOpenEditar(true);
      setFormValues({ FechaInicio: e.FECHA_INICIO, FechaTermino: e.FECHA_TERMINO, id: e.ID_CONTRATO || '' });
  };
  const handleCloseEditar = () => {
    setFormValues({ FechaInicio: '', FechaTermino: '', id:  ''});
    setOpenEditar(false)
  };

  const onChange = ({target}) =>{
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }
  const handleEditarCliente = async(e) =>{
    e.preventDefault();
    if ([FechaInicio, FechaTermino].includes("")) {
      setAlerta('Todos los campos son obligatorios')
      setTimeout(() => {
        setAlerta('');
      }, 2000);
      return;
    }
    //const respuesta = await editarClientes(formValues);
    console.log("edicion pasada")
    window.location.reload();
  }

      
  const columns =[
    { field: 'ID Contrato', headerName: 'id', flex:1, minWidth: 150 , renderCell: (params) => <p> {params.row.ID_CONTRATO} </p>},
    { field: 'Fecha Inicio', headerName: 'FechaInicio', flex:1, minWidth: 150 , renderCell: (params) => <p> {params.row.FECHA_INICIO} </p>},
    { field: 'Fecha Termino', headerName: 'FechaTermino', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.FECHA_TERMINO}</>},
    { field: 'acciones', headerName: 'Acciones', flex:1 , minWidth: 150 , renderCell: (params) => 
    <div style={{display:'flex', gap:'10px' , alignItems: 'center'}}>
      <Boton variant='contained'  onClick={(e) => handleOpenEditar(params.row,e)}>
        <FontAwesomeIcon   icon={faPenToSquare} />
        Editar
      </Boton> {/** 
      <Boton variant='contained' color='error'   onClick={(e)=> RemoveCliente(params.row.ID_CONTRATO,e)}>
          <FontAwesomeIcon   icon={faTrash}/>
        Eliminar
      </Boton>*/}
    </div>},];
// ===================================== PLANO ===========================================================================
  return (
    <>
    <div>
        <h1>Clientes</h1>{/** 
        <Boton onClick={handleOpenAgregar} variant='contained'>
          <FontAwesomeIcon icon={faUserPlus}/>
          Agregar Cliente
        </Boton>
        <ModalAgregar error={alerta}  open={openAgregar} handleClose={handleCloseAgregar} handleAgregar={ handleAgregar} onChange={onChange} FechaInicio={FechaInicio} FechaTermino={FechaTermino}/>
        
        */}      
        {/* -------------------FORM------------------------ */}
        <DataGrid
            style={{  width: '70vw' , backgroundColor: 'white'}}
            rows={contratos}
            getRowId={(row)=>row.ID_CONTRATO}
            columns={columns}
            pageSize={5}
            autoHeight={true}
            autoPageSize={true}
            
            
        />
        
        <ModalEditar error={alerta}  open={openEditar} handleClose={handleCloseEditar} handleEditar={handleEditarCliente} onChange={onChange} FechaInicio={FechaInicio} FechaTermino={FechaTermino} />

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

export default Contratos