let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());

let info4v = [
    {nome: 'Camilla', matricula: 123, periodo: 4},
    {nome: 'Malu', matricula: 124, periodo: 4},
    {nome: 'Gabriel', matricula: 125, periodo: 4}
];

app.listen(3000, () => {
    console.log('Servidor ok')
});

app.get('/', (req, res) => {
    res.send('API com informações da aula - 24/10');
});

app.get('/estudantes', (req, res) => {
    res.json(info4v)
});

app.get('/estudantes/:mat', (req, res) => {
    let mat = req.params.mat;
    let est = {};
    info4v.forEach(e => {
        if (e.matricula == mat){
            est = e;
        }
    });
    res.json (est);
    //let est = info4v.filter(e => e.matricula == mat)[0];
})

app.delete('/estudantes/:mat', (req, res) => {
    let mat = req.params.mat;
    info4v.forEach(e => {
        if (e.matricula == mat){
            let pos = info4v.indexOf(e);
            info4v.splice(pos, 1);
        }
    });
    res.json(info4v)
});

/*
app.delete('/estudantes/:mat', (req, res) => {
    let mat = req.params.mat;
    let est = info4v.find(e => e.matricula == mat);
    let removido = false;
    if(est){
        info4v.splice(pos, 1);
        removido = true;
    }
    res.json({"apagado": removido});
})
*/