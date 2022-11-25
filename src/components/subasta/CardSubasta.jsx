import React, { useState } from 'react'
import styled from 'styled-components';
import { Alert, Box, Button, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { activarSubasta, activarSubastaTransport } from '../../helpers/getAdmin';

export const CardSubasta = ({ele, cargarPedidos}) => {
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [tiempo, setTiempo] = useState({minutos: 1 })
    const onChange = (e) =>{
        setTiempo(e.target.value)
        setTiempo({minutos: e.target.value})
        // console.log(id)
    }
    const onClick = (e) => {
        // console.log(e.i)
        setShow(!show);
      };

    const submit = async(ele, e) =>{
        e.preventDefault();
        const fecha = new Date(Date.now());
        const fecha2 = fecha.setMinutes(fecha.getMinutes() + Number(tiempo.minutos));
      // console.log(new Date(fecha2).toISOString())
        const fecha_activacion = new Date(fecha2).toISOString()
        const data = {referencia_compra: e.target.id, fecha_activacion, activo: 'true'};
        if(ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO ==='bodega'))){
        const alerta = await activarSubastaTransport(data);
        setMensaje(alerta.msg);
        setTimeout(() => {
            setMensaje('');
          }, 3000);
          // window.location.reload();
        return;
        }


        const respuesta = await activarSubasta(data);
        setMensaje(respuesta.msg);
        // window.location.reload();
        setTimeout(() => {
          setMensaje('');
        }, 3000);
        cargarPedidos();

    }
  return (
        <CardPedido  color={'black'}  direction="column" justifyContent="center" alignItems="center" gap={1}   xs={4} sm={4} md={6} >
                    {mensaje && <Alert variant='filled' color='success'>{mensaje}</Alert>}
                    <Typography variant='h6'>  Numero pedido{" "} <span className="text-black font-bold">#{ele[0].REFERENCIA_COMPRA}</span>{" "}</Typography>
                    <Typography > {ele[0].FECHA_COMPRA}</Typography>

                    
                    <TagEstado pendiente={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'true' : ''} 
                                rechazado={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'RECHAZADO')) ? 'true' : ''}  variant='subtitle1'> 
                        {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'pendiente' : ele[0].ESTADO_ENVIO}
                    </TagEstado>

                    <Typography> {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? ele.filter((e)=>(e.ESTADO_ENVIO === 'pendiente' && e.ESTADO_ENVIO)).length + " pedidos" : ""}</Typography>
                    
                    <Button  onClick={onClick}  variant='contained'>{show  ? 'cerrar' : 'Ver Productos'}</Button>
                    
                    {/* {ele.some(({ESTADO_ENVIO,TIPO_VENTA})=>(ESTADO_ENVIO === 'pendiente' || (ESTADO_ENVIO === 'bodega' && TIPO_VENTA === 'externo'))) &&
                    (
                        <> */}
                        <InputLabel id="demo-simple-select-label">Tiempo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id={`${ele[0].REFERENCIA_COMPRA}`}
                            label="tiempo"
                            defaultValue="seleccione"
                            // value={tiempo.id === ele[0].REFERENCIA_COMPRA ? tiempo.minutos : "seleccione"}
                            onChange={onChange}
                        >
                            <MenuItem value="seleccione" disabled>Seleccione</MenuItem>
                            <MenuItem value={"1" }>+1 minuto</MenuItem>
                            <MenuItem value="5">+5  minutos</MenuItem>
                            <MenuItem value="10">+10  minutos</MenuItem>
                        </Select>
                    {/* </>
                )} */}
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
                    {/* {ele.some(({ESTADO_ENVIO,TIPO_VENTA})=>(ESTADO_ENVIO === 'pendiente' || (ESTADO_ENVIO === 'bodega' && TIPO_VENTA === 'externo'))) && ( */}
                    <form id={ele[0].REFERENCIA_COMPRA} onSubmit={(e) => submit(ele,e)}>
                        <Button type="submit"  variant='contained' color='success'>
                        {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente'))? 'Activar subasta productor': 'Activar subasta transportista'}
                        </Button>
                    </form> 

                    {/* // )} */}


        </CardPedido>
  )
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
const CardPedido = styled(Box)`
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    max-width: 500px;
`;