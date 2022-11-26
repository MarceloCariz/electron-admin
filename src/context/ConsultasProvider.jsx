import { createContext, useState } from "react"
import { listarReportes, obtenerClientes, obtenerContratos, obtenerEnvios, obtenerProductores, obtenerTransportistas } from "../helpers/getAdmin";




const consultasContext = createContext({});







const ConsultasProvider = ({children}) => {
    const [cargando, setCargando] = useState(false)
    const [productores, setProductores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [transportistas, setTransportistas] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [contratos, setContratos] = useState([]);
    const [contratosActivos, setContratosActivos] = useState([]);

    // reportes
    const [reportes, setReportes] = useState([]);
    const [reportesBackup, setReportesBackup] = useState([]);

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
        setContratos(respuesta);
        const activos = respuesta.filter(({RENOVACION})=>(RENOVACION === 'true'));
        setContratosActivos(activos);

        setCargando(false)
    }

    const cargarReportes = async()=>{
        const respuesta = await listarReportes();
        // console.log(respuesta)
        setReportesBackup(respuesta);
        setReportes(respuesta);
    }
    return (
        <consultasContext.Provider value={{
            cargarProductores, productores,
            cargarClientes, clientes,
            cargartransportistas, transportistas,
            cargarPedidos,  pedidos,                        //// subasta disponibles
            cargarContratos, contratos, contratosActivos,
            reportes, setReportes, reportesBackup, cargarReportes,/// REPORTES
            cargando,                               /// UI
            }}>
            {children}
        </consultasContext.Provider>
)}


export {ConsultasProvider};



export default consultasContext;
