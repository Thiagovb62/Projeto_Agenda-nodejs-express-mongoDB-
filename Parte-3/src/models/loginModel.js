const mongoose = require("mongoose");
const validator = require("validator");

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
const loginModel = mongoose.model("Login", LoginSchema);

class Login {

    constructor(body){
        this.body = body;
        this.err = [];
        this.user = null;
    }
    

    register() {
        this.valida();
        if (this.err.length > 0) return;
    }

    valida() {
        this.cleanUp();
        
        //validate email
        !validator.isEmail(this.body.email) ? this.err.push("Email inválido") : this.body.email = this.body.email;
        //validate password
        !validator.isLength(this.body.password, {min: 6,max:20}) ? this.err.push("Senha deve ter no minimo 6 caracteres e no maximo 20!") : this.body.password = this.body.password;
    }

    cleanUp(){
        for (const key in this.body) {
            typeof this.body[key] !== "string" ? this.body[key] = '' : this.body[key] = this.body[key];
            }

            this.body ={
                email: this.body.email,
                password: this.body.password
            };  
        }
    }


module.exports = Login;