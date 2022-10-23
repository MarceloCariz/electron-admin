import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, InputLabel, MenuItem, Select, Typography } from '@mui/material'

//Graficos
import PieChart_TipoVenta from '../components/Charts/PieChart_TipoVenta';
import DoughnutChart_TipoPago from '../components/Charts/DoughnutChart_TipoPago';
import LineChart_CompraXdia from '../components/Charts/LineChart_CompraXdia';
import BarChart_stockProd from '../components/Charts/BarChart_stockProd';
import LineChart_CompraXmes from '../components/Charts/LineChart_CompraXmes';

//sandbox Import
import { obtenerOrdCompra } from '../helpers/getAdmin'

const Item = styled(Paper)(() => ({
  textAlign: 'center',
}));

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

  const handleReset = async() =>{
    console.log(OrdCompra)
  }

  var LabelS = OrdCompra?.tipoVenta?.map(function(e) {
    return e.TIPO_VENTA;
  });
  var DataS = OrdCompra?.tipoVenta?.map(function(e) {
    return e.CANTIDAD;
  });
  const config = {
    labels: LabelS,
    datasets: [
      {
        label: 'EXAMPLE TITLE',
        data: DataS,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


    return (
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
          <Grafics>
            <LineChart_CompraXdia comprasPorDia={OrdCompra.comprasPorDia} />
          </Grafics>
        </Grid>
        <Grid xs="auto">
          <Grafics>
            <BarChart_stockProd stockProductosNombre={OrdCompra.stockProductosNombre} />
          </Grafics>
        </Grid>
        <Grid xs="auto">
          <Grafics>
            <LineChart_CompraXmes comprasPorMes={OrdCompra.comprasPorMes} />
          </Grafics>
        </Grid>
      </Grilla>
    )
}

const Grafics = styled(Paper)`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    max-width: 100%;
`;

const Grilla = styled(Grid)`
  padding-left: 1rem;
`;




export default Ventas
