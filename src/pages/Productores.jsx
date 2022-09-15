import { faCircleXmark, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CardProductores } from '../components/CardProductores';
import { agregarProductor, obtenerProductores, editarProductores, borrarProductores } from '../helpers/getAdmin';
import { useNavigate } from 'react-router-dom';

const Productores = () => {
    const [productores, setProductores] = useState([]);
    const [activeModal, setActiveModal] = useState(false);
    const navigate = useNavigate();
    const [alerta, setAlerta] = useState({msg:'', error:false})
    const [formValues, setFormValues] = useState({nombre: '', correo: '', password: ''});
    const {nombre, correo , password} = formValues;
    useEffect(() => {

        if (localStorage.getItem("token") == "" ) {
          navigate('/')
        }
        const cargarProductores = async()=>{
          const respuesta = await obtenerProductores();
          console.log(respuesta)
          setProductores(respuesta);
        }
  
      cargarProductores();
    },[] )
            
      const RemoveProductores = async(productoresID)=>{
        await borrarProductores(productoresID)
        window.location.reload();
      }

      const onChange = ({target}) =>{
        setFormValues({
          ...formValues,
          [target.name] : target.value
        });
      }
      const activateModal = () =>{
        setActiveModal(true);
      }
      const closeModal = () =>{
        setActiveModal(false)        
        window.location.reload();
      }

      const handleAgregarProductor = async(e) =>{
        e.preventDefault();
        if([correo, password, nombre].includes('')){
          setAlerta({error: true, msg:'Todos los campos son obligatorios'});
          setTimeout(() => {
            setAlerta({error: false, msg:''})
          }, 2000);
          return
        }
        try {
          const respuesta = await agregarProductor(formValues);
          setAlerta({error: false, msg:`${respuesta.msg}`})
          setFormValues({correo: '', password: '', nombre: ''})
          setTimeout(() => {
            setAlerta({error: false, msg:''})
          }, 2000);
        } catch (error) {
          setAlerta({error: true, msg:`${error.response.data.msg}`})
          setTimeout(() => {
            setAlerta({error: false, msg:''})
          }, 2000);
        }
      }
  return (
    <>
    <Div>
        <Titulo>Productores</Titulo>

        {/* -------------------FORM------------------------ */}
        {activeModal && 
            <ContainerForm>
              <TituloForm>
                  <FontAwesomeIcon onClick={closeModal} style={{color: 'red', fontSize: '20px', cursor: 'pointer'}}  icon={faCircleXmark}/>
                  <Titulo>Complete el Formulario</Titulo>
              </TituloForm>
              {
                alerta.msg.length > 0 && <Alerta error={alerta.error} >{alerta.msg}</Alerta> 
              }
              <Form onSubmit={handleAgregarProductor}>
                  <CampoForm>
                    <label htmlFor="nombre">Nombre :</label>
                    <InputForm name='nombre' onChange={onChange} type="text" style={{marginLeft: '1.5rem'}} placeholder='Nombre' value={nombre} />
                  </CampoForm>
                  <CampoForm>
                    <label htmlFor="correo">Correo :</label>
                    <InputForm name="correo" onChange={onChange} type="text" style={{marginLeft: '1.7rem'}} placeholder='ej: correo@correo.com' value={correo} />
                  </CampoForm>
                  <CampoForm>
                    <label htmlFor="password">Contraseña :</label>
                    <InputForm name="password" onChange={onChange} type="password"  placeholder=''  value={password}/>
                  </CampoForm>
                  <BotonAdd type='submit'>Agregar Productor</BotonAdd>
              </Form>
            </ContainerForm>
        }
        {/* -------------------------------------------- */}
        <Table >
          <Thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Accion</th>
            </tr>
          </Thead>
          <Tbody>
            {/* <tr> */}
            {productores.length > 0 ? productores.map((cliente)=>(
                <CardProductores cliente={cliente} onChange={onChange} />
            )):'no hay'}
            {/* </tr> */}
          </Tbody>
        </Table>
        <br/>
        <AgregarContainer>
          <BotonAdd onClick={activateModal}> 
            <FontAwesomeIcon icon={faUserPlus}/>
            Crear Productor
            </BotonAdd>
        </AgregarContainer>
    </Div>
    {/*
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"/>  
    */}
    </>
  )
}
const Alerta = styled.p`
  text-align: center;
  color:  white;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
  text-transform: capitalize;
  background-color: ${props => props.error ? 'red' : 'blue'}

`;
const InputForm = styled.input`
  height: 2rem;
  border-radius: 5px;
  border: 1px gray thin;
`;

const CampoForm = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: right;
`;
const TituloForm = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  margin-top: 1rem;
`;
const ContainerForm = styled.div`
  position: absolute;
  margin-top: 12rem;
  background-color: white;
  border: 1px black solid;
  border-radius: 10px;
  padding: 10px 15px 10px 15px;
`;

const BotonAdd = styled.button`
  background-color:#1B592A; 
  border: none;
  padding: 10px 15px 10px 15px;
  display: flex;
  gap: 0.5rem;
  color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const AgregarContainer = styled.div`
  margin-bottom: 2rem;
`;

const Icono = styled.td`
  text-align: center;
  cursor: pointer;

`;

const Tbody = styled.tbody`
border-collapse: collapse;
`;

const Titulo = styled.h2`
    color: white;
    text-align:center;
`;

const Thead = styled.thead`
  background-color: #212529;
  border-color: #32383e;
  color: white;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  text-align: left;
  

`;

const Table = styled.table`
  width: 120%;
  border: 1px gray  solid;
  padding: 10px 25px 15px 25px;
  background-color: #212529;
  border-color: #32383e;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default Productores