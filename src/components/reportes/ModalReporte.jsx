import { Box, Modal, Typography } from '@mui/material'
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    width: 400,
    textAlign: 'center',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
export const ModalReporte = ({show,setShow, descripcion, id}) => {
  return (
    <Modal
        open={show}
        onClose={() => setShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box  
          sx={{backgroundColor:'white', padding: '10px 10px 10px 10px', borderRadius: '20px', display: 'flex', flexDirection:'column', alignItems: 'center'}}   
            style={style} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Descripcion del reporte #{id}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 , whiteSpace: 'pre-line', textAlign: 'justify'}}>
                {descripcion}
            </Typography>
        </Box>
</Modal>
  )
}


