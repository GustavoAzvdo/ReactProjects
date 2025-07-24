import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


type AvisoProps = {
  severity: undefined | "success" | "error" | "warning",
  mensage: string;
  open: boolean
  onClose: () => void
}

const Aviso = ({ severity, mensage, open, onClose }: AvisoProps) => {


  return (
    <>
      <Snackbar open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={onClose}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {mensage}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Aviso


