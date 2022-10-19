import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { obtenerOrdCompra } from '../helpers/getAdmin';

import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
//Graficos
import PieChart from "../components/Charts/PieChart";

const Ventas = () => {

    
  const handleReset = async() =>{
    const resultado = await obtenerOrdCompra();

    const Tipo_Ventas3 = resultado.tipoVenta;  
    //const labels = Tipo_Ventas.map((c) => {return c.TIPO_VENTA}); 


     
    console.log(Tipo_Ventas3)
    console.log(Tipo_Ventas3.length)
    console.log("-----------------------------------------")
    console.log(Tipo_Ventas3.map((c) => {return c.TIPO_VENTA}))
    console.log(Tipo_Ventas3.map((c) => {return c.CANTIDAD}))
    console.log("-----------------------------------------")







    //console.log(OrdCompra)
    //console.log("-----------------------------------------")

    //const Tipo_Venta = OrdCompra.tipoVenta[1].TIPO_VENTA; 
    //const Cantidades = OrdCompra.tipoVenta[1].CANTIDAD;
    //console.log(Tipo_Venta + ": " + Cantidades)

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