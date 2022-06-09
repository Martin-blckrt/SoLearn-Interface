import React, {useState} from "react";
import '../styles/header.css';
import logo from "../assets/Logo.png";
import {Link} from "react-router-dom";
import {
    Chip,
    ListItemIcon,
    Menu,
    MenuItem, Snackbar
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Logout} from "@mui/icons-material";
import {logout, isLoggedIn} from "../utils/auth";
import TextField from "@mui/material/TextField";
import DialogBoxLogin from "./dialog_box/DialogBoxLogin";
import DialogBoxRegister from "./dialog_box/DialogBoxRegister";
import DialogBoxPremium from "./dialog_box/DialogBoxPremium";

export default class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            is_logged : isLoggedIn(),
            open : false,
            open_snack : false,
            credentials : {
                username : "admin",
                premium_user : false
            }
        };
        this.chip_ref = null;

        this.setChipRef = elt =>{
            this.chip_ref = elt;
        }
    }

    refreshLogin(is_logged){
        this.setState({is_logged : is_logged});
    }

    handleClickChip(){
        this.setState({open : !this.state.open});
    };

    handleLogout(){
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        window.location.reload();
    };

    render(){
        return (
            <div className="topContainer">
                <a href="/">
                    <div className="logoContainer">
                        <img className="logoImg" src={logo} alt="logo" />
                        <div className="logoText">
                            SoLearn
                        </div>
                    </div>
                </a>
                <div className="endContainer">
                    <Link to="/about">
                        {this.props.aboutLoc ? (
                            <div className="aboutContainer" style={{fontWeight: 500}}>
                                About
                            </div>
                        ) : (
                            <div className="aboutContainer">
                                About
                            </div>
                        )}
                    </Link>
                    {this.state.is_logged ? (
                        <div className="notPremiumContainer">
                            <Link to="/map">
                                {!this.props.aboutLoc ? (
                                    <div className="aboutContainer" style={{fontWeight: 500}}>
                                        Map
                                    </div>
                                ) : (
                                    <div className="aboutContainer">
                                        Map
                                    </div>
                                )}
                            </Link>

                            <div className="accountContainer">
                                <Chip icon={<AccountCircleIcon fontSize="large"/>}
                                    sx={{ width: "200px", height: "50px", color: "#005403", borderColor: "#005403" }}
                                    label="Olivier Giroud"
                                    color="success"
                                    variant="outlined"
                                    ref={this.setChipRef.bind(this)}
                                    onClick={this.handleClickChip.bind(this)}/>
                                <Menu
                                    anchorEl={this.chip_ref}
                                    id="account-menu"
                                    open={this.state.open}
                                    // onClose={handleClose}
                                    // onClick={handleClose}
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
                                        this.handleClickChip()
                                        logout(this.handleLogout.bind(this))
                                    }}>
                                        <ListItemIcon>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                                {!this.state.credentials.premium_user ? (
                                    <div className="notPremiumContainer">
                                        <DialogBoxPremium openedFrom={"header"}></DialogBoxPremium>
                                    </div>
                                ) : (<div/>)}
                            </div>
                        </div>
                    ) : (
                        <div className="notPremiumContainer">
                            <DialogBoxLogin openedFrom={"header"} refreshLogin={this.refreshLogin.bind(this)}></DialogBoxLogin>
                            <DialogBoxRegister openedFrom={"header"}></DialogBoxRegister>
                            <DialogBoxPremium openedFrom={"header"}></DialogBoxPremium>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
