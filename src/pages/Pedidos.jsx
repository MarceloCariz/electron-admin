import React, { useEffect,  useState } from 'react'
import {obtenerEnvios } from '../helpers/getAdmin'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import styled from 'styled-components'
import {  CircularProgress, Typography } from '@mui/material'
import { CardPedido } from '../components/pedidos/CardPedido'
// import { Spinnner } from '../components/ui/Spinnner'

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(false);
    useEffect(() => {
        const cargarPedidos = async()=>{
          setCargando(true);
          const resultado = await obtenerEnvios();
          setPedidos(resultado);
          setCargando(false);

        }
        cargarPedidos();
    }, []);
    
    
  return (
    <Div>
        <Typography variant='h4' sx={{textAlign:'center'}}>Pedidos</Typography>
        {cargando  && pedidos.length === 0 && 
            <CircularProgress color="inherit"/>
        }
        <Grid  alignItems={'start'}  container  spacing={1} gap={2}   marginTop={5}  xs={2} md={2} sm={12} >
        {pedidos.length > 0 ? 
        
            pedidos.map((ele, i)=>(
              <CardPedido ele={ele}/>
            ))

        
        :  
        cargando ? '' : 'no hay pedidos'
        }
        
        
        </Grid>
    </Div>
  )
}



const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top:2rem;
  width: 90%;
`;

const Grid = styled(Grid2)`
    margin: 0 auto;
    text-transform: capitalize;
    display: flex;

`;
export default Pedidos