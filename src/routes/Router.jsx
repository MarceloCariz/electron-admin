import React from 'react'
import { BrowserRouter, HashRouter, Route, Routes} from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import AdminLayout from '../Layout/AdminLayout'
import Inicio from '../pages/Inicio'
import Login from '../pages/Login'
import Productores from '../pages/Productores'
import Transportistas from '../pages/Transportistas'
import Clientes from '../pages/Clientes'
import Pedidos from '../pages/Pedidos'
import Ventas from '../pages/Ventas'
import Subastas from '../pages/Subastas'


const Router = () => {  
  return (
    <HashRouter>
    <AuthProvider>
        <Routes>
          {/* Ruta publica */}
            <Route path='/'>
                <Route index element={<Login/>}/>
            </Route>
          {/* Ruta Protegida */}
            <Route path='/inicio' element={<AdminLayout/>}>
               <Route index element={<Inicio/>}/>
               <Route path='productores' element={<Productores/>}/>
               <Route path='transportistas' element={<Transportistas/>}/>
               <Route path='clientes' element={<Clientes/>}/>
               <Route path='pedidos' element={<Pedidos/>}/>
               <Route path='ventas' element={<Ventas/>}/>
               <Route path='subastas' element={<Subastas/>}/>
            </Route>
        </Routes>
    </AuthProvider>
    </HashRouter>
  )
}

export default Router