exports.paginaContato = function (req, res) {
    res.send(`
        <form action="/contato" method="POST">
            Email:  <input type="text" name="email" placeholder="Digite seu email">
            <button>Enviar</button>
</form>
`)};

exports.contatoPost = function (req, res) {
    res.send(`entraremos em contato pelo email ${req.body.email} !`);
}