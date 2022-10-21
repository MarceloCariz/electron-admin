import { Alert, Box, Button, Modal, TextField, Typography } from '@mui/material';
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
const ModalEditar = ({open, handleClose, handleEditar, onChange, nombre, correo, error}) => {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
      Complete todos los campos
      </Typography>
      {error && <Alert   variant="filled" severity='error' style={{marginTop: '20px'}}>{error}</Alert>}
      <FormContainer   autoComplete="off"  component="form" action="" onSubmit={handleEditar} validate="true">
          <TextField margin="dense" variant="filled" label="Nombre"  name='nombre' onChange={onChange} type="text" value={nombre}  />
          <TextField margin="dense" variant="filled" label="Correo" name='correo' onChange={onChange} type="text" value={correo} />

          <Button variant='contained' color="success" type='submit'>Actualizar</Button>
      </FormContainer>
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

export default ModalEditar