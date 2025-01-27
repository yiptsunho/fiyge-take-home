import {useContext} from "react";
import {MainContext} from "../../App.tsx";

function useSnackbar() {
    const {
        setShowSnackbar,
        setSnackbarSeverity,
        setSnackbarMessage
    } = useContext(MainContext)

    const openSnackbar = () => {
        setShowSnackbar(true)
    }

    const closeSnackbar = () => {
        setShowSnackbar(false)
    }

    return {
        openSnackbar,
        closeSnackbar,
        setSnackbarSeverity,
        setSnackbarMessage
    }
}

export default useSnackbar;
