export const openDialog = function(){
    this.setState({open_dialog : true});
}

export const closeDialog = function(){
    this.setState({open_dialog : false});
}

export const openSnack = function(){
    this.setState({open_snack : true});
}

export const closeSnack = function(){
    this.setState({open_snack : false});
}

export const handleEmailChange = function(e){
    this.setState({email : e.target.value});
}

export const checkErrors = function(errors){
    let res = false;
    let i = 0;
    const keys = Object.keys(errors);
    while(!res && i < keys.length){
        if(typeof errors[keys[i]] != 'boolean'){
            res = checkErrors(errors[keys[i]]);
        }else{
            res = errors[keys[i]];
        }
        i++;
    }
    return res;
}