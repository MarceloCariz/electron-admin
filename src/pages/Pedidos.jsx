import React, { useEffect, useRef, useState } from 'react'
import { activarSubasta, obtenerEnvios } from '../helpers/getAdmin'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import styled from 'styled-components'
import { Button, InputLabel, MenuItem, Select, Typography } from '@mui/material'

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [show, setShow] = useState(false);
    const [tiempo, setTiempo] = useState({minutos: 1, id: 0 })
    const idPedido = useRef();
    useEffect(() => {
        const cargarPedidos = async()=>{
            const resultado = await obtenerEnvios();
            setPedidos(resultado.sort())
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

    const submit = async(e) =>{
        e.preventDefault();
        const fecha = new Date(Date.now());
        const fecha2 = fecha.setMinutes(fecha.getMinutes() + Number(tiempo.minutos));
      // console.log(new Date(fecha2).toISOString())
        const fecha_activacion = new Date(fecha2).toISOString()
        const data = {referencia_compra: tiempo.id, fecha_activacion, activo: 'true'}
        await activarSubasta(data);
    }
  return (
    <Div>
        <Grid  alignItems={'start'}  container  spacing={1} gap={2}   marginTop={12}  xs={2} md={2} sm={12} >
        {pedidos.length > 0 ? 
        
            pedidos.map((ele, i)=>(
                <CardPedido  color={'black'} container direction="column" justifyContent="center" spacing={1} alignItems="center" gap={2}   xs={4} sm={4} md={2} key={ele[0].REFERENCIA_COMPRA}>
                    
                  <Typography variant='h6'>  Numero pedido{" "} <span className="text-black font-bold">#{ele[0].REFERENCIA_COMPRA}</span>{" "}</Typography>
                  
                  <Producto pendiente={ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'true' : ''}  variant='subtitle1'> 
                    {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? 'pendiente' : ele[0].ESTADO_ENVIO}
                  </Producto>

                  <Typography> {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) ? ele.filter((e)=>(e.ESTADO_ENVIO === 'pendiente' && e.ESTADO_ENVIO)).length + " pedidos" : ""}</Typography>
                  
                  <Button ref={idPedido} id={i} onClick={(e)=> onClick({i},e)}  variant='contained'>{show && Number(idPedido.current.id) === i ? 'cerrar' : 'ver'}</Button>
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

                  {show && Number(idPedido.current.id) === i && 
                     <Productos >

                        {ele.map((e, i)=>(
                            <div style={{display: 'flex' , alignItems: 'center', fontWeight: '800', gap:'4px'}} key={i}>
                                
                                {(e.ESTADO_ENVIO === 'pendiente' && <p>p</p> ) || (e.ESTADO_ENVIO === 'asignado' && <p>A</p>) || (e.ESTADO_ENVIO === 'bodega' && <p>B</p>)}
                                <Producto pendiente={e.ESTADO_ENVIO === 'pendiente' ? 'true' : 'false'} >{e.NOMBRE_PRODUCTO}</Producto>
                            </div>
                        ))}
                  </Productos>
                  }
                {ele.some(({ESTADO_ENVIO})=>(ESTADO_ENVIO === 'pendiente')) && (
                 <form action="" onSubmit={submit}>
                    <Button type="submit"  variant='contained' color='success'>Activar Subasta</Button>
                 </form> 

                )}


                </CardPedido>
            ))

        
        : 
        'no hay Pedidos'}
        
        
        </Grid>
    </Div>
  )
}
const Producto = styled(Typography)`
    background-color: ${props => props.pendiente === 'true' ?'#ffc400' : '#16A34A' } ;
    /* color: ${props => props.pendiente === 'true' ?'white' : '' } ; */
    color: white;
    font-weight: ${props => props.pendiente === 'true' ?'500' : '' } ;

    border-radius: 0px 10px 10px 0px;
    /* padding: 2px 2px; */
    padding-left: 5px;
    padding-right: 5px;
    
`;
const Productos = styled.div`
    height: 200px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 10px;

`
const CardPedido = styled(Grid2)`
    background-color: white;
    border-radius: 10px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;  
   margin: 0 auto;
  width: 90%;
`;

const Grid = styled(Grid2)`
    margin: 0 auto;
    text-transform: capitalize;
`;
export default Pedidos