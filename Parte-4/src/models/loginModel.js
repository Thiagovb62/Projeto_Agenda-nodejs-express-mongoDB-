const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const loginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async logar() {
    this.valida();
    if (this.errors.length > 0) return;
    this.user = await loginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push("Usuario não existe");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push("Senha incorreta");
      this.user = null;
      'return';
    }

  }
  async register() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    try {
      const salt = bcryptjs.genSaltSync(10);
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
      this.user = await loginModel.create(this.body);
    } catch (e) {
      console.log(e);
    }
  }

  async userExists() {
    this.user = await loginModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push("Usuario já existe");
  }

  valida() {
    this.cleanUp();

    //validate email
    !validator.isEmail(this.body.email)
      ? this.errors.push("Email inválido")
      : (this.body.email = this.body.email);
    //validate password
    !validator.isLength(this.body.password, { min: 6, max: 20 })
      ? this.errors.push(
          "Senha deve ter no minimo 6 caracteres e no maximo 20!"
        )
      : (this.body.password = this.body.password);
  }

  cleanUp() {
    for (const key in this.body) {
      typeof this.body[key] !== "string"
        ? (this.body[key] = "")
        : (this.body[key] = this.body[key]);
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
