import React, {useState} from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField
} from "@mui/material";
import {handleLogin, isLoggedIn} from "../../utils/auth";
import {openDialog, closeDialog, openSnack, closeSnack} from "../../utils/handlers";
import { loginUser } from "../misc/requests";


class DialogBoxLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open_dialog : false,
            open_snack : false,
            email : "",
            pwd : ""
        };
    }

    handleCloseLogin(e){
        this.setState({email : "", pwd : ""});
    }

    handleUpdateEmail(value){
        this.setState({email : value});
    }

    handleUpdatePwd(value){
        this.setState({pwd : value});
    }

    async handleSubmit(){
        const token = await loginUser(this.state.email, this.state.pwd);
        console.log(token);
    }

    render(){
        return(
            <div>
                <div className="aboutContainer" onClick={openDialog.bind(this)}>
                    Login
                </div>
                <Dialog open={this.state.open_dialog} onClose={this.handleCloseLogin}>
                    <DialogTitle>Login to your account</DialogTitle>
                    <form method="POST" action="http://localhost:8000/accounts/login">
                        <DialogContent>
                            <DialogContentText>
                                Enter your credentials to login.
                            </DialogContentText>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="email"
                                            label="Email"
                                            name="email"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>this.handleUpdateEmail(e.target.value)}/>
                                <TextField  autoFocus
                                            required
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e)=>this.handleUpdatePwd(e.target.value)}/>
                            </DialogContent>
                        <DialogActions>
                            <Button sx={{"color": "#d32f2f"}} onClick={closeDialog.bind(this)}>Cancel</Button>
                            <Button sx={{"color": "#5b8d44"}} type="submit"/*onClick={this.handleSubmit.bind(this)}*/>
                                Login</Button>
                        </DialogActions>
                    </form>
                    <Snackbar open={this.state.open_snack} autoHideDuration={6000} onClose={closeSnack.bind(this)}>
                        <Alert onClose={closeSnack.bind(this)} severity="error" sx={{ width: '100%' }}>
                            Invalid username/password !
                        </Alert>
                    </Snackbar>
                </Dialog>
            </div>
        );
    }
}

export default DialogBoxLogin;