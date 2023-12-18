import {CircularProgress as MaterialCircularProgress} from '@mui/material';

function CircularProgress() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
      }}
    >
      <MaterialCircularProgress />
    </div>
  );
}

export {CircularProgress};
