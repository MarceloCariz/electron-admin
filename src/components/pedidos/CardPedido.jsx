import { Button, Typography,Box } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';

export const CardPedido = ({ele}) => {
    const [show, setShow] = useState(false);


    const onClick = () => {
        // console.log(e.i)
        setShow(!show);
      };
  return (
    <CardPedidoStyle  color={'black'}  direction="column" justifyContent="center" spacing={1} alignItems="center" gap={2}   xs={4} sm={4} md={2} key={ele[0].REFERENCIA_COMPRA}>
                    
    <Typography variant='h6'>  Numero pedido{" "} <span className="text-black font-bold">#{ele[0].REFERENCIA_COMPRA}</span>{" "}</Typography>
    <Typography > {ele[0].FECHA_COMPRA}</Typography>

    
    <TagEstado pendiente={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'true' : ''} 
                rechazado={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'RECHAZADO')) ? 'true' : ''}  variant='subtitle1'> 
      {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'pendiente' : ele[0].ESTADO_ENVIO}
    </TagEstado>

    <Typography> {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? ele.filter((e)=>(e.ESTADO_ENVIO === 'pendiente' && e.ESTADO_ENVIO)).length + " pedidos" : ""}</Typography>
    
    <Button onClick={onClick}  variant='contained'>{show  ? 'cerrar' : 'Ver Productos'}</Button>
    

    {show  && 
       <Productos >
          <Typography>Productos del pedido</Typography>
          {ele.map((e, i)=>(
              <div style={{display: 'flex' , alignItems: 'center', fontWeight: '800', gap:'4px'}} key={i}>
                  {(e.ESTADO_ENVIO === 'pendiente' && <p>p</p> ) || (e.ESTADO_ENVIO === 'asignado' && <p>A</p>) || (e.ESTADO_ENVIO === 'bodega' && <p>B</p>)}
                  <Producto pendiente={e.ESTADO_ENVIO} >{e.NOMBRE_PRODUCTO}</Producto>
              </div>
          ))}
      </Productos>
    }



  </CardPedidoStyle>
  );
}

const TagEstado = styled(Typography)`
background-color: ${props => props.pendiente === 'true' ?'#ffc400' : (props.rechazado === 'true'  ? 'red' :'#16A34A') } ;
/* color: ${props => props.pendiente === 'true' ?'white' : '' } ; */
color: white;
font-weight: ${props => props.pendiente === 'pendiente' ?'500' : '' } ;

border-radius: 0px 10px 10px 0px;
/* padding: 2px 2px; */
padding-left: 15px;
padding-right: 15px;

`;
const Producto = styled(Typography)`
    background-color: ${props => props.pendiente === 'pendiente' ?'#ffc400' : (props.pendiente === 'RECHAZADO' ? 'red' :'#16A34A') } ;
    /* color: ${props => props.pendiente === 'true' ?'white' : '' } ; */
    color: white;
    font-weight: ${props => props.pendiente === 'pendiente' ?'500' : '' } ;

    border-radius: 0px 10px 10px 0px;
    /* padding: 2px 2px; */
    padding-left: 15px;
    padding-right: 15px;
    
`;
const Productos = styled.div`
    height: auto;
    overflow-y: scroll;
    ::-webkit-scrollbar{
      display: none;
   };
    display: flex;
    flex-direction: column;
    gap: 10px;

`
const CardPedidoStyle = styled(Box)`
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    max-width: 500px;
`;