import clienteAxios from "../axios"


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
        await clienteAxios.delete(`/admin/productor/eliminar/${ clienteID.toString() }`
        ).then( res => console.log("Productores n° "+ clienteID + " borrado!"))

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
        await clienteAxios.delete(`/admin/transportista/eliminar/${ clienteID.toString() }`
        ).then( res => console.log("Transportistas n° "+ clienteID + " borrado!"))

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Del | Act: borrarTransportistas")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

// <--------------------------- clientes --------------------------->

export const agregarClientes = async(clientes) =>{
 
    const {data} = await clienteAxios.post('/clientes/nuevo', clientes);
    return data

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
        await clienteAxios.delete(`/admin/cliente/eliminar/${ clienteID.toString() }`
        ).then( res => console.log("Cliente n° "+ clienteID + " borrado!"))

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
     

    return obj
}

export const activarSubasta = async(datos)=>{
    // const obj = {referencia_compra,fecha_activacion,activo: 'true'};
    console.log(datos)
    try {
        const {data} = await clienteAxios.put('/admin/subasta/activar',datos);
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const activarSubastaTransport = async(datos) =>{
    try {
        const {data} = await clienteAxios.put('/admin/subasta/transportista/activar', datos);
        console.log(data)
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

//Contratos

export const obtenerContratos = async()=>{
    try {
        const {data} = await clienteAxios('/admin/contratos');
        return data
    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Get | Act: obtenerContratos")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}

export const renovarContrato = async(datos)=>{
    console.log(datos)
    try {
        //await clienteAxios.put(`/admin/cliente/actualizar/${ clienteID.toString() }`, datos)
        //.then( res => console.log("Cliente n° "+ clienteID + " borrado!"))
        const {data} =  await clienteAxios.put(`/admin/cliente/actualizar/${datos.id}`, {nombre: datos.fchStart, correo: datos.fchEnd})
        return data

    } catch (error) {
        console.log("Error GetAdmins.jsx | Tipo: Put | Act: renovarContrato")
        console.log(error)
        console.log("Error GetAdmins.jsx ==================================")
    }

}