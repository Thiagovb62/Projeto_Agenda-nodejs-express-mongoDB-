const express = require("express"); 
const routes = express.Router();
const homeController = require("./src/controller/homeController");
const loginController = require("./src/controller/loginController");

// Rotas da Home
routes.get("/", homeController.paginaInicia); 

// Rota da Login
routes.get("/login/index", loginController.index);
routes.post("/login/register", loginController.register);
routes.post("/login/login", loginController.login);
routes.get("/login/logout", loginController.logout);
// Exportação das rotas

module.exports = routes;