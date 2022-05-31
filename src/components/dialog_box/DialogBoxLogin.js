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
        console.log(value);
    }

    handleUpdatePwd(value){
        console.log(value);
    }

    handleSubmit(){
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <div className="aboutContainer" onClick={openDialog.bind(this)}>
                    Login
                </div>
                <Dialog open={this.state.open_dialog} onClose={this.handleCloseLogin}>
                    <DialogTitle>Login to your account</DialogTitle>
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
                        <Button sx={{"color": "#5b8d44"}} onClick={this.handleSubmit}>
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