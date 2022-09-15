import { Box, Modal, Typography } from '@mui/material';
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const ModalAgregar = ({open, handleClose, handleAgregar, onChange, nombre, correo, password}) => {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <form action="" onSubmit={handleAgregar}>
      <input name='nombre'   onChange={onChange}  type="text" value={nombre} />
      <input name='correo' onChange={onChange} type="text" value={correo} />
      <input name='password' onChange={onChange} type="text" value={password} />

      <button>Agregar</button>
      </form>

    </Box>
  </Modal>
  )
}

export default ModalAgregar