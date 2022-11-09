import { createContext, useState } from "react"
import { obtenerClientes, obtenerContratos, obtenerEnvios, obtenerProductores, obtenerTransportistas } from "../helpers/getAdmin";




const consultasContext = createContext({});







const ConsultasProvider = ({children}) => {
    const [cargando, setCargando] = useState(false)
    const [productores, setProductores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [transportistas, setTransportistas] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [contratos, setContratos] = useState([]);
    const cargarProductores = async()=>{
        const respuesta = await obtenerProductores();
        setProductores(respuesta);
    }

    const cargarClientes = async()=>{
        const respuesta = await obtenerClientes();
        // console.log(respuesta)
        setClientes(respuesta);
    }
    const cargartransportistas = async () => {
        const respuesta = await obtenerTransportistas();
        setTransportistas(respuesta);
    };
    const cargarPedidos = async()=>{
        setCargando(true);
        const resultado = await obtenerEnvios();
        const filtrado = resultado.map((ele)=>(ele.filter(({ESTADO_ENVIO,TIPO_VENTA})=>(TIPO_VENTA === 'externo' &&  (ESTADO_ENVIO ==='pendiente' ||  ESTADO_ENVIO ==='bodega') ))));
        const filtradoFinal = (filtrado.filter((ele)=>(ele.length > 0)));
        setPedidos(filtradoFinal)
        setCargando(false);

    }

    const cargarContratos = async () =>{
        setCargando(true)
        const respuesta = await obtenerContratos();
        const activos = respuesta.filter(({RENOVACION})=>(RENOVACION === 'true'));
        setContratos(activos);
        setCargando(false)
    }
    return (
        <consultasContext.Provider value={{
            cargarProductores, productores,
            cargarClientes, clientes,
            cargartransportistas, transportistas,
            cargarPedidos,  pedidos,                        //// subasta disponibles
            cargarContratos, contratos,
            cargando,                               /// UI
            }}>
            {children}
        </consultasContext.Provider>
)}


export {ConsultasProvider};



export default consultasContext;