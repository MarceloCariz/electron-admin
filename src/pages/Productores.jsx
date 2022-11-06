import {  faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { agregarProductor,  editarProductores, borrarProductores } from '../helpers/getAdmin';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ModalAgregar from '../components/ui/ModalAgregar';
import ModalEditar from '../components/ui/ModalEditar';
import useConsultas from '../hooks/useConsultas';

const Productores = () => {
    // const [productores, setProductores] = useState([]);
    const [alerta, setAlerta] = useState("")
    const [formValues, setFormValues] = useState({nombre: '', correo: '', id: 0, password: ''});
    const {nombre, correo, password } = formValues;
    ///MODALES
    const [openAgregar, setOpenAgregar] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const navigate = useNavigate();
    /// useconsultas
    const {cargarProductores, productores} = useConsultas();


    useEffect(() => {

      if (localStorage.getItem("token") === "" ) {
            navigate('/')
      }
      cargarProductores();
  },[navigate] )


// FUNCIONES CERRAR MODAL EDITAR
const handleOpenEditar = (e) => {
  setOpenEditar(true);
    setFormValues({ nombre: e.NOMBRE, correo: e.CORREO, id: e.ID || '' });
};
const handleCloseEditar = () => {
  setFormValues({ nombre: '', correo: '', id:  ''  ,password: ''});
  setOpenEditar(false)
};
  
  // FUNCIONES CERRAR MODAL AGREGAR
  const handleOpenAgregar =(e) => {
      setOpenAgregar(true);
  };
  const handleCloseAgregar = () => {
    setFormValues({ nombre: '', correo: '', id:  '' ,password: ''});
    setOpenAgregar(false)
  };

            

const onChange = ({ target }) => {
  setFormValues({
    ...formValues,
    [target.name]: target.value,
  });
};
      /// AGREGAR PRODUCTOR
const  handleAgregar = async(e) =>{
  e.preventDefault();
  if ([correo, nombre, password].includes("")) {
    setAlerta('Todos los campos son obligatorios')
    setTimeout(() => {
      setAlerta('');
    }, 3000);
    return;
  }
  await agregarProductor(formValues);

  cargarProductores();
  handleCloseAgregar();

}

const handleEditarProductor = async(e) =>{
    e.preventDefault();
    if ([correo, nombre].includes("")) {
      setAlerta('Todos los campos son obligatorios')
      setTimeout(() => {
        setAlerta('');
      }, 2000);
      return;
    }
    await editarProductores(formValues);
    cargarProductores();
    handleCloseEditar();

}

const RemoveProductor = async(e)=>{
    await borrarProductores(e)
    cargarProductores();

}

const columns =[
        { field: 'NOMBRE', headerName: 'Nombre', flex:1, minWidth: 150 , renderCell: (params) => <p> {params.row.NOMBRE} </p>},
        { field: 'CORREO', headerName: 'Correo', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.CORREO}</>},
        { field: 'acciones', headerName: 'Acciones', flex:1 , minWidth: 150 , renderCell: (params) => 
        <div style={{display:'flex', gap:'10px' , alignItems: 'center'}}>
          <Boton variant='contained'  onClick={(e) => handleOpenEditar(params.row,e)}>
            <FontAwesomeIcon   icon={faPenToSquare} />
            Editar
          </Boton>
          <Boton variant='contained' color='error' onClick={(e)=> RemoveProductor(params.row.ID,e)}>
              <FontAwesomeIcon   icon={faTrash}/>
            Eliminar
          </Boton>
        </div>},
        
];
  return (
    <>
    <div>
        <h1>Productores</h1>
        <Boton onClick={handleOpenAgregar} variant='contained'>
          <FontAwesomeIcon icon={faUserPlus}/>
          Agregar Productor
        </Boton>
        <ModalAgregar error={alerta} open={openAgregar} handleClose={handleCloseAgregar} handleAgregar={ handleAgregar} onChange={onChange} nombre={nombre} correo={correo} password={password}/>
        <DataGrid
            style={{  width: '70vw' , backgroundColor: 'white'}}
            rows={productores}
            getRowId={(row)=>row.ID}
            columns={columns}
            pageSize={10}
            autoHeight={true}
            autoPageSize={true}   
        />
      <ModalEditar error={alerta} open={openEditar} handleClose={handleCloseEditar} handleEditar={handleEditarProductor} onChange={onChange} nombre={nombre} correo={correo} />
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
export default Productores