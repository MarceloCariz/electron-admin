import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';



//Graficos
import PieChart_TipoVenta from '../components/Charts/PieChart_TipoVenta';
import DoughnutChart_TipoPago from '../components/Charts/DoughnutChart_TipoPago';
import LineChart_CompraXdia from '../components/Charts/LineChart_CompraXdia';
import BarChart_stockProd from '../components/Charts/BarChart_stockProd';
import LineChart_CompraXmes from '../components/Charts/LineChart_CompraXmes';

//sandbox Import
import { obtenerOrdCompra } from '../helpers/getAdmin'
import { Box, Typography } from '@mui/material';



function Ventas() {
  const navigate = useNavigate();
  const [OrdCompra, setOrdCompra] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === "" ) {
      navigate('/')
    }  
    const cargarOrdCompra = async()=>{
      const resultado = await obtenerOrdCompra();
      setOrdCompra(resultado);  
    }

    cargarOrdCompra();
  })




 


    return (
      <Box justifyContent={'center'} textAlign={'center'} >
        <Typography variant='h3' sx={{marginBottom: 5}}>Ventas</Typography>
        <Grilla container spacing={3}>
          <Grid xs="auto">
            <Grafics>
              <DoughnutChart_TipoPago estadoPago={OrdCompra.estadoPago} />
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics>
              <PieChart_TipoVenta tipoVenta={OrdCompra.tipoVenta}/>
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics >
              <LineChart_CompraXdia comprasPorDia={OrdCompra.comprasPorDia}/>
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics >
              <BarChart_stockProd stockProductosNombre={OrdCompra.stockProductosNombre}/>
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics>
              <LineChart_CompraXmes comprasPorMes={OrdCompra.comprasPorMes}/>
            </Grafics>
          </Grid>
        </Grilla>
      </Box>
    )
}

const Grafics = styled(Paper)`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    /* max-width: 110%; */
`;

const Grilla = styled(Grid)`
  padding-left: 1rem;
  align-content: flex-start;
`;


export default Ventas
