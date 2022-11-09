import axios from "axios";



const clienteAxios = axios.create({
    baseURL: "http://168.138.133.24:4000/api"
    // baseURL: "http://localhost:4000/api"
})


export default clienteAxios;