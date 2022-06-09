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
} from "@mui/material";
import {handleLogin, isLoggedIn} from "../../utils/auth";
import {openDialog, closeDialog, openSnack, closeSnack} from "../../utils/handlers";
import { loginUser } from "../misc/requests";
import ValidationTextField from "../inputs/ValidationTextField";


class DialogBoxLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open_dialog : false,
            open_snack : false,
            email : "",
            pwd : "",
            error : false
        };
    }

    handleCloseLogin(e){
        this.setState({email : "", pwd : "", error : false, open_snack : false});
    }

    handleUpdateEmail(value){
        this.setState({email : value});
    }

    handleUpdatePwd(value){
        this.setState({pwd : value});
    }

    async handleSubmit(){
        try{
            const account_tokens = await loginUser(this.state.email, this.state.pwd);
            localStorage.setItem("access_token", account_tokens.access);
            localStorage.setItem("refresh_token", account_tokens.refresh);
            this.props.refreshLogin(true);
            this.setState({open_snack : false, error : false, open_dialog : false});
        }catch{
            this.setState({open_snack : true, error : true});
        }
    }

    render(){
        return(
            <div>
                <div className="aboutContainer" onClick={openDialog.bind(this)}>
                    Login
                </div>
                <Dialog open={this.state.open_dialog} onClose={this.handleCloseLogin.bind(this)}>
                    <DialogTitle>Login to your account</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter your credentials to login.
                            </DialogContentText>
                                <ValidationTextField  autoFocus
                                            required
                                            margin="dense"
                                            id="email"
                                            label="Email"
                                            name="email"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            color="success"
                                            error={this.state.error}
                                            onChange={(e)=>this.handleUpdateEmail(e.target.value)}/>
                                <ValidationTextField  autoFocus
                                            required
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            type="password"
                                            fullWidth
                                            variant="outlined"
                                            color="success"
                                            error={this.state.error}
                                            onChange={(e)=>this.handleUpdatePwd(e.target.value)}/>
                            </DialogContent>
                        <DialogActions>
                            <Button sx={{"color": "#d32f2f"}} onClick={closeDialog.bind(this)}>Cancel</Button>
                            <Button sx={{"color": "#5b8d44"}} onClick={this.handleSubmit.bind(this)}>
                                Login</Button>
                        </DialogActions>
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
