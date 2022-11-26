import clienteAxios from "../axios"
import { sortBy } from "../utils/sortByDate";


// <---------------------------- admin ---------------------------->

export const login = async (datos) =>{
    try {
        const {data} = await clienteAxios.post('/usuario/login',{...datos, rol: 'administrador'});
        return data;
    } catch (error) {
        console.log(error)
    }
}

// <------------------------- productores ------------------------->

export const agregarProductor = async(productor) =>{
    const {nombre, correo, password} = productor;
    const {data} = await clienteAxios.post('/productores/nuevo',{nombre, correo, password});
    return data

}

export const obtenerProductores = async()=>{
    try {
        const {data} = await clienteAxios('/productores');
        return data
    } catch (error) {
        console.log(error)
    }

}

export const editarProductores = async(datos)=>{
    try {
        await clienteAxios.put(`/admin/productor/actualizar/${datos.id}`, {nombre: datos.nombre, correo: datos.correo})

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Put | Act: editarProductores")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

export const borrarProductores = async(clienteID)=>{
    try {
        await clienteAxios.delete(`/admin/productor/eliminar/${ clienteID.toString() }`)

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Del | Act: borrarProductores")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}


// <------------------------ transportistas ------------------------>


export const agregarTransportistas = async(transportista) =>{
    const {nombre, correo, password} = transportista;
    const {data} = await clienteAxios.post('/transportista/registrar',{nombre, correo, password});
    return data

}

export const obtenerTransportistas = async()=>{
    try {
        const {data} = await clienteAxios('transportista/');
        return data
    } catch (error) {
        console.log(error)
    }

}

export const editarTransportistas = async(datos)=>{
    console.log(datos)
    try {
       const {data} =  await clienteAxios.put(`/admin/transportista/actualizar/${datos.id}`, {nombre: datos.nombre, correo: datos.correo})
       return data
    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Put | Act: editarTransportistas")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

export const borrarTransportistas = async(clienteID)=>{
    try {
        await clienteAxios.delete(`/admin/transportista/eliminar/${ clienteID.toString() }`)

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Del | Act: borrarTransportistas")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

// <--------------------------- clientes --------------------------->

export const agregarClientes = async(clientes) =>{
    try {
        const {data} = await clienteAxios.post('/clientes/nuevo', clientes);
        return data
    } catch (error) {
        console.log(error)
    }
}

export const obtenerClientes = async()=>{
    try {
        const {data} = await clienteAxios('/clientes');
        return data
    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Get | Act: obtenerClientes")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

export const editarClientes = async(datos)=>{
    console.log(datos)
    try {
        //await clienteAxios.put(`/admin/cliente/actualizar/${ clienteID.toString() }`, datos)
        //.then( res => console.log("Cliente n° "+ clienteID + " borrado!"))
        const {data} =  await clienteAxios.put(`/admin/cliente/actualizar/${datos.id}`, {nombre: datos.nombre, correo: datos.correo})
        return data

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Put | Act: editarClientes")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

export const borrarClientes = async(clienteID)=>{
    try {
        await clienteAxios.delete(`/admin/cliente/eliminar/${ clienteID.toString() }`)

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Del | Act: borrarClientes")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

// Pedidos

export const obtenerEnvios = async() =>{
    const {data} = await  clienteAxios('/admin/ordenes');
    const obj = data.reduce((acc, product)=>{
        if(!acc[product.REFERENCIA_COMPRA]){
          acc[product.REFERENCIA_COMPRA] = []
        }
        // console.log(product)
        acc[product.REFERENCIA_COMPRA].push(product)
  
        return acc
      },[]);
     
    
    return obj.sort(sortBy('FECHA_COMPRA'));
}

export const activarSubasta = async(datos)=>{
    // const obj = {referencia_compra,fecha_activacion,activo: 'true'};
    try {
        const {data} = await clienteAxios.put('/admin/subasta/activar',datos);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const activarSubastaTransport = async(datos) =>{
    try {
        const {data} = await clienteAxios.put('/admin/subasta/transportista/activar', datos);
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const obtenerOrdCompra = async() =>{
    try {
        const {data} = await  clienteAxios('/admin/envios/graficos/datos');
        return data
    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Get | Act: obtenerOrdCompra")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }
}


export const obtenerContratos = async() =>{
    try {
        const {data} = await clienteAxios('/admin/contratos');
        return data;
    } catch (error) {
        console.log(error)
    }
}


export const renovarContrato = async(contrato) =>{
    try {
        const {data} = await clienteAxios.put('/admin/productor/contrato/renovacion', contrato);
        return  data;
    } catch (error) {
        console.log(error)
    }
}

// REPORTES
export const generarReportes = async(datos) =>{
    // console.log(datos)
    const fechaReporte = new Date().toLocaleDateString();
    const formData = new FormData();
    // tipoCliente, comprasMes, estadoPagos, cantidadProductos, comprasDias
    formData.append("tipoCliente",JSON.stringify(datos.tipoVenta ));
    formData.append("comprasMes",JSON.stringify(datos.comprasPorMes ));
    formData.append("estadoPagos",JSON.stringify(datos.estadoPago ));
    formData.append("cantidadProductos",JSON.stringify(datos.stockProductosNombre ));
    formData.append("comprasDias", JSON.stringify(datos.comprasPorDia ));
    formData.append("topCincoProductos", JSON.stringify(datos.topCincoProductos ));
    formData.append("clienteTop", JSON.stringify(datos.clienteMayorVentas ));
    formData.append("usuario", "administrador");
    formData.append("fechaReporte",fechaReporte);
    formData.append("reporte", datos.pdfGenerado)

    try {
        const {data} = await clienteAxios.post('/admin/envios/reporte', formData);
        return data        
    } catch (error) {
        console.log(error)
    }
}
export const listarReportes = async() =>{
    try {
        const {data} = await clienteAxios('/admin/envios/reporte/listar');
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}