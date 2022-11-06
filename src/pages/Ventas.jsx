import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { faBookBookmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
//Librerias
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import maipo from '../pages/img/maipo.PNG';
//Graficos
import PieChart_TipoVenta from '../components/Charts/PieChart_TipoVenta';
import DoughnutChart_TipoPago from '../components/Charts/DoughnutChart_TipoPago';
import LineChart_CompraXdia from '../components/Charts/LineChart_CompraXdia';
import BarChart_stockProd from '../components/Charts/BarChart_stockProd';
import LineChart_CompraXmes from '../components/Charts/LineChart_CompraXmes';

//sandbox Import
import { obtenerOrdCompra } from '../helpers/getAdmin'
import { Box, Typography } from '@mui/material';



function Ventas() {
  const navigate = useNavigate();
  const [OrdCompra, setOrdCompra] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token") === "" ) {
      navigate('/')
    }  
    const cargarOrdCompra = async()=>{
      const resultado = await obtenerOrdCompra();
      setOrdCompra(resultado);  
    }

    cargarOrdCompra();
  })


  const  generarReporte = () =>{
    const doc = new jsPDF('p','mm','a3' );
    const datosStock = OrdCompra.stockProductosNombre
    const datoscomprames = OrdCompra.comprasPorMes
    const datosestadopago = OrdCompra.estadoPago
    const datoscomprapordia = OrdCompra.comprasPorDia
    const datosventa = OrdCompra.tipoVenta

    var columnstock = [["Nombre producto", "total de producto",]];
    const datosStocktable = datosStock.map((element,)  => (
    [element.NOMBRE, element.TOTAL,]));    

    var columncompra = [["Mes", "Compras",]];
    const datoscompra = datoscomprames.map((element,)  => (
    [element.MES, element.TOTAL_COMPRAS,])); 
 
    var columnestado = [["Estado Pago", "Cantidad", ]];
    const datospago = datosestadopago.map((element,)  => (
    [element.ESTADO_PAGO, element.CANTIDAD,])); 

    var columndia = [["Estado Dias", "Total de compras", ]];
    const datocompra = datoscomprapordia.map((element,)  => (
    [element.DIA, element.TOTAL_COMPRAS,]));

    var columntipoven = [["Tipo de venta", "Cantidad", ]];
    const datostipoven = datosventa.map((element,)  => (
    [element.TIPO_VENTA, element.CANTIDAD,]));  
    // info.push([ ...element])});      
      // 1 - x 200  /////  2- y

      doc.setFontSize(50);
      doc.addImage(maipo, 'PNG', 0, 0,100,0, undefined, false);
      doc.text(`Reporte General`,80, 50);
   
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 75  },
           head: columntipoven,
           body: datostipoven
        
          } );

          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 20  },
               head: columnestado,
               body: datospago
            
              } );

          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 30  },
               head: columndia,
               body: datocompra
            
              } );

                doc.autoTable({
                  theme: 'striped',
                     columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
                     margin: { top: 40  },
                     head: columncompra,
                     body: datoscompra
                    } );

          doc.autoTable({
            theme: 'striped',
               columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
               margin: { top: 50  },
               head: columnstock,
               body: datosStocktable
            
              } );
             

       
      doc.save('Reporte de venta');
    }

 


    return (

      
      <Box justifyContent={'center'} textAlign={'center'} >

        <Typography variant='h3' sx={{marginBottom: 1}}>Ventas</Typography>
        <Boton sx={{marginBottom: 2}} onClick={generarReporte} variant='contained' >
          <FontAwesomeIcon icon={faBookBookmark}/>
          DESCARGAR REPORTE       
        </Boton>
        <Grilla container spacing={3}>
          <Grid xs="auto">
            <Grafics>
              <DoughnutChart_TipoPago estadoPago={OrdCompra.estadoPago} />
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics>
              <PieChart_TipoVenta tipoVenta={OrdCompra.tipoVenta}/>
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics >
              <LineChart_CompraXdia comprasPorDia={OrdCompra.comprasPorDia}/>
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics >
              <BarChart_stockProd stockProductosNombre={OrdCompra.stockProductosNombre}/>
            </Grafics>
          </Grid>
          <Grid xs="auto">
            <Grafics>
              <LineChart_CompraXmes comprasPorMes={OrdCompra.comprasPorMes}/>
            </Grafics>
          </Grid>
        </Grilla>
      </Box>
     
    )
}

const Grafics = styled(Paper)`
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px 10px;
    /* max-width: 110%; */
`;

const Grilla = styled(Grid)`
  padding-left: 1rem;
  align-content: flex-start;
`;
const Boton = styled(Button)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 10px;
  `;

export default Ventas
