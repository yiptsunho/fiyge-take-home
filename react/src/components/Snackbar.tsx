import {Alert, Snackbar} from "@mui/material";
import {AlertProps} from "@mui/material/Alert/Alert";

interface CustomSnackbarProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    severity: AlertProps["severity"]
}

function CustomSnackbar(props: CustomSnackbarProps) {
    const { open, handleClose, message, severity } = props;

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar;
