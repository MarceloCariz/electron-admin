import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios';

import {  faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
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


function Ventas() {
    const navigate = useNavigate();
    const [OrdCompra, setOrdCompra] = useState([]);
    let URL = 'http://168.138.133.24:4000/api/admin/envios/graficos/datos'

    useEffect(() => {
      if (localStorage.getItem("token") === "" ) {
        navigate('/')
      }

      cargarOrdCompra();
    })

    
    const cargarOrdCompra = async()=>{
      const resultado = await obtenerOrdCompra();
      setOrdCompra(resultado);
  }
    
    const [userData, setUserData] = useState({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "a",
          data: UserData.map((data) => data.userGain),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }); 
    

  const handleReset = async() =>{
    const resultado = await obtenerOrdCompra();
    const Tipo_Ventas = resultado.tipoVenta;

     
    console.log(Tipo_Ventas)
    console.log(Tipo_Ventas.length)
    console.log("-----------------------------------------")
    console.log(Tipo_Ventas.map((c) => {return c.TIPO_VENTA}))
    console.log(Tipo_Ventas.map((c) => {return c.CANTIDAD}))
    console.log("-----------------------------------------")







    //console.log(OrdCompra)
    //console.log("-----------------------------------------")

    //const Tipo_Venta = OrdCompra.tipoVenta[1].TIPO_VENTA; 
    //const Cantidades = OrdCompra.tipoVenta[1].CANTIDAD;
    //console.log(Tipo_Venta + ": " + Cantidades)

    //
    //
    //console.log("-----------------------------------------")
    //console.log(registLog2.CANTIDAD )
    //console.log("-----------------------------------------")
    //console.log(OrdCompra.tipoVenta[1])
    //console.log("-----------------------------------------")
    //console.log(OrdCompra.tipoVenta[1].TIPO_VENTA)
    //console.log(OrdCompra.tipoVenta[1].CANTIDAD)

  }








    
    
  
    return (
      <Container>
        <Titulo>Ventas</Titulo>
        <Boton onClick={handleReset} variant='contained'>
          <FontAwesomeIcon icon={faUserPlus}/>
          Response Log
        </Boton>

        <div style={{ width: 700 }}>
            <PieChart chartData={userData} />
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
