import { Download } from '@mui/icons-material';
import { Box,  Button,  Grid, Typography } from '@mui/material'
import { useState } from 'react';
import styled from 'styled-components';
import { generarPdf } from '../../utils/reportesPdf';
import { ModalReporte } from './ModalReporte';

export const CardReporte = ({ID_REPORTE, AUTOR, DESCRIPCION, FECHA, TIPO_REPORTE}) => {
    const [show, setShow] = useState(false);

    const generarReporte = () =>{
      console.log(TIPO_REPORTE);
      generarPdf({ID_REPORTE, AUTOR, DESCRIPCION, FECHA, TIPO_REPORTE})
    }
  return (
    <Grid item   >
        <CardReportestyle >
                <Typography variant='h6'>Reporte n°{ID_REPORTE}</Typography>
                <Typography variant="subtitle1" gutterBottom >Autor: {AUTOR}</Typography >
                <Typography variant="subtitle1" gutterBottom >Fecha del reporte: {FECHA}</Typography >
                <Typography sx={{display: 'flex', flexDirection: 'column'}}
                 variant="subtitle1" gutterBottom >Tipo de Reporte: <Typography variant="button"  >{TIPO_REPORTE}</Typography> </Typography >

                <Button variant='contained' onClick={()=>setShow(!show)} >{show ? "Ocultar descripción" : "Ver descripción"}</Button>
                    {/* // <Typography  >Descripción: <span className=' '>{DESCRIPCION}</span></Typography > */}
                <ModalReporte show={show} setShow={setShow} descripcion={DESCRIPCION} id={ID_REPORTE}/>
                <Button variant='contained' color='secondary' startIcon={<Download/>} sx={{marginTop: '10px'}} onClick={generarReporte} >Descargar PDF</Button>

                    {/* // <ModalReporte ID={ID_REPORTE} setShow={setShow} descripcion={DESCRIPCION} tipo={TIPO_REPORTE}/> */}
        </CardReportestyle>

    </Grid>
  )
}


const CardReportestyle = styled(Box)`
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    /* max-width: 500px; */
    width: 190px;
    /* height: 200px; */
    min-height: 200px;
`;