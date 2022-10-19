import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';

//Graficos
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import DoughnutChart from '../components/Charts/DoughnutChart';

//sandbox Import
import { UserData } from "../Data";
import { obtenerOrdCompra } from '../helpers/getAdmin'
import { configTV, configTP } from '../components/Charts/Cluster' 


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
      <Container>
        <Titulo>Ventas</Titulo>
        <Boton onClick={handleReset} variant='contained'>
          <FontAwesomeIcon icon={faUserPlus}/>
          Response Log
        </Boton>
 
        <div style={{ width: 700 }}>
            <PieChart chartData={config} />
        </div>
{/**
        <div style={{ width: 700 }}>
            <PieChart chartData={configTV} />
        </div>
*/}
        <div style={{ width: 700 }}>
            <PieChart chartData={configTP} />
        </div>

      </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Img = styled.img`
    object-fit: contain;
    width: 80%;
`
const Titulo = styled.h1`
color: black;
text-align:center;
`;

const Boton = styled(Button)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 10px;
`
export default Ventas
