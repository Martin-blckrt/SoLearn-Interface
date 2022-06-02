export async function getAllDepartements(){
    try{
        const data = await fetch("http://localhost:8000/geography/departements/all",{
            "method" : "GET",
            "headers" : {
                    "content-type" : "application/json"
                }
        });
        const geojson = await data.json();
        const parsed = JSON.parse(geojson);
        return parsed;
    }catch(e){
        console.log(e);
    }
}

export async function getAllCommunesOfDepartement(code, name){
    try{
        const datas = await fetch("http://localhost:8000/geography/departements/communes/all",{
                "method" : "POST",
                "headers" : {
                    "content-type" : "application/json"
                },
                body:JSON.stringify({
                    "dep": `${code}-${name}`
                })
            });
        const geojson = await datas.json();
        return geojson;
    }catch(e){
        console.log(e);
    }
}

export async function getCityFromCommune(code){
    try{
        const datas = await fetch(`https://geo.api.gouv.fr/communes/${code}?fields=codesPostaux&format=json&geometry=centre`,{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        });
        const city = await datas.json();
        return city;
    }catch(e){
        console.log(e);
    }
}

export async function getCoordsFromCode(code){
    try{
        const datas = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${code},FR&appid=fe4219bc43e2fefcdcf1528cadca3ddd`,{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        });
        const coords = await datas.json();
        return coords;
    }catch(e){
        console.log(e);
    }
}

export async function getMeteoFromCoords(lat, lon){
    try{
        const datas = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=49afb958f2e6418e3e582687eeda45b4`,{
            "method" : "GET",
            "headers" : {
                "content-type" : "application/json"
            }
        });
        const meteo = await datas.json();
        return meteo;
    }catch(e){
        console.log(e);
    }
}

export async function getCommunesFromNameOrCode(attr, query){
    const datas = await fetch("http://localhost:8000/geography/search/communes",{
        "method" : "POST",
        "headers" : {
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            "attr": attr,
            "query" : query
        })
    });  
    const communes = await datas.json();
    return communes; 
}

export async function registerUser(email, pwd, pwd_verif){
    const datas = await fetch("http://localhost:8000/accounts/register",{
        "method" : "POST",
        "headers" : {
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            "email": email,
            "password" : pwd,
            "password2" : pwd_verif
        })
    });  
    const email_user = await datas.json();
    return email_user; 
}

export async function loginUser(email, pwd){
    const datas = await fetch("http://localhost:8000/accounts/login", {
        "method" : "POST",
        "headers":{
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            "email" : email,
            "password" : pwd
        })
    });
    const token = await datas.json();
    return token;
}

export async function verifAccountRequest(verif_token){
    const datas = await fetch("http://localhost:8000/accounts/verification", {
        "method" : "POST",
        "headers":{
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            "" : verif_token,
        })
    });
    const token = await datas.json();
    return token;
}