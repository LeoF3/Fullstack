const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config();
let fs = require('fs');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

let path = require('path');
app.use(express.static(path.join(__dirname, '/')));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.engine('html', require('ejs').renderFile);

//importaciones
const UsrController = require('./controllers/user');
const ScoController = require('./controllers/score');
const SudController = require('./controllers/sudo');
const { Console } = require("console");

//constantes
const pagina_no_encontrada="No se encontro el archivo.";

//***************INICIO PAGINA LOGIN***************//
//*************************************************//
//Pagina de login post
app.post("/login", (req, res) => {
  fs.readFile('./views/login.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write(pagina_no_encontrada);
    } else {
      res.write(data);
    }
    res.end();
  });
});
//Pagina de login get
app.get("/login", (req, res) => {
    fs.readFile('./views/login.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write(pagina_no_encontrada);
    } else {
      res.write(data);
    }
    res.end();
  });
});
// Creo un nuevo usuario
app.post("/users", async (req, res) => {

  let email = req.body.email;
  let password = req.body.pass;
  let roles = req.body.roles;
  try {
    const result = await UsrController.addUser(email, password, roles);

    if (result) {
      res.status(201).json("login?var1=Usuario Creado " + email); // 201
    } else {
      res.status(409).json("login?var1=El usuario ya existe"); // 409
    }
  } catch (error) {
    res.status(500).json("login?var1=Error al crear el usuario."); //500
  }
});
//busca usuario e intenta logueo
app.post("/logueo", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  res.cookie("usuarioLogueo", email);

  try {
    const result = await UsrController.logueoUser(email, pass);
    if (result) {
      if (result.roles == 'admin') {
        res.status(200).json("admin");
      } else {
        res.status(200).json("index");
      }
    } else {
      res.status(409).json("login?var1=Usuario Inexistente / password erroneo"); // 409
    }
  }
  catch (error) {
    res.status(500).json("login?var1=Error interno."); //500
  }
});
//***************FIN PAGINA LOGIN******************//
//*************************************************//
//-------------------------------------------------//
//***************INICIO PAGINA ADMIN***************//
//*************************************************//
//pagina de admin
app.post("/admin", (req, res) => {
  fs.readFile('./views/admin.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write(pagina_no_encontrada);
    } else {
      res.write(data);
    }
    res.end();
  });
});
//inserta un sudoku
app.post("/creasudoku", async (req, res) => {
  let SudokuR = req.body.SudokuR;
  let ISudoku = req.body.ISudoku;
  let SudokuA = req.body.SudokuA;
  try {
    const result = await SudController.addSudo(SudokuR, ISudoku, SudokuA);
    if (result) {
      res.status(201).json("admin?var1=Operacion Realizada: " + result); // 201
    } else {
      res.status(409).json("admin?var1=Operacion Realizada: Error al intentar guardar el sudoku"); // 409
    }
  } catch (error) {
    res.status(500).json("admin?var1=Error interno creando Sudoku"); //500
  }
});
//obtiene todo los sukokus
app.get("/obtienesudoku", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;
  let SudokuA = req.query.SudokuA;
  let count = req.query.count;

  try {
    let results;
    if (count == undefined) {
      results = await SudController.getAllSudo(limit, offset, SudokuA);
    } else {
      results = await SudController.getSudoCount();
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. No se pudo obtener sudoku.")
  }
});
//***************FIN PAGINA ADMIN******************//
//*************************************************//
//-------------------------------------------------//
//**************INICIO PAGINA INDEX****************//
//*************************************************//

//--/obtienesudoku se encuentra en admin

//pagina donde esta sudoku
app.post("/index", (req, res) => {
  fs.readFile('./views/index.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write(pagina_no_encontrada);
    } else {
      res.write(data);
    }
    res.end();
  });
});
//crea e inserta una puntacion
app.post("/creascore", async (req, res) => {
  let punto = req.body.punto;
  let dificultad = req.body.dificultad;
  let usuarioLogueo = req.cookies.usuarioLogueo;

  try {
    user = await UsrController.getUserMail(usuarioLogueo);
    const result = await ScoController.addScore(punto, dificultad, user);
    if (result) {
      //res.status(200).json("admin");
      res.status(200).json("index?var1=score creado correctamente"); // 200
    } else {
      res.status(409).json("index?var1=Error al intentar guardar el score"); // 409
    }
  } catch (error) {
    res.status(500).json("index?var1=Error interno guardando score"); //500
  }
});
//***************FIN PAGINA INDEX******************//
//*************************************************//
//-------------------------------------------------//
//***********INICIO PAGINA LISTADOESCORE***********//
//*************************************************//
//pagina de admin
app.post("/listadoscore", (req, res) => {
  fs.readFile('./views/listadoscore.html', null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write(pagina_no_encontrada);
    } else {
      res.write(data);
    }
    res.end();
  });
});
//obtiene todos los puntos
app.get("/obtienescore", async (req, res) => {

  let limit = req.query.limit;
  let usuario = req.cookies.usuarioLogueo;
  try {
    let user = await UsrController.getUserMail(usuario);
    const results = await ScoController.getScore(limit, user);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json("login?var1= No se pudo obtener sus puntajes");
  }
});
//************FIN PAGINA LISTADOESCORE*************//
//*************************************************//
//-------------------------------------------------//
//****************INICIO  SISTEMA******************//
//*************************************************//

//levanta el servidor.
http.listen(PORT, () => {
  console.log(`Listing to ${PORT}`);
});
//conexion a la base de datos.
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

//*****************FIN  SISTEMA********************//
//*************************************************//
//-------------------------------------------------//

//obtiene un usuario
app.get("/usuario/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    user = await UsrController.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error");
  }
});
//obtiene los puntos del usuario
app.post("/obtienemiscore", async (req, res) => {
  let limit = req.body.limit;
  let userid = req.body.userid;
  try {
    user = await UsrController.getUser(userid);
    const results = await ScoController.getScore(limit, user);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. No se pudo obtener mi score.")
  }
});

