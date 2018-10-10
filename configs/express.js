var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var load = require('express-load');

//Permite configurar arquivos estáticos
app.use(express.static('./node_modules'));//add locais estáticos
app.use(express.static('./app/public'));//esse é para a pasta LIB do DAVI

app.use(bodyParser.urlencoded({extended: true}));
//sempre será executado ao receber uma requisição
app.use(bodyParser.json());//body-parser aceita o tipo JSON

app.set('view engine', 'ejs');

//pasta onde ficarão as views
app.set('views', './app/views');

app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = function(){
    load('routes', {cwd: 'app'})//carrega os módulos relacionados as rotas
		.then('infra')//correga os módulos relacionados ao DAO
		.into(app);
    return app;
}