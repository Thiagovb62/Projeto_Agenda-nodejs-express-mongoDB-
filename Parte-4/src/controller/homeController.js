const HomeModel = require("../models/HomeModel");

    
exports.paginaInicia = function (req, res) {
  res.render("index",{
    title: "Página Inicial",
    nome: "João",
  });

};

exports.homePost = function (req, res,next) {
  res.send(`<h2>formulário enviado com sucesso sr ${req.body.cliente} !</h2>`);
  next();
};
