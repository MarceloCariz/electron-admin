import React, { useEffect} from 'react'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import styled from 'styled-components'
import {  CircularProgress,  Typography } from '@mui/material'
import useConsultas from '../hooks/useConsultas'
import { CardSubasta } from '../components/subasta/CardSubasta'

const Subastas = () => {

    const {cargarPedidos, cargando, pedidos} = useConsultas();
    // const idPedido = useRef();
    useEffect(() => {

        cargarPedidos();
    }, [])
    


    // const verPedidosSubasta = () =>{


    // }
  return (
    <Div>
        <Typography variant='h4' sx={{textAlign:'center'}}>Subastas Disponibles</Typography>

        {cargando  && pedidos.length === 0 && 
            <CircularProgress color="inherit"/>
        }
        <Grid    container    marginTop={5} gap={4}  xs={12} md={4} sm={12} >
        {pedidos.length > 0 ? 
        
            pedidos.map((ele)=>(
                <CardSubasta key={ele[0].REFERENCIA_COMPRA} ele={ele}  cargarPedidos={cargarPedidos}/>
            ))

        
        : cargando ? '' : 'no hay Subastas'}
        
        
        </Grid>
    </Div>
  )
}



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