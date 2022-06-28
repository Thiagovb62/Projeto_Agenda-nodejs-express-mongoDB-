const express = require("express"); 
const routes = express.Router();
const homeController = require("./src/controller/homeController");
const contactController = require("./src/controller/contactController");


// Rotas da Home
routes.get("/", homeController.paginaInicia); 
routes.post("/", homeController.homePost);

// Rota da página de contato
routes.get("/contato", contactController.paginaContato);
routes.post("/contato", contactController.contatoPost);
// Exportação das rotas

module.exports = routes;