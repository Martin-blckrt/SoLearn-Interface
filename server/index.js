const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/departements/all", (req, res) => {
    const deps = fs.readdirSync("./server/json/departements/");
    const datas = deps.map(dep=>{
        const content = fs.readFileSync(`./server/json/departements/${dep}/departement-${dep}.json`);
        return JSON.parse(content.toString());
    });
    res.json(datas);
});

app.post("/api/departements/communes/all", (req, res) => {
    console.log(req.body.dep);
    if(req.body.dep){
        const content = fs.readFileSync(`./server/json/departements/${req.body.dep}/communes-${req.body.dep}.json`);
        res.json(JSON.parse(content.toString()));
    }else{
        res.json("Parameters invalid");
    }
});

app.get("*", (req, res)=>{
    res.json("404");
});

app.post("*", (req, res)=>{
    res.json("404");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});