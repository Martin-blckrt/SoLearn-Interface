import React, {useState} from "react";
import '../styles/header.css';
import logo from "../assets/Logo.png";
import {Link} from "react-router-dom";
import {
    Alert,
    Button,
    Chip, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    ListItemIcon,
    Menu,
    MenuItem, Snackbar
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Logout} from "@mui/icons-material";
import {logout, handleLogin, isLoggedIn} from "../utils/auth";
import TextField from "@mui/material/TextField";

export default function Header() {

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleUpdate = event => {
        setCredentials(prevState => {
            return {...prevState, [event.target.name]: event.target.value}
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        let worked = handleLogin(credentials)
        handleClickSnack()
        if (worked === undefined)
            window.location.reload();
    }

    const handleFakeSubmit = event => {
        event.preventDefault()
        handleClickSnack()
        setTimeout(window.location.reload.bind(window.location), 1000);
    }


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [openLogin, setOpenLogin] = React.useState(false);
    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };


    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    return (
        <div className="topContainer">
            <a href="/">
                <div className="logoContainer">
                    <img className="logoImg" src={logo} alt="logo" />
                    <div className="logoText">
                        Solar <br/> Predictor
                    </div>
                </div>
            </a>
            <div className="endContainer">
                <Link to="/about">
                    <div className="aboutContainer">
                        About
                    </div>
                </Link>
                {isLoggedIn() ? (
                    <div className="accountContainer">
                        <Chip icon={<AccountCircleIcon fontSize="large"/>}
                              sx={{ width: "200px", height: "50px", color: "#005403", borderColor: "#005403" }}
                              label="Olivier Giroud"
                              color="success"
                              variant="outlined"
                              onClick={handleClickOpen}/>
                        <Menu
                            anchorEl={open}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                            <MenuItem onClick={event => {
                                event.preventDefault()
                                handleClickSnack()
                                logout(() => window.location.reload())
                            }}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <div className="notPremiumContainer">
                        <div className="aboutContainer" onClick={handleClickOpenLogin}>
                            Login
                        </div>
                        <Dialog open={openLogin} onClose={handleCloseLogin}>
                            <DialogTitle>Login to your account</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter your credentials to login and get your premium advantages.
                                </DialogContentText>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="username"
                                            label="Username"
                                            name="username"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            onChange={handleUpdate}/>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            fullWidth
                                            variant="outlined"
                                            onChange={handleUpdate}/>
                            </DialogContent>
                            <DialogActions>
                                <Button sx={{"color": "#5b8d44"}} onClick={handleCloseLogin}>Cancel</Button>
                                <Button sx={{"color": "#5b8d44"}} onClick={event => {handleSubmit(event)}}>
                                    Login</Button>
                            </DialogActions>
                            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                                <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
                                    Invalid username/password !
                                </Alert>
                            </Snackbar>
                        </Dialog>
                        <div className="premiumContainer" onClick={handleClickOpen}>
                            Get premium
                        </div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Get Premium</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    With premium, get unlimited runs on our model, as well as a financial estimate !
                                </DialogContentText>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="username"
                                            label="Username"
                                            name="username"
                                            type="text"
                                            fullWidth
                                            variant="outlined"/>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            fullWidth
                                            variant="outlined"/>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            fullWidth
                                            variant="outlined"/>
                            </DialogContent>
                            <DialogActions>
                                <Button sx={{"color": "#5b8d44"}} onClick={handleClose}>Cancel</Button>
                                <Button sx={{"color": "#5b8d44"}} onClick={event => {handleFakeSubmit(event)}}>
                                    Subscribe</Button>
                            </DialogActions>
                            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                                    Created account successfully !
                                </Alert>
                            </Snackbar>
                        </Dialog>
                    </div>
                )}
            </div>
        </div>
    )
}
