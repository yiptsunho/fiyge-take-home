import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../components/shared-theme/AppTheme';
import ColorModeSelect from '../components/shared-theme/ColorModeSelect';
import SitemarkIcon from '../assets/SitemarkIcon';
import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {LOGIN_API} from "../constants/ApiConstant.ts";
import useSnackbar from "../utils/hooks/useSnackbar.ts";
import {isStringEmpty} from "../utils/Util.ts";
import {useContext} from "react";
import {MainContext} from "../App.tsx";
import {CommonResponseType} from "../constants/Type.ts";
import ErrorCode from "../constants/ErrorCode.ts";
import {useNavigate} from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    width: "100vw",
    // maxWidth: "90vw",
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

type LoginBodyType = {
    username: string;
    password: string;
}

function LoginPage(props: { disableCustomTheme?: boolean }) {
    // const [emailError, setEmailError] = React.useState(false);
    // const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    // const [passwordError, setPasswordError] = React.useState(false);
    // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const navigate = useNavigate();
    const { setIsLogin } = useContext(MainContext)
    const {
        openSnackbar,
        setSnackbarSeverity,
        setSnackbarMessage
    } = useSnackbar()
    const { mutate: login } = useMutation({
        mutationFn: (body: LoginBodyType) => {
            return axios.post(LOGIN_API, body)
        },
        onSuccess: () => {
            setSnackbarSeverity("success")
            setSnackbarMessage("Login successful")
            openSnackbar()
            setIsLogin(true)
            navigate("/formPage")
        },
        onError: (error: AxiosError<CommonResponseType>) => {
            const errorCode = error?.response?.data.errorCode

            if (errorCode == ErrorCode.USERNAME_OR_PASSWORD_INCORRECT.toString()) {
                setSnackbarSeverity("error")
                setSnackbarMessage("Username or password incorrect")
                openSnackbar()
                return
            }

            setSnackbarSeverity("error")
            setSnackbarMessage("Login failed")
            openSnackbar()
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const body = {
            username: data.get("username") as string,
            password: data.get("password") as string
        }
        console.log(body)

        const valid = validateInputs(body)
        if (!valid) {
            setSnackbarSeverity("error")
            setSnackbarMessage("Username and password are mandatory")
            openSnackbar()
            return
        }

        login(body)
    };

    const validateInputs = (body: LoginBodyType) => {
        const { username, password } = body

        if (isStringEmpty(username) || isStringEmpty(password)) {
            return false;
        }

        return true
    }

    // const validateInputs = () => {
    //     const username = document.getElementById('username') as HTMLInputElement;
    //     const password = document.getElementById('password') as HTMLInputElement;
    //
    //     let isValid = true;
    //
    //     if (!username.value || !/\S+@\S+\.\S+/.test(username.value)) {
    //         setEmailError(true);
    //         setEmailErrorMessage('Please enter a valid email address.');
    //         isValid = false;
    //     } else {
    //         setEmailError(false);
    //         setEmailErrorMessage('');
    //     }
    //
    //     if (!password.value || password.value.length < 6) {
    //         setPasswordError(true);
    //         setPasswordErrorMessage('Password must be at least 6 characters long.');
    //         isValid = false;
    //     } else {
    //         setPasswordError(false);
    //         setPasswordErrorMessage('');
    //     }
    //
    //     return isValid;
    // };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                {/*<ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />*/}
                <Card variant="outlined">
                    <SitemarkIcon />
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl style={{ alignItems: "start"}}>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                // error={emailError}
                                // helperText={emailErrorMessage}
                                id="username"
                                type="username"
                                name="username"
                                placeholder="username"
                                autoComplete="username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                // color={emailError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl style={{ alignItems: "start"}}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                // error={passwordError}
                                // helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                // color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox value="remember" color="primary" />}*/}
                        {/*    label="Remember me"*/}
                        {/*/>*/}
                        {/*<ForgotPassword open={open} handleClose={handleClose} />*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // onClick={validateInputs}
                        >
                            Sign in
                        </Button>
                        {/*<Link*/}
                        {/*    component="button"*/}
                        {/*    type="button"*/}
                        {/*    onClick={handleClickOpen}*/}
                        {/*    variant="body2"*/}
                        {/*    sx={{ alignSelf: 'center' }}*/}
                        {/*>*/}
                        {/*    Forgot your password?*/}
                        {/*</Link>*/}
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}

export default LoginPage;
