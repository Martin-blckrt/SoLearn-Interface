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
                    "content-type" : "application/json",
                    'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`
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
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${code},FR&appid=fe4219bc43e2fefcdcf1528cadca3ddd`,{
            "method" : "GET"
        });
        if(res.ok){
            const coords = await res.json();
            return coords;
        }
    }catch(e){
        console.log(e);
    }
}

export async function getMeteoFromCoords(lat, lon){
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=49afb958f2e6418e3e582687eeda45b4`,{
            "method" : "GET"
        });
        if(res.ok){
            const meteo = await res.json();
            console.log(meteo);
            return meteo;
        }
        console.log(res);
    }catch(e){
        console.log(e);
    }
}

export async function getSolarFromCoords(lat, lon){
    try{
        const res = await fetch(`https://api.solcast.com.au/world_radiation/forecasts?latitude=${lat}&longitude=${lon}&hours=48&api_key=bm6u4mB_RRGjzJb_OFKvMbuVdfjS9bMl`,{
            "method" : "GET",
            "headers" : {
                'Accept' : "application/json"
            }
        });
        if(res.ok){
            const solar = await res.json();
            return solar;
        }
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

export async function registerUser(email, pwd){
    const datas = await fetch("http://localhost:8000/accounts/register",{
        "method" : "POST",
        "headers" : {
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            "email": email,
            "password" : pwd
        })
    });
    const email_user = await datas.json();
    return {email_user, status : datas.status}; 
}

export async function loginUser(email, pwd){
    try{
        const res = await fetch("http://localhost:8000/accounts/login", {
            "method" : "POST",
            "headers":{
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                "email" : email,
                "password" : pwd
            })
        });
        if(res.status != 200){
            throw new Error(res.status);
        }
        const token = await res.json();
        return token;
    }catch(error){
        throw new Error(error);
    }
}

export async function verifAccountRequest(verif_token){
    const datas = await fetch("http://localhost:8000/accounts/confirmation", {
        "method" : "POST",
        "headers":{
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            "token" : verif_token,
        })
    });
    const token = await datas.json();
    return token;
}

export async function checkToken(){
    if(window.localStorage.getItem("access_token") != null && window.localStorage.getItem("refresh_token") != null){
        return true;
    }else{
        return false;
    }
}