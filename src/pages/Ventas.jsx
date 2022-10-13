import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import grafico from './img/grafico.jpg'

import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
//sandbox Import
import { UserData } from "../Data";
import { activarSubasta, activarSubastaTransport, obtenerEnvios } from '../helpers/getAdmin'


function Ventas() {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
  
    useEffect(() => {
      if (localStorage.getItem("token") === "" ) {
        navigate('/')
      }

      const cargarPedidos = async()=>{
          const resultado = await obtenerEnvios();
          setPedidos(resultado.sort())
          //console.log(resultado.sort())
      }
      cargarPedidos()
    })
    
    //console.log(pedidos[0][0])



    const [userData, setUserData] = useState({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "Users Gained",
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

    
    
  
    return (
      <Container>
        <Titulo>Ventas</Titulo>
        <div style={{ width: 700 }}>
            <BarChart chartData={userData} />
        </div>
        <div style={{ width: 700 }}>
            <LineChart chartData={userData} />
        </div>
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

export default Ventas