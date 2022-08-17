const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json()); 

app.get("/", (req,res) => {
    res.send("hola estoy funcionando.");
});

app.post("/", (req,res) => {
    res.send("llamada Post.");
});

app.get("/users", (req,res) => {
    res.send("Get users.");
});

app.get("/users/:id", (req,res) => {
    res.send("Get user");
});

app.post("/users", (req,res) => {
    res.send("Creo usuario");
});

app.put("/users/:id", (req,res) => {
    res.send("modifico un usuario");
});

app.delete("/users/:id", (req,res) => {
    res.send("elimino un usuario");
});

http.listen(PORT,() =>{
    console.log (`Listing to ${PORT}`);
});