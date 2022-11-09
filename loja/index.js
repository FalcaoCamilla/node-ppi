const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

let produtos = [
{
    id: 1,
    nome: 'Smart TV LED 32pol.' ,
    descricao: 'Smart TV LED 32pol. com aplicativos para acesso a Youtube, Netflix, dentre outros.',
    preco: 1999.78,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3862RkSDGn9IY4ZxwUyoGsFeErBRT_1TaI1hFBHBgzsd7gOE4jITQnrw8mGuxThbGIg-vKI&usqp=CAc',
    estoque: 934  
},
{
    id: 2,
    nome: 'Smartphone' ,
    descricao: '32GB, tela 6pol.',
    preco: 783.59,
    imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx0wGMVB2i8dAYm-x_mQ8jJq4Bm4pivGDRjhHFAMfE8CG1xj18Y03ELaflRhEv1MHzrkDmDJc&usqp=CAc',
    estoque: 1200  
},
{
    id: 3,
    nome: 'Multifuncional EPSON Ecotank' ,
    descricao: 'Impressão colorida de 7500 páginas.',
    imagem: 'https://a-static.mlcdn.com.br/195x145/impressora-multifuncional-epson-ecotank-l3150-tanque-de-tinta-wi-fi-colorida-usb/magazineluiza/222018500/c6b5c01aa232921290d6df8b687479ca.jpg',
    preco: 899.10,
    estoque: 231  
}
];

app.listen(3000, () => console.log('server started'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    let id = req.params.id;
    let prod = produtos.filter(p => p.id == id);
    res.json(prod);    
});

app.get('/produtos/:id/preco', (req, res) => {
  let id = req.params.id;
  let prod = produtos.filter(p => p.id == id);
  let preco = prod.map(element => element.preco)
  res.json(preco);    
});

app.post("/produtos", (req, res) => {
  let prod = req.body;

  if (prod != null) {
    let existe = produtos.find((p) => p.id == prod.id);

    if (!existe) {
      produtos.push(prod);
      res.json({
        "adicionado": true,
        "msg": "Produto adicionado!",
      });
    } else {
      res.json({
        "adicionado": false,
        "msg": "Objeto já adicionado.",
      });
    } 
  } else {
    res.json({
      "adicionado": false,
      "msg": "Objeto nulo ou vazio."
    })
  }
});