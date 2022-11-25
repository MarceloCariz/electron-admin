
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useConsultas from '../../hooks/useConsultas'; 


export const Activos = () => {

    const {cargarContratos, cargando, contratos} = useConsultas();
    const [formValues, setFormValues] = useState({ID_CONTRATO: '', FECHA_INICIO: '', FECHA_TERMINO: '', SUELDO: contratos.reduce((total, a)=>( Number(a.SUELDO) + total),0)});
    const navigate = useNavigate();
    const mostrarGanancias = () =>{
        const total = contratos.reduce((total, a)=>( Number(a.SUELDO) + total),0);
        return total.toLocaleString("es-CL", {style: "currency", currency:"CLP"});
    }
    useEffect(() => {

        cargarContratos();
    }, [])

    const {ID_CONTRATO, FECHA_INICIO, FECHA_TERMINO, SUELDO} = formValues
  useEffect(() => {
      if (localStorage.getItem("token") === "" ) {
        navigate('/')
      }

  
      cargarContratos();
    },[] )


    const columns =[
      { field: 'ID_CONTRATO', headerName: 'ID', flex:1, minWidth: 150 , renderCell: (params) => <p> {params.row.ID_CONTRATO} </p>},
      { field: 'FECHA_INICIO', headerName: 'Fecha Inicio', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.FECHA_INICIO}</>},
      { field: 'FECHA_TERMINO', headerName: 'Fecha Termino', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.FECHA_TERMINO}</>},
      { field: 'SUELDO', headerName: 'Sueldo', flex:1 , minWidth: 150 , renderCell: (params) => <>{params.row.SUELDO}</>}
      ];
      
    
      return (
        <>
        <div>
            {/* -------------------FORM------------------------ */}
            <DataGrid
                style={{  width: '70vw' , backgroundColor: 'white'}}
                rows={contratos}
                getRowId={(row)=>row.ID_CONTRATO}
                columns={columns}
                pageSize={8}
                autoHeight={true}
                autoPageSize={true}
                
                
            />
            
            
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
    export default Activos