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
import { generarReportes, obtenerOrdCompra } from '../helpers/getAdmin'
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
  const  Tipocliente = async() =>{

    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosventa = OrdCompra.tipoVenta

    var columntipoven = [["Tipo de venta", "Cantidad", ]];
    const datostipoven = datosventa.map((element,)  => (
    [element.TIPO_VENTA, element.CANTIDAD,]));    

  
      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
      doc.setFontSize(30);
      doc.text(`Tipo de venta`,60, 65).setFontSize(10);
    
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 75  },
           head: columntipoven,
           body: datostipoven
        
          } );
          const blob = doc.output("blob");
          const pdfGenerado = new File([blob], `admin_tipo_venta_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
          await generarReportes({tipoVenta:OrdCompra.tipoVenta, pdfGenerado})

      doc.save(`admin_tipo_venta_${fecha}`);
    }

  const  Comprapormes = async() =>{
    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datoscomprames = OrdCompra.comprasPorMes

    var columncompra = [["compras", "mes ",]];
    const datoscompra = datoscomprames.map((element,)  => (
    [element.TOTAL_COMPRAS, element.MES,]));  

  
      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
      doc.setFontSize(30);
      doc.text(`Compra hecha por mes`,50, 65).setFontSize(10);
    
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 80  },
           head: columncompra,
           body: datoscompra
          } );
          const blob = doc.output("blob");
          const pdfGenerado = new File([blob], `admin_compra_mes_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
          await generarReportes({comprasPorMes:OrdCompra.comprasPorMes, pdfGenerado})
          doc.save(`admin_compra_mes_${fecha}`);
    }

  const  Estadopago = async() =>{

    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosestadopago = OrdCompra.estadoPago

    var columnestado = [["Estado Pago", "Cantidad", ]];
    const datospago = datosestadopago.map((element,)  => (
    [element.ESTADO_PAGO, element.CANTIDAD,])); 


  
      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
      doc.setFontSize(30);
      doc.text(`Estado de pedidos`,50, 65).setFontSize(10);
    
      doc.autoTable({
        theme: 'striped',
            columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
            margin: { top: 70  },
            head: columnestado,
            body: datospago
        
          } );
          const blob = doc.output("blob");
          const pdfGenerado = new File([blob], `admin_estado_pago_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
          await generarReportes({estadoPago:OrdCompra.estadoPago, pdfGenerado})
      doc.save(`admin_estado_pago_${fecha}`);
    }



 const  pdfdatosstock = async() =>{

    const fecha =new Date().toLocaleDateString();
    const doc = new jsPDF('p','mm','a4' );
    const datosStock = OrdCompra.stockProductosNombre
 
    var columnstock = [["Nombre producto", "total de producto",]];
    const datosStocktable = datosStock.map((element,)  => (
    [element.NOMBRE, element.TOTAL,]));    


      // 1 - x 200  /////  2- y
      doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
      doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
      doc.setFontSize(30);
      doc.text(`Stock Disponible`,55, 45).setFontSize(10);
    
   
      doc.autoTable({
        theme: 'striped',
           columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
           margin: { top: 50  },
           head: columnstock,
           body: datosStocktable
          } );
          const blob = doc.output("blob");
          const pdfGenerado = new File([blob], `admin_stock_prod_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
          await generarReportes({stockProductosNombre:OrdCompra.stockProductosNombre, pdfGenerado})
      doc.save(`Venta de productos ${fecha}`);
    }

 const  Comprapordia = async() =>{
      const fecha =new Date().toLocaleDateString();
      const doc = new jsPDF('p','mm','a4' );
      const datoscomprapordia = OrdCompra.comprasPorDia
      var columndia = [["Estado Dias", "Total de compras", ]];
    const datocompra = datoscomprapordia.map((element,)  => (
    [element.DIA, element.TOTAL_COMPRAS,]));

  
    
        // 1 - x 200  /////  2- y
        doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
        doc.text(`Fecha de creacion: ${fecha}`, 130, 7).setFontSize(25);
        doc.setFontSize(30);
        doc.text(`Compras por dias`,50, 65).setFontSize(10);
      
        doc.autoTable({
          theme: 'striped',
             columnStyles: { 0: { halign: 'left',valign: 'middle', } }, 
             margin: { top: 80  },
             head: columndia,
             body: datocompra
          
            } );
            const blob = doc.output("blob");
            const pdfGenerado = new File([blob], `admin_compras_dia_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
            await generarReportes({comprasPorDia:OrdCompra.comprasPorDia, pdfGenerado})

        doc.save(`Compras por dias${fecha}`); 
      }

  const  generarReporte = async() =>{
    const fecha =new Date().toLocaleDateString();
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
      const blob = doc.output("blob");
      const pdfGenerado = new File([blob], `admin_general_${fecha.replace( new RegExp('/','g'), '_')}.pdf`, {type: 'application/pdf' } );
      await generarReportes({...OrdCompra, pdfGenerado});
      doc.save(`reporte_general_admin${fecha}`);
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
            <Boton sx={{marginBottom: 2}} onClick={Estadopago} variant='contained' >
          <FontAwesomeIcon icon={faBookBookmark}/>
          DESCARGAR REPORTE       
        </Boton>
          </Grid>
          <Grid xs="auto">
            <Grafics>
              <PieChart_TipoVenta tipoVenta={OrdCompra.tipoVenta}/>
            </Grafics>
            <Boton sx={{marginBottom: 2}} onClick={Tipocliente} variant='contained' >
          <FontAwesomeIcon icon={faBookBookmark}/>
          DESCARGAR REPORTE       
        </Boton>
          </Grid>
          <Grid xs="auto">
            <Grafics >
              <LineChart_CompraXdia comprasPorDia={OrdCompra.comprasPorDia}/>
            </Grafics>
            <Boton sx={{marginBottom: 2}} onClick={Comprapordia} variant='contained' >
          <FontAwesomeIcon icon={faBookBookmark}/>
          DESCARGAR REPORTE       
        </Boton>
          </Grid>
          <Grid xs="auto">
            <Grafics >
              <BarChart_stockProd stockProductosNombre={OrdCompra.stockProductosNombre}/>
            </Grafics>
            <Boton sx={{marginBottom: 2}} onClick={pdfdatosstock} variant='contained' >
          <FontAwesomeIcon icon={faBookBookmark}/>
          DESCARGAR REPORTE       
        </Boton>
          </Grid>
          <Grid xs="auto">
            <Grafics>
              <LineChart_CompraXmes comprasPorMes={OrdCompra.comprasPorMes}/>
            </Grafics>
            <Boton sx={{marginBottom: 2}} onClick={Comprapormes} variant='contained' >
          <FontAwesomeIcon icon={faBookBookmark}/>
          DESCARGAR REPORTE       
        </Boton>
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
