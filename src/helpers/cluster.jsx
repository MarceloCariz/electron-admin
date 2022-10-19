import { obtenerOrdCompra } from '../helpers/getAdmin'


const Tipo_Ventas = async () =>{
    try {
        const resultado = await obtenerOrdCompra();

        const Tipo_Ventas2 = resultado.tipoVenta;
    



        //const labels = Tipo_Ventas.map((c) => {return c.TIPO_VENTA}); 
        /** 
         
        console.log(Tipo_Ventas2)
        console.log(Tipo_Ventas2.length)
        console.log("-----------------------------------------")
        console.log(Tipo_Ventas2.map((c) => {return c.TIPO_VENTA}))
        console.log(Tipo_Ventas2.map((c) => {return c.CANTIDAD}))
        console.log("-----------------------------------------")
    */

    } catch (error) {

    }
}