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

app.engine('html', require('ejs').renderFile);

//importaciones
const UsrController = require('./controllers/user');
const ScoController = require('./controllers/score');

//pagina de login
app.get("/login", (req,res) => {
    res.render ("index.html");
});

//levanta el servidor.
http.listen(PORT,() =>{
    console.log (`Listing to ${PORT}`);
});

//obtiene un usuario
app.get("/usuario/:id",async (req,res) =>{
    let userId =  req.params.id;
    try{
      user = await UsrController.getUser(userId);
      res.status(200).json(user);
    }catch(error){
      res.status(500).send("Error");
    }
});

//obtiene todos los puntos
app.get("/obtienescore",async (req,res) =>{

  let limit = req.query.limit;
  let offset = req.query.offset;

  try{
      const results = await ScoController.getAllScore(limit,offset);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. No se pudo obtener score.")
  }

});

//obtiene los puntos del usuario
app.post("/obtienemiscore",async (req,res) =>{

  let limit = req.body.limit;
  let userid = req.body.userid;
  

  try{
    user = await UsrController.getUser(userid);
      const results = await ScoController.getScore(limit,user);
      res.status(200).json(results);

  }catch(error){
      res.status(500).send("Error. No se pudo obtener mi score.")
  }

});


//inserta el score
app.get("/creascore",async (req,res) =>{
  let punto = req.body.punto;
  let dificultad = req.body.dificultad;
  let usuarioid = req.body.usuarioid;

  try{
    user = await UsrController.getUser(usuarioid);
    const result = await ScoController.addScore(punto,dificultad,user);
    if(result){
      res.status(201).send("score creado correctamente"); // 201
    }else{
      res.status(409).send("Error al intentar guardar el score"); // 409
    }  
  }catch(error){
    res.status(500).send("Error interno."); //500
  }  
});



// Creo un nuevo usuario
app.post("/users",async (req,res) =>{
    
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
    try{
      const result = await UsrController.addUser(name,lastname,email,isActive,password);
      if(result){
        res.status(201).send("Usuario creado correctamente"); // 201
      }else{
        res.status(409).send("El usuario ya existe"); // 409
      }  
    }catch(error){
      res.status(500).send("Error al crear el usuario."); //500
    }  
    
});

//conexion a la base de datos.
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));