import React from 'react'
import {  HashRouter, Route, Routes} from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import AdminLayout from '../Layout/AdminLayout'
import Login from '../pages/Login'
import Productores from '../pages/Productores'
import Transportistas from '../pages/Transportistas'
import Clientes from '../pages/Clientes'
import Pedidos from '../pages/Pedidos'
import Ventas from '../pages/Ventas'
import Subastas from '../pages/Subastas'
import { Activos } from '../pages/contratos/Activos'
import { Vencidos } from '../pages/contratos/Vencidos'
import { ConsultasProvider } from '../context/ConsultasProvider'
import { Informes } from '../pages/Informes'
import { Productos } from '../pages/Productos'


const Router = () => {  
  return (
    <HashRouter>
    <AuthProvider>
      <ConsultasProvider>
        <Routes>
          {/* Ruta publica */}
            <Route path='/'>
                <Route index element={<Login/>}/>
            </Route>
          {/* Ruta Protegida */}
            <Route path='/inicio' element={<AdminLayout/>}>
                <Route index element={<Ventas/>}/>
                <Route path='productores' element={<Productores/>}/>
                <Route path='transportistas' element={<Transportistas/>}/>
                <Route path='clientes' element={<Clientes/>}/>
                <Route path='pedidos' element={<Pedidos/>}/>
                <Route path='ventas' element={<Ventas/>}/>
                <Route path='subastas' element={<Subastas/>}/>
                <Route path='contratos/activos' element={<Activos/>}/>
                <Route path='contratos/vencidos' element={<Vencidos/>}/>
                <Route path='informes'  element={<Informes/>} />
                <Route path='productos'  element={<Productos/>} />
            </Route>
        </Routes>
      </ConsultasProvider>
    </AuthProvider>
    </HashRouter>
  )
}

export default Router