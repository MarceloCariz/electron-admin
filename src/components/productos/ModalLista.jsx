

import { Box, List,  Modal, Typography } from '@mui/material'

import { ListaNombre } from './ListaNombre';

export const ModalLista = ({modal, setModal, nombres}) => {



    return (
        <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 400, height: 500, borderRadius:"10px" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Lista de Nombres Disponibles
                </Typography>
                <List>
                    {
                        nombres.length > 0 && nombres.map(({ID, NOMBRE})=>(
                            <ListaNombre key={ID} NOMBRE={NOMBRE} ID={ID}/>
                        ))
                    }
                </List>
            </Box>
        </Modal>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    pt: 2,
    px: 4,
    pb: 3,
};