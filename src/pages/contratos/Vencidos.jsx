import { Box, Button, Grid, InputLabel, MenuItem, Paper, Select, CircularProgress, Typography, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {  renovarContrato } from "../../helpers/getAdmin";
import useConsultas from "../../hooks/useConsultas";

export const Vencidos = () => {
    const [mensaje, setMensaje] = useState({error: false, msg:''});

    const [tiempo, setTiempo] = useState({mes: 0, id: 0 })

    const {cargarContratos, cargando, contratosActivos:contratos} = useConsultas();
    useEffect(() => {


        cargarContratos();
    }, []);

    const onChange = (id,e) =>{
        // setTiempo(e.target.value)
        setTiempo({mes: Number(e.target.value), id: id})
    }

    const handleRenovarContrato = async() =>{
        if(tiempo.mes === 0) return setMensaje({error: true, msg:"Seleccione un tiempo valido"});
        const fechaActual = new Date(Date.now())
        const contratoInfo = {
            id_contrato: tiempo.id,
            fecha_inicio: fechaActual.toISOString(),
            fecha_termino: new Date(fechaActual.setMonth(fechaActual.getMonth() + tiempo.mes)).toISOString()
        }

        const respuesta = await renovarContrato(contratoInfo);
        console.log(respuesta)
        setMensaje({error: false, mensaje: respuesta});
        setTimeout(() => {
            cargarContratos();     
        }, 2000);
    }


  return (
    <Container>
      <Typography variant="h4" >Solicitudes Renovación Contratos</Typography>
      
        {cargando && contratos.length === 0 && 
            <CircularProgress color="inherit"/>
        }
      <Grid    container spacing={4} >
            {cargando === false && contratos.length > 0 &&
            (
                contratos.map(({ID_CONTRATO,FECHA_INICIO,FECHA_TERMINO,SUELDO})=>(
                    <Grid item key={ID_CONTRATO} >
                        {mensaje.msg && <Alert variant="filled" color={mensaje.error ? "error" : "success"}>{mensaje.msg}</Alert>}
                        <ContenedorContrato elevation={6} >
                                <p># {ID_CONTRATO}</p>
                                <p>Fecha Inicio {new Date(FECHA_INICIO).toLocaleDateString()}</p>
                                <p>Fecha Termino {new Date(FECHA_TERMINO).toLocaleDateString()}</p>
                                <p>Sueldo: {Number(SUELDO).toLocaleString("es-CL", {style: "currency", currency:"CLP"})}</p>
                                <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id={`${ID_CONTRATO}`}
                                    label="tiempo"
                                    defaultValue="seleccione"
                                    // value={tiempo.id === ele[0].REFERENCIA_COMPRA ? tiempo.minutos : "seleccione"}
                                    onChange={(e) => onChange(ID_CONTRATO,e)}
                                >
                                    <MenuItem value="seleccione" disabled>Seleccione</MenuItem>
                                    <MenuItem value={"1" }>+1 mes</MenuItem>
                                    <MenuItem value="5">+5  meses</MenuItem>
                                    <MenuItem value="10">+10  meses</MenuItem>
                                </Select>
                                <Button onClick={handleRenovarContrato} style={{marginTop: 10}} variant="contained">Renovar</Button>
                        </ContenedorContrato>
                    </Grid>

                ))
            )}
      </Grid>

    </Container>
  )
}

const ContenedorContrato = styled(Paper)`
    display: flex;
    flex-direction: column;
    /* gap: 2; */
    padding: 10px 10px 10px 10px;
    /* max-width: 500px; */
    /* height: 200px; */
`;



const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* align-items: center; */
    margin-top: 2rem;
    width: 90%;
`
