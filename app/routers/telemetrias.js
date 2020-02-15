module.exports = (app) => {
    app.get('/telemetrias', function(req, res, next) {
        if (!req.session.uniqueId) {
            res.redirect('/');
            return next();
        }
        var conn = app.infra.connFactory();
        var telemetrias = new app.infra.TelemetriasDAO(conn);
        telemetrias.lista(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.format({
                    html: function () {
                        res.render('telemetrias', { lista: result });
                    },
                    json: function () {
                        res.json(result);
                    }
                });
            }
        });
        conn.end();
    });
    app.post('/telemetrias/cadastro', (req, res, next) => {
        validaSessao(req, res);
        if(req.body.data === "" || req.body.temperatura === "" || req.body.pressao === ""){
            res.json({
                erro: true,
                msg: 'O objeto Telemetria não pode ser vazio'
            });
        }else {
            var conn = app.infra.connFactory();
            var telemetrias = new app.infra.TelemetriasDAO(conn);
            telemetrias.insert(req.body, function (err, result) {
                if (err) {
                    console.log(err);
                }else{
                    res.method = 'GET';
                    res.redirect('/telemetrias');
                }
            });
            conn.end();
        }
    });
    app.get('/telemetrias/editar/:id', (req, res) => {
        validaSessao(req, res);
        var id = req.params.id;

        var conn = app.infra.connFactory();
        var telemetrias = new app.infra.TelemetriasDAO(conn);
        telemetrias.lista_unica(id, (err, result) => {
            if (err)
                console.log(err);
            else {
                res.render('editar_telemetrias', { lista: result[0] });
            }


        });
        conn.end();
    });
    
    app.delete('/telemetrias/excluir', (req, res) => {
        validaSessao(req, res);
        var id = req.body;
        
        var conn = app.infra.connFactory();
        var telemetrias = new app.infra.TelemetriasDAO(conn);
        telemetrias.delete(id, (err, result) => {
            if (err)
                console.log(err);
            else{
                res.json({
                    status: true,
                    msg : 'Deu boa'
                });
            }
        });
        conn.end();
    });
    var validaSessao = (req, res) => {
        if (!req.session.uniqueId) {
            res.redirect('/');
            return;
        }
    };
}