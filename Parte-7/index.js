require("dotenv").config();

const { application, query } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conectei no banco de dados");
    app.emit("appStarted");
  })
  .catch((e) => console.log(e));
const port = 4000;

const helmet = require("helmet"); // deixa a aplicaçao mais segura 
const crsf = require("csurf"); // protege contra ataques de sites externos
const session = require("express-session"); //cookies para indentificar o usuario logado
const MongoStore = require('connect-mongo'); // salvar as sessoes no banco de dados
const flash = require("connect-flash"); // mensagens de erro (feedback)

const route = require("./routes"); // rotas da aplicaçao
const path = require("path"); // trabalhar com caminhos
const { middlewareGlobal, checkCsrfError, checkCsrfGlobal} = require("./src/middlewares/index");// funçoes que sao executadas antes de qualquer requisiçao ou dps de qualquer requisiçao

app.use(helmet());
app.use(express.urlencoded({ extended: true })); // postar formulario para dentro da app
 // receber json
app.use(express.static(path.resolve(__dirname, "public"))); // arquivos que podem ser acessados publicamente

const sessionOptions = session ({
  secret:'lcklslkalkadaldslçlsdlaçepowéç',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave:false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly:true
  }
  
})

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views")); // arquivos que rederizamos na tela
app.set("view engine", "ejs"); // engine que rederiza html

app.use(crsf())

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(checkCsrfGlobal);
app.use(route);


app.on("appStarted", () => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});

