import {createContext, Dispatch, SetStateAction, useState} from 'react'
import './App.css'
import {Route, Routes, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import FormPage from "./pages/formPage/FormPage.tsx";
import {AlertProps} from "@mui/material/Alert/Alert";
import CustomSnackbar from "./components/Snackbar.tsx";
import Cookies from 'js-cookie';
import axios from "axios";

interface MainContextType {
    isLogin: boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
    setShowSnackbar: Dispatch<SetStateAction<boolean>>;
    setSnackbarSeverity: Dispatch<SetStateAction<AlertProps["severity"]>>;
    setSnackbarMessage: Dispatch<SetStateAction<string>>;
}

export const MainContext = createContext<MainContextType>({} as MainContextType)

function App() {
    // response interceptor, if users' token expired, navigate user to login page
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        if (error.response.status === 401) {
            Cookies.remove("token")
            setIsLogin(false)
            setSnackbarSeverity("error")
            setSnackbarMessage("Session expired")
            setShowSnackbar(true)
        }
        console.log(error)
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });


    const [isLogin, setIsLogin] = useState<boolean>(Cookies.get("token") !== null)
    // snackbar related
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false)
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertProps["severity"]>("success")
    const [snackbarMessage, setSnackbarMessage] = useState<string>("")

    const handleCloseSnackbar = () => {
        setShowSnackbar(false)
    }

    return (
        <MainContext.Provider value={{
            isLogin,
            setIsLogin,
            setShowSnackbar,
            setSnackbarSeverity,
            setSnackbarMessage
        }}>
            <CustomSnackbar
                open={showSnackbar}
                handleClose={handleCloseSnackbar}
                message={snackbarMessage}
                severity={snackbarSeverity}
            />
            <Routes>
                <Route path="/" element={isLogin ? <Navigate replace to="/form" /> : <LoginPage />}/>
                <Route path="/form" element={isLogin ? <FormPage /> : <Navigate replace to="/" />}/>
            </Routes>
        </MainContext.Provider>
    )
}

export default App
