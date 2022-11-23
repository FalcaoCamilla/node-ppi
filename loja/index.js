const express = require('express');
const cors = require('cors');
//Cross-Origin Resource Sharing (CORS) é um mecanismo para "leitura" de headers http
const bodyParser = require('body-parser');
//responsável por analisar requests bodies
const mysql = require('mysql');
//métodos para manipular o banco de dados

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
//informações recebidas via forms e json
app.use(cors());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loja_ppi'
});

app.listen(3000, () => {
  console.log('Conexão feita');

  connection.connect(err => {
    if(!err){
      console.log('Banco conectado')
    } else {
      console.log('Erro' + err.sqlMessage)
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});


app.get('/produtos', (req, res) => {
  const sql = 'SELECT * from produto';
  connection.query(sql, (erro, dados, campos) => {
    if (!erro){
      res.json({'status': true, 'obj': dados})
    } else {
      res.json({'status': false, 'obj': erro.sqlMessage})
    }
  });
});

app.get('/produtos/:id', (req, res) => {
    let id = req.params.id;
    const sql = 'SELECT * from produto WHERE id = ?';
    connection.query(sql, id, (erro, dados, campos) => {
      if (!erro){
        res.json({'status': true, 'obj': dados})
      } else {
        res.json({'status': false, 'obj': erro.sqlMessage})
      }
    });
});

app.post('/produtos', (req, res) => {
  let prod = req.body;

  if (prod != null && Object.keys(prod).length > 0) {
    let existe = produtos.find(p => p.id == prod.id);
   
    if (!existe) {
        produtos.push(prod);
        res.json({
          "adicionado": true,
          "msg": "Produto adicionado!"});
    } else {
        res.json({
          "adicionado": false,
          "msg": "Id do produto já cadastrado!"});
    }
  } else {
    res.json({
      "adicionado": false,  
      "msg": "Objeto nulo ou vazio!"});
  }
});