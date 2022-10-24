import { Box, Grid, Paper, Typography } from "@mui/material";
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
      <Grid    container spacing={4} >
            {cargando === false && contratos.length > 0 &&
            (
                contratos.map(({ID_CONTRATO,FECHA_INICIO,FECHA_TERMINO,SUELDO})=>(
                    <Grid item key={ID_CONTRATO}>
                        <ContenedorContrato elevation={6} >
                                <p># {ID_CONTRATO}</p>
                                <p>Fecha Inicio {new Date(FECHA_INICIO).toLocaleDateString()}</p>
                                <p>Fecha Termino {new Date(FECHA_TERMINO).toLocaleDateString()}</p>
                                <p>Sueldo: {Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
                        </ContenedorContrato>
                    </Grid>

                ))
            )}
      </Grid>

    </Container>
  );
};



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