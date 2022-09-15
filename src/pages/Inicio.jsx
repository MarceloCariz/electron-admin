import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import grafico from './img/grafico.jpg'
const Inicio = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == "" ) {
      navigate('/')
    }
  })

  return (
    <Container>
        <Titulo>Inicio</Titulo>
        <Img src={grafico} alt="" />
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
color: white;
text-align:center;
`;

export default Inicio