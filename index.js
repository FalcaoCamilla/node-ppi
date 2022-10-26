let express = require('express');
let cors = require('cors');
let app = express();
app.use(cors());

let info4v = [
    {nome: 'Camilla', matricula: 123, periodo: 4},
    {nome: 'Malu', matricula: 124, preiodo: 4},
    {nome: 'Gabriel', matricula: 125, preiodo: 4}
];

app.listen(3000, () => {
    console.log('Servidor ok')
});

app.get('/', (req, res) => {
    res.send('API com informações da aula - 24/10');
})

app.get('/estudantes', (req, res) => {
    res.json(info4v)
})