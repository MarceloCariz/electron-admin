import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material"; 
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { obtenerContratos } from "../../helpers/getAdmin";

export const Activos = () => {
    const [contratos, setContratos] = useState([])
    const [cargando, setCargando] = useState(false)
    useEffect(() => {
        const cargarContratos = async () =>{
            setCargando(true)
            const respuesta = await obtenerContratos();
            const activos = respuesta.filter(({ESTADO})=>(ESTADO === 'TRUE'));
            setContratos(activos);
            setCargando(false)
        }

        cargarContratos();
    }, [])
    
  return (
    <Container>
      <Typography variant="h4" >Contratos Activos</Typography>
        {cargando && contratos.length === 0 && 
            <CircularProgress color="inherit"/>
        }
      <Grid    container spacing={4} >
            {cargando === false && contratos.length > 0 &&
            (
                contratos.map(({ID_CONTRATO,FECHA_INICIO,FECHA_TERMINO,SUELDO})=>(
                    <Grid item key={ID_CONTRATO}>
                        <ContenedorContrato elevation={6} >
                                <P># {ID_CONTRATO}</P>
                                <P>Fecha Inicio {new Date(FECHA_INICIO).toLocaleDateString()}</P>
                                <P>Fecha Termino {new Date(FECHA_TERMINO).toLocaleDateString()}</P>
                                <P>Sueldo: {Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</P>
                        </ContenedorContrato>
                    </Grid>
                ))
            )}
      </Grid>

    </Container>
  );
};


const P = styled.p`
    font-weight: 800;
`


const ContenedorContrato = styled(Paper)`
    display: flex;
    flex-direction: column;
    gap: 2;
    padding: 10px 10px 10px 10px;
    max-width: 500px;
    height: 200px;
`;



const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* align-items: center; */
    margin-top: 2rem;
    width: 90%;
`