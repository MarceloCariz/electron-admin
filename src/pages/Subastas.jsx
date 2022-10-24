import React, { useEffect, useRef, useState } from 'react'
import { activarSubasta, activarSubastaTransport, obtenerEnvios } from '../helpers/getAdmin'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import styled from 'styled-components'
import { Box, Button, CircularProgress, InputLabel, MenuItem, Select, Typography } from '@mui/material'

const Subastas = () => {
    const [pedidos, setPedidos] = useState([]);
    const [show, setShow] = useState(false);
    const [tiempo, setTiempo] = useState({minutos: 1, id: 0 })
    const [cargando, setCargando] = useState(false)
    const idPedido = useRef();
    useEffect(() => {
        const cargarPedidos = async()=>{
            setCargando(true);
            const resultado = await obtenerEnvios();
            const filtrado = resultado.map((ele)=>(ele.filter(({ESTADO_ENVIO,TIPO_VENTA})=>(TIPO_VENTA === 'externo' &&  (ESTADO_ENVIO ==='pendiente' ||  ESTADO_ENVIO ==='bodega') ))));
            const filtradoFinal = (filtrado.filter((ele)=>(ele.length > 0)));
            setPedidos(filtradoFinal)
            setCargando(false);

        }
        cargarPedidos();
    }, [])
    
    const onChange = (id,e) =>{
        setTiempo(e.target.value)
        setTiempo({minutos: e.target.value, id: id})
        console.log(id)
    }
    const onClick = (e) => {
        // console.log(e.i)
        idPedido.current.id = e.i;
        setShow(!show);
      };

    const submit = async(ele, e) =>{
        e.preventDefault();
        const fecha = new Date(Date.now());
        const fecha2 = fecha.setMinutes(fecha.getMinutes() + Number(tiempo.minutos));
      // console.log(new Date(fecha2).toISOString())
        const fecha_activacion = new Date(fecha2).toISOString()
        const data = {referencia_compra: tiempo.id, fecha_activacion, activo: 'true'}
        if(ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO ==='bodega'))){
          await activarSubastaTransport(data);
          // window.location.reload();
          return;
        }


        await activarSubasta(data);
        // window.location.reload();

    }

    // const verPedidosSubasta = () =>{


    // }
  return (
    <Div>
        <Typography variant='h4' sx={{textAlign:'center'}}>Subastas Disponibles</Typography>

        {cargando  && pedidos.length === 0 && 
            <CircularProgress color="inherit"/>
        }
        <Grid  alignItems={'start'} justifyContent={'space-between'}  container     marginTop={5}  xs={2} md={12} sm={12} >
        {pedidos.length > 0 ? 
        
            pedidos.map((ele, i)=>(
                <CardPedido  color={'black'}  direction="column" justifyContent="center" spacing={1} alignItems="center" gap={1}   xs={4} sm={4} md={2} key={ele[0].REFERENCIA_COMPRA}>
                    
                  <Typography variant='h6'>  Numero pedido{" "} <span className="text-black font-bold">#{ele[0].REFERENCIA_COMPRA}</span>{" "}</Typography>
                  <Typography > {ele[0].FECHA_COMPRA}</Typography>

                  
                  <TagEstado pendiente={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'true' : ''} 
                              rechazado={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'RECHAZADO')) ? 'true' : ''}  variant='subtitle1'> 
                    {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'pendiente' : ele[0].ESTADO_ENVIO}
                  </TagEstado>

                  <Typography> {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? ele.filter((e)=>(e.ESTADO_ENVIO === 'pendiente' && e.ESTADO_ENVIO)).length + " pedidos" : ""}</Typography>
                  
                  <Button ref={idPedido} id={i} onClick={(e)=> onClick({i},e)}  variant='contained'>{show && Number(idPedido.current.id) === i ? 'cerrar' : 'Ver Productos'}</Button>
                  
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
                          onChange={(e) => onChange(ele[0].REFERENCIA_COMPRA,e)}
                      >
                        <MenuItem value="seleccione" disabled>Seleccione</MenuItem>
                        <MenuItem value={"1" }>+1 minuto</MenuItem>
                        <MenuItem value="5">+5  minutos</MenuItem>
                        <MenuItem value="10">+10  minutos</MenuItem>
                    </Select>
                  {/* </>
            )} */}
                  {show && Number(idPedido.current.id) === i && 
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
                 <form action="" onSubmit={(e) => submit(ele,e)}>
                    <Button type="submit"  variant='contained' color='success'>
                      {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente'))? 'Activar subasta productor': 'Activar subasta transportista'}
                    </Button>
                 </form> 

                {/* // )} */}


                </CardPedido>
            ))

        
        : cargando ? '' : 'no hay Subastas'}
        
        
        </Grid>
    </Div>
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
align-items: center;
   gap: 2;
   margin: 0 auto;
   margin-top: 2rem;
  width: 90%;
`;

const Grid = styled(Grid2)`
    margin: 0 auto;
    text-transform: capitalize;
`;
export default Subastas