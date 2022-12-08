import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, TextField,RadioGroup, Typography, CircularProgress, LinearProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { MyTextInput } from '../formik/MyTextInput';
import { MyRadioButton } from '../formik/MyRadioButton';
import { useState } from 'react';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    textAlign: 'center',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
const ModalAgregar = ({usuario,open, handleClose, handleAgregar,  error}) => {

  const [cargando, setCargando] = useState(false)
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <div>
          <Typography id="modal-modal-title" variant="h6" >
            Complete todos los campos
          </Typography>
          {error.msg && <Alert   variant="filled" severity={error.error ? 'error' : 'success'} style={{marginTop: '20px'}}>{error.msg}</Alert>}
          <Formik 
            enableReinitialize={true}
            initialValues={usuario === "cliente" ?{ nombre: "", correo: "", password: "", rut: "", tipo: "local" }  : { nombre: "", correo: "", password: "" }}
            onSubmit={(values, {resetForm}) => {
                handleAgregar(values, resetForm, setCargando); 

            }}
            validationSchema={
              usuario === "cliente" ?
              Yup.object({
                nombre: Yup.string().min(3, "Debe ser mayor a 3 caracteres").max(50,"Debe ser menor a 50 caracteres").required("Este campo es obligatorio"),
                correo: Yup.string().email("El correo  no es valido").required("Este campo es obligatorio"),
                password: Yup.string().min(6,"La contraseña debe ser de 6 caracteres o mas").required("Este campo es necesario"),
                tipo: Yup.string().required("Este campo es necesario"),
                rut: Yup.string().when("tipo", {
                  is: "local",
                  then: Yup.string().max(10,"No debe ser mas de 10 caracteres").required("Debe ingresar el rut")
                })
              })
              /// PRODUCTOR Y TRANSPORTISTA
              :
              Yup.object({
                nombre: Yup.string().min(3, "Debe ser mayor a 3 caracteres").max(50,"Debe ser menor a 50 caracteres").required("Este campo es obligatorio"),
                correo: Yup.string().email("El correo  no es valido").required("Este campo es obligatorio"),
                password: Yup.string().min(6,"La contraseña debe ser de 6 caracteres o mas").required("Este campo es necesario"),
              })
            }
          >
            {
              ({values}) =>(
                <Form>
                  <Box  display={"flex"} flexDirection={"column"} gap={3}>


                    <MyTextInput name="nombre" placeholder="Nombre"  labelmui="Nombre"/>
                    <MyTextInput name="correo" placeholder="Correo"  labelmui="Correo"/>
                    <MyTextInput name="password" placeholder="Contraseña"  labelmui="Contraseña"  />

                    {
                      usuario === "cliente" && (
                        <>
                        <FormControl >
                          <FormLabel id="tipo">Tipo Cliente</FormLabel>
                          {/* <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={values.tipo || "local"}
                            name="tipo"
                            row
                            > */}
                            <Box display={"flex"} justifyContent="center">
                              <MyRadioButton name="tipo" checked={values.tipo === "local"}  value="local" labelmui="local" />
                              <MyRadioButton name="tipo" checked={values.tipo === "externo"} value="externo" labelmui="externo" />
                            </Box>

                            {/* <FormControlLabel value="local" control={<Radio />} labelmui="local" />
                            <FormControlLabel value="externo" control={<Radio />} labelmui="externo" /> */}
                          {/* </RadioGroup> */}
                        </FormControl>

                        </>


                      )
                    }

                    {values.tipo === "local" &&(
                      <MyTextInput   name='rut'  placeholder='Rut: 11111111-3' labelmui="Rut"  />
                    )}

                    <Button  variant='contained' color="success" type='submit'>
                      {cargando ? <CircularProgress color="inherit" /> : "Agregar"}
                      </Button>

                  </Box>
                </Form>
              )
            }

          </Formik>
          {/* <FormContainer   autoComplete="off"  component="form" action="" onSubmit={handleAgregar} validate="true">
              <TextField margin="dense" variant="filled" label="Nombre"  name='nombre'    onChange={onChange}  type="text" value={nombre}  />
              <TextField margin="dense" type="email" variant="filled" label="Correo" name='correo' onChange={onChange} value={correo} />
              <TextField  margin="dense" variant="filled" label="Contraseña"  name='password' onChange={onChange} type="text" value={password} />
              {usuario === "cliente" && (
                // <TextField  margin="dense" variant="filled" label="Contraseña"  name='tipo' onChange={onChange} type="text" value={password} />
                <FormControl>
                  <FormLabel id="tipocliente">Tipo Cliente</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="local"
                    name="tipocliente"
                    onChange={handleChangeTipoCliente}
                    row
                    >
                    <FormControlLabel value="local" control={<Radio />} label="local" />
                    <FormControlLabel value="externo" control={<Radio />} label="externo" />
                  </RadioGroup>
                </FormControl>
              )}
              {usuario === "cliente" && tipoCliente === "local" &&(
                <TextField margin='dense' variant="filled" label="Rut"  name='rut' onChange={onChange} type="text" placeholder='11111111-3' value={rut}/>
              )}
              <Button variant='contained' color="success" type='submit'>Agregar</Button>
          </FormContainer> */}
      </div>

    </Box>
  </Modal>
  )
}
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:10px;
  margin-top: 20px;
`;
export default ModalAgregar