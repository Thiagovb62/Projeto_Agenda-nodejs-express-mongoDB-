exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.user = req.session.user;
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }

  next();
};

exports.checkCsrfGlobal = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
exports.LoginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash("errors", "Você precisa estar logado para acessar essa página");
    req.session.save(function () {
      res.redirect("/");
      return;
    });
  }
  next();
};
