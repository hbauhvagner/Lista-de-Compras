var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('new', { title: 'Novo cadastro', item: {_id: '', nome: '', quantidade:0} });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    global.db.findOne(id, (err, item) => {
        if (err) { return console.log(err) }
        res.render('new', { title: 'Editar Cadastro', item });
    });
});

router.post('/', function(req, res, next) {
    const id = req.body.id;
    const nome = req.body.nome;
    const quantidade = parseInt(req.body.quantidade);

    if (id) {
        global.id.updateOne(id, {nome, quantidade}, (err, result) => {
            if (err) { return console.log(err); }
            res.redirect('/');
        })
    } else {
        global.db.insert({nome, quantidade}, (err, result) => {
            if (err) { return console.log(err); }
            res.redirect('/');
        })
    }
});



module.exports = router;