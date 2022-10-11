import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clienteAxios from "../axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()
    const {pathname} = useLocation();
    const [config, setConfig] = useState({})

    useEffect(()=>{
        const autenticarAdmin = async () => {
            const token = localStorage.getItem('token')
            if(!token){
                console.log("el token es: "+ token)
                setCargando(false)
                return
            }            
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/usuario/perfil', config)
                setAuth(data)
                setConfig(config)
                while ((token === undefined) && (pathname === '/#/inicio' || pathname === '/inicio/productores' || pathname === '/inicio/transportistas' || pathname === '/inicio/clientes')){
                    navigate('/')
                    return
                }
                                
                if(pathname === '/'){

                    if(auth.ID_ROL === 2){
                        console.log("el token es: "+ token)
                        navigate('/inicio')
                        return
                    }
                }

                //if(pathname === '/inicio' || pathname === '/inicio/productores' || pathname === '/inicio/transportistas' || pathname === '/inicio/clientes' ){
                //    console.log("Asegurado")
                //}


                
            } catch (error) {
                console.log(error)
                setAuth({})
                
            } finally{
                setCargando(false)

            }
        }
        autenticarAdmin();

    },[navigate,pathname,auth.ID_ROL])
    

    return (
        <AuthContext.Provider value={{setAuth, auth, cargando, config}}> 
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;