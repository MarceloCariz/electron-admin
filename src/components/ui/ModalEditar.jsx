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
const ModalEditar = ({open, handleClose, handleEditar, onChange, nombre, correo}) => {
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
      <form action="" onSubmit={handleEditar}>
      <input name='nombre'   onChange={onChange}  type="text" value={nombre} />
      <input name='correo' onChange={onChange} type="text" value={correo} />
      <button>Actualizar</button>
      </form>

    </Box>
  </Modal>
  )
}

export default ModalEditar