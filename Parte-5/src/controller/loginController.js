const Login = require('../models/loginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('logado')
    res.render("login");
}
exports.register = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.register();
        
        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function(){
               return  res.redirect('/login/index');
            });
            return;
        }

        req.flash("success",'Seu usuario foi criado com sucesso');
        req.session.save(function(){
            return  res.redirect('/login/index');
        });
    }
    catch(e){
        console.log(e);
        return res.render('404');
    }
    
};
exports.login = async (req, res) => {
    try{
        const login = new Login(req.body);
        await login.logar();
        
        if (login.errors.length > 0) {
            req.flash("errors", login.errors);
            req.session.save(function(){
               return  res.redirect('/login/index');
            });
            return;
        }

        req.flash("success",'Você está logado');
        req.session.user = login.user;
        req.session.save(function(){
            return  res.redirect('/login/index');
        });
    }
    catch(e){
        console.log(e);
        return res.render('404');
    }
    
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}