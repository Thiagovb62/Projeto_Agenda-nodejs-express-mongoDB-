exports.middlewareGlobal = (req, res, next) => {
    res.locals.valLocal = {
        title:'Página Inicial',
    };
    console.log();
    if(req.body.cliente){ 
        console.log(`Vi que voce postou algo sr ${req.body.cliente}`);
    }
    next();
}

exports.checkCsrfError = function (err, req, res, next) {
    if (err && "EBADCSRFTOKEN" === err.code) {
        return res.render('404')
    }
}
exports.checkCsrfGlobal = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}