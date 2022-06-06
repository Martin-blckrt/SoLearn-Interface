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
import Card from 'react-credit-cards';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './paymentUtils';
import styles from './paymentStyle.css';

import 'react-credit-cards/es/styles-compiled.css';
import StyledTextField from "../inputs/StyledTextField";

class DialogBoxLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open_dialog : false,
            open_snack : false,
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '',
            formData: null,
            openedFrom: props.openedFrom,
        };
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { issuer } = this.state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        this.setState({ formData });
        this.form.reset();
    };

    render(){
        return(
            <div>
                {this.state.openedFrom === 'header' ? (
                    <div className="premiumContainer" onClick={openDialog.bind(this)}
                         style={{display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             color: '#FFFFFF',
                             cursor: 'pointer',
                             backgroundImage: 'url($"../../assets/mask.png")',
                             backgroundSize: 'cover',
                             borderRadius: '20px',
                             padding: '8px 15px',
                             height: '30px',
                             width: '120px'
                         }}>
                        Get premium
                    </div>
                ) : (
                    <div>
                        Subscribe to
                        <p style={{color: '#0BDA51', display: "contents", fontSize: '25px', fontWeight: '500', cursor: 'pointer'}}
                           onClick={openDialog.bind(this)}> premium </p>
                        for more estimations and the financial estimate !
                    </div>
                    )}
                <Dialog open={this.state.open_dialog}>
                    <DialogTitle>Subscribe to premium</DialogTitle>
                        <DialogContent>
                            <DialogContentText style = {{marginBottom: '10px'}}>
                                Enter your card details.
                            </DialogContentText>


                            <Card
                                number={this.state.number}
                                name={this.state.name}
                                expiry={this.state.expiry}
                                cvc={this.state.cvc}
                                focused={this.state.focused}
                                callback={this.handleCallback}
                            />
                            <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}
                                  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <div className="form-group">
                                    <StyledTextField
                                        type="tel"
                                        name="number"
                                        className="form-control"
                                        inputProps={{ maxLength: 19 }}
                                        placeholder="Card Number"
                                        pattern="[\d| ]{16}"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        sx = {{marginBottom: '10px'}}
                                    />
                                </div>
                                <div className="form-group">
                                    <StyledTextField
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Name"
                                        required
                                        onChange={this.handleInputChange}
                                        onFocus={this.handleInputFocus}
                                        sx = {{marginBottom: '10px'}}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <StyledTextField
                                            type="tel"
                                            name="expiry"
                                            className="form-control"
                                            placeholder="Valid thru"
                                            pattern="\d\d/\d\d"
                                            required
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                            sx = {{marginBottom: '10px'}}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <StyledTextField
                                            type="tel"
                                            name="cvc"
                                            className="form-control"
                                            placeholder="CVC"
                                            pattern="\d{3,4}"
                                            required
                                            onChange={this.handleInputChange}
                                            onFocus={this.handleInputFocus}
                                        />
                                    </div>
                                </div>
                                <input type="hidden" name="issuer" value={this.state.issuer} />
                            </form>




                        </DialogContent>
                        <DialogActions>
                            <Button sx={{"color": "#d32f2f"}} onClick={closeDialog.bind(this)}>Cancel</Button>
                            <Button sx={{"color": "#5b8d44"}} type="submit"/*onClick={this.handleSubmit.bind(this)}*/>
                                Pay</Button>
                        </DialogActions>
                    <Snackbar open={this.state.open_snack} autoHideDuration={6000} onClose={closeSnack.bind(this)}>
                        <Alert onClose={closeSnack.bind(this)} severity="error" sx={{ width: '100%' }}>
                            Invalid card info !
                        </Alert>
                    </Snackbar>
                </Dialog>
            </div>
        );
    }
}

export default DialogBoxLogin;
