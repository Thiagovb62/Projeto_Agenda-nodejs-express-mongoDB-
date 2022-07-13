const mongoose = require("mongoose");
const validator = require("validator");v
const ContactSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required:false,default: ""},
    email: {type: String, required:false,default: ""},
    telefone: {type: Number, required:false,default: ""},
    criandoEm: {type: Date, default: Date.now},

});
const ContactModel = mongoose.model("Contact", ContactSchema);


function Contact(body){
this.body= body;
this.errors = [];
this.contact = null;
}
Contact.prototype.register = function(){
    this.validate();
}
Contact.prototype.valida()=function(){
    this.cleanUp();

    //validate email
    !validator.isEmail(this.body.email)
      ? this.errors.push("Email inválido")
      : (this.body.email = this.body.email);
  }

  Contact.prototype.cleanUp() = function() {
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
module.exports = Contact;
