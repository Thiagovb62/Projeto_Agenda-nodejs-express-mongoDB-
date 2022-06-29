const express = require("express"); 
const routes = express.Router();
const homeController = require("./src/controller/homeController");
const loginController = require("./src/controller/loginController");

// Rotas da Home
routes.get("/", homeController.paginaInicia); 

// Rota da Logim
routes.get("/login", loginController.index);

// Exportação das rotas

module.exports = routes;