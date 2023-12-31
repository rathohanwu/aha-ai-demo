import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {PropsWithChildren} from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid black',
  borderRadius: '5px!important',
  boxShadow: 24,
  p: 2,
};

type Props = PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
}>;

function TransitionsModal(props: Props) {
  const {isOpen, close, children} = props;

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => close()}
        closeAfterTransition
        slots={{backdrop: Backdrop}}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}

export {TransitionsModal};
