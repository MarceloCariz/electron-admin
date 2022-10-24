import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom"
import { Icon } from '@mui/material';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import BarChartIcon from '@mui/icons-material/BarChart';
const AdminLayout = () => {
    const history = useNavigate();
    const logOut = () =>{
        localStorage.setItem("token","")
        history('/');
    }
  return (

    <Div>
        <Navbar>
            <Link to={'/inicio'} style={{textDecoration: 'none'}}>
                <Titulo>Administrador MaipoGrande</Titulo>   
            </Link>
            <Opciones>
                <div>
                    <Tituloopcion>
                        <Icon component={PeopleAltIcon} />
                        Usuarios
                    </Tituloopcion>
                    <ContainerOpciones>
                        <SubtituloOpcion to={'productores'}>Productores</SubtituloOpcion>
                        <SubtituloOpcion to={'transportistas'}>Transportista</SubtituloOpcion>
                        <SubtituloOpcion to={'clientes'}>Clientes</SubtituloOpcion>
                    </ContainerOpciones>
                </div>
                <div>
                    
                    <Tituloopcion>
                        <Icon component={AllInboxIcon} />
                        Pedidos</Tituloopcion>
                    <ContainerOpciones>
                        <SubtituloOpcion to={'subastas'}>Subastas</SubtituloOpcion>
                        <SubtituloOpcion to={'pedidos'}>Pedidos</SubtituloOpcion>
                    </ContainerOpciones>
                </div>
                <div>
                    <Tituloopcion>
                        <Icon component={AssignmentIcon} />
                        Contratos</Tituloopcion>
                    <ContainerOpciones>
                        <SubtituloOpcion to={'contratos/activos'}>Activos</SubtituloOpcion>
                        <SubtituloOpcion to={'contratos/vencidos'}>Renovación</SubtituloOpcion>
                    </ContainerOpciones>
                </div>
                <div>
                    <Tituloopcion>
                    <Icon component={BarChartIcon} />
                        Graficas</Tituloopcion>
                    <ContainerOpciones>
                        <SubtituloOpcion to={'ventas'}>Ventas</SubtituloOpcion>
                        <SubtituloOpcion to={''}>Informes</SubtituloOpcion>
                    </ContainerOpciones>
                </div>
                <div>
                    <Tituloopcion>Cuenta</Tituloopcion>
                    <ContainerOpciones>
                        <SubtituloOpcion2 onClick={()=>{logOut()}} >Cerrar Sesion</SubtituloOpcion2>
                    </ContainerOpciones>
                </div>
            </Opciones>
        </Navbar>
        <Container>
            <Outlet/>
        </Container>
    </Div>
  )
}

const SubtituloOpcion = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: white;
  -webkit-app-region: no-drag;
`;
const SubtituloOpcion2 = styled.a`
cursor: pointer;  
text-decoration: none;
color: white;
background-color: #8E0000;
-webkit-app-region: no-drag;
padding: 5px 2px 5px 9px;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
`;

const ContainerOpciones = styled.div`
    margin-left: 3rem;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Tituloopcion = styled.h3`
    color: white;
    font-weight: 500;
    /* background-color: #424242; */
    background-color: #42424261;
    width: 80%;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    /* text-decoration: underline; */
`

const Opciones = styled.nav`
  margin-top: 4rem;  
  padding-left: 2rem;
`;

const Titulo = styled.h2`
    color: white;
    -webkit-app-region: no-drag;
`;

const Navbar = styled.aside`
    padding: 10px 10px 10px 10px;
    background-color: #222A2D;
    min-height: 100vh;
    width: 18% ;
    -webkit-app-region: drag;
`;

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 0 auto;  
  background-color: #f3f4f6;
  padding-top: 1rem;
`;

const Div = styled.div`
    display: flex;
`
export default AdminLayout