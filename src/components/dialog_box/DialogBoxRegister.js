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
import {openDialog, closeSnack, handleEmailChange, checkErrors} from "../../utils/handlers";
import InfosPwd from "../infos/InfosPwd";
import ValidationTextField from "../inputs/ValidationTextField";
import { registerUser } from "../misc/requests";

class DialogBoxRegister extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open_dialog : false,
            open_snack : false,
            email : "",
            pwd : "",
            pwd_verif : "",
            errors : {
                email : false,
                pwd : {
                    error_nb_chars : true,
                    error_mix_n_l: true,
                    error_mix_u_l_chars : true,
                    error_spec_char : true,
                },
                verif : false
            },
            helper_texts:{
                email : "",
                pwd : "",
                verif : ""
            },
            open_infos : false,
            snackbar_text : "",
            snackbar_color : "success"
        };
    }

    handleCloseDialog(){
        this.setState({
            email : "",
            pwd : "",
            pwd_verif : "",
            errors : {
                email : false,
                pwd : {
                    error_nb_chars : true,
                    error_mix_n_l: true,
                    error_mix_u_l_chars : true,
                    error_spec_char : true,
                },
                verif : false
            },
            helper_texts:{
                email : "",
                pwd : "",
                verif : ""
            },
            open_infos : false,
            open_dialog : false,
            snackbar_text : "",
            snackbar_color : "success"
        });
    }

    verifyEmail(value){
        let state = true;
        let text = "Incorrect email address";
        if(/^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,3}$/.test(value)){
            state = false;
            text = "";
        }
        this.setState(prevState => ({...prevState, errors : {...prevState.errors, email : state}, helper_texts : {...prevState.helper_texts, email : text}}));
    }

    handlePwdChange(e){
        const value = e.target.value;
        let error_nb_chars = true;
        let error_mix_n_l = true;
        let error_mix_u_l_chars = true;
        let error_spec_char = true;
        if(/^[\w~`\!@#\$%\^&*\(\)_\-\+=\{\[\}\]|\\:;"'<,>\.\?\/]{12,}$/.test(value)){ //at least 12 chars
            error_nb_chars = false;
        }
        if(/^(?=[^\s]*?[0-9])(?=[^\s]*?[a-z])[\w~`\!@#\$%\^&*\(\)_\-\+=\{\[\}\]|\\:;"'<,>\.\?\/]*$/i.test(value)){
            error_mix_n_l = false;
        }
        if(/^(?=[^\s]*?[A-Z])(?=[^\s]*?[a-z])[\w~`\!@#\$%\^&*\(\)_\-\+=\{\[\}\]|\\:;"'<,>\.\?\/]*$/.test(value)){
            error_mix_u_l_chars = false;
        }
        if(/[~`\!@#\$%\^&*\(\)_\-\+=\{\[\}\]|\\:;"'<,>\.\?\/]/.test(value)){
            error_spec_char = false;
        }
        this.setState(prevState => (
            {
                pwd : value,
                errors : {
                    ...prevState.errors,
                    pwd : {
                        error_nb_chars : error_nb_chars,
                        error_mix_n_l: error_mix_n_l,
                        error_mix_u_l_chars : error_mix_u_l_chars,
                        error_spec_char : error_spec_char,
                    }
                }
            }
        ));
    }

    handleFocusPwd(e){
        this.setState({open_infos : true});
    }

    handleBlurPwd(e){
        this.setState({open_infos : false});
    }

    handleVerifPwd(e){
        this.setState(prevState => ({pwd_verif : e.target.value, errors : {...prevState.errors, verif : e.target.value != this.state.pwd}}));
    }

    async handleSubmit(){
        let snackbar_text = "Created account successfully !";
        let snackbar_color = "success";
        const errors_state = this.state.errors;
        if(checkErrors(this.state.errors)){
            if(this.state.errors.email){
                snackbar_text = "Invalid email field";
            }else if(this.state.errors.pwd.error_mix_n_l || this.state.errors.pwd.error_mix_u_l_chars || this.state.errors.pwd.error_nb_chars || this.state.errors.pwd.error_spec_char){
                snackbar_text = "Invalid password field";
            }else{
                snackbar_text = "Passwords are not identical";
            }
            snackbar_color = "error";
        }else{
            const errors = await registerUser(this.state.email, this.state.pwd);
            if(errors.status != "201"){
                snackbar_text =  errors.email_user.email[0];
                snackbar_color = "error";
                errors_state.email = true;
            }
        }
        this.setState({snackbar_text : snackbar_text, snackbar_color : snackbar_color, open_snack : true, errors : errors_state});
    }

    render(){
        return(
            <div>
                <div className="aboutContainer" onClick={openDialog.bind(this)}>
                    Register
                </div>
                <Dialog open={this.state.open_dialog} onClose={this.handleCloseDialog.bind(this)} fullWidth>
                    <DialogTitle>Register</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Create your free account !
                        </DialogContentText>
                        <ValidationTextField 
                                    required
                                    margin="dense"
                                    id="email"
                                    label="Email"
                                    name="email"
                                    type="text"
                                    color="success"//{!this.state.errors.email ? "valid" : ""}
                                    fullWidth
                                    variant="outlined"
                                    onBlur={e => this.verifyEmail(e.target.value)}
                                    error={this.state.errors.email}
                                    helperText={this.state.helper_texts.email}
                                    onChange={handleEmailChange.bind(this)}
                                    className={!this.state.errors.email && this.state.email != "" ? "valid" : ""}
                                    />
                        <ValidationTextField 
                                    required
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    onChange={this.handlePwdChange.bind(this)}
                                    onFocus={this.handleFocusPwd.bind(this)}
                                    onBlur={this.handleBlurPwd.bind(this)}
                                    error={(this.state.errors.pwd.error_mix_n_l || this.state.errors.pwd.error_mix_u_l_chars || this.state.errors.pwd.error_nb_chars || this.state.errors.pwd.error_spec_char) && this.state.pwd != ""}
                                    className={!this.state.errors.pwd.error_mix_n_l && !this.state.errors.pwd.error_mix_u_l_chars && !this.state.errors.pwd.error_nb_chars && !this.state.errors.pwd.error_spec_char && this.state.pwd != "" ? "valid" : ""}
                                    />
                        <InfosPwd open={this.state.open_infos} anchorEl={this.state.anchorEl} errors={this.state.errors.pwd}></InfosPwd>
                        <ValidationTextField 
                                    required
                                    margin="dense"
                                    id="password_verif"
                                    label="Password verification"
                                    name="password_verif"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    error={this.state.errors.verif}
                                    onChange={this.handleVerifPwd.bind(this)}
                                    className={!this.state.errors.verif && this.state.pwd_verif != "" ? "valid" : ""}
                                />
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{"color": "#d32f2f"}} onClick={this.handleCloseDialog.bind(this)}>Cancel</Button>
                        <Button sx={{"color": "#5b8d44"}} onClick={this.handleSubmit.bind(this)}>
                            Register</Button>
                    </DialogActions>
                    <Snackbar open={this.state.open_snack} autoHideDuration={6000} onClose={closeSnack.bind(this)}>
                        <Alert onClose={closeSnack.bind(this)} severity={this.state.snackbar_color} sx={{ width: '100%' }}>
                            {this.state.snackbar_text}
                        </Alert>
                    </Snackbar>
                </Dialog>
            </div>
        );
    }
}

export default DialogBoxRegister;