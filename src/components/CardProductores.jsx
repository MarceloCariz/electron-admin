import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styled from 'styled-components';
import { editarProductores, borrarProductores } from '../helpers/getAdmin';

export const CardProductores = ({cliente}) => {    
    const {ID,CORREO,NOMBRE} = cliente;
    const [alerta, setAlerta] = useState({msg:'', error:false})
    const [Form, setForm] = useState({correo:CORREO, nombre:NOMBRE })

    
    const onChange = ({target}) =>{
        setForm({
          ...Form,
          [target.name] : target.value
        });
      }

      const onClick = () => {
          console.log(ID)
          handleEditarProductor()
      }
      
      const RemoveProductor = async(ClienteID)=>{
          await borrarProductores(ClienteID)
  
          window.location.reload();
        }

    const handleEditarProductor = async(e) =>{
    e.preventDefault()
        if([Form.nombre, Form.correo].includes('')){
            setAlerta({error: true, msg:'Todos los campos son obligatorios'});
            setTimeout(() => {
            setAlerta({error: false, msg:''})
            }, 2000);
            return
        }
        try {
            const respuesta = await editarProductores(ID,Form);
            setAlerta({error: false, msg:`${respuesta.msg}`})
            setForm({correo: '', nombre: ''})
            setTimeout(() => {
            setAlerta({error: false, msg:''})
            window.location.reload()
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
      {
        alerta.msg.length > 0 && <Alerta error={alerta.error} >{alerta.msg}</Alerta> 
      }
      <Tr key={ID}>
          <td>
              <Input value={Form.nombre} onChange={onChange} name="nombre"/>
          </td>
          <td>
              <Input value={Form.correo} onChange={onChange} name="correo"/>
          </td>
          <Icono>
              <button type='submit' id={ID} onClick={handleEditarProductor}>
                  <FontAwesomeIcon style={{color: 'blue'}} icon={faPenToSquare} />
              </button>
              <button id={ID} onClick={()=>{RemoveProductor(ID)}}>
                  <FontAwesomeIcon style={{color: 'red'}} icon={faTrash}/>
              </button>
          </Icono>
      </Tr>
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
background-color: ${props => props.error ? 'red' : 'blue'};
position: fixed;
top: 10%;
left: 22%;
width: 19rem;
`;

const Icono = styled.td`
  text-align: center;
  cursor: pointer;

`;

const Tr = styled.tr`
  text-align: left;
  background-color: #2c3034!important;
`;

const td = styled.td`
background-color: #2c3034!important;
`

const Input = styled.input`
background-color: #2c3034;
border: #2c3034;
color: white;
`