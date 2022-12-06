import { Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Radio, TextField,RadioGroup, Typography } from '@mui/material';
import styled from 'styled-components';
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
const ModalAgregar = ({usuario,tipoCliente,rut,handleChangeTipoCliente ,open, handleClose, handleAgregar, onChange, nombre, correo, password, error}) => {


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
          <FormContainer   autoComplete="off"  component="form" action="" onSubmit={handleAgregar} validate="true">
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
          </FormContainer>
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