import express from 'express';
import db from './config/dbConnect.js';
import livros from './models/Livros.js';

db.on("erro", console.log.bind(console, "Erro na Conexão!"));
db.once("open", () =>{
    console.log("Banco de dados conectado!")
})

const app = express();
app.use(express.json());

/*const livros = [
    {id:1, "titulo":"Aprendendo javaScript"},
    {id: 2, "titulo": "Aprendendo node"},
    {id: 3, "titulo": "Desvendadno o protocolo HTTP"}
]

const editoras = [
    {id:1, "nome":"Editora SENAC"},
    {id: 2, "nome": "Editora Recife"},
    {id: 3, "nome": "Editora Pernambuco"}
]*/

//Rota Principal
app.get('/', (req, res) =>{
    res.status(200).send({menssage: "Pagna principal!"});
})

//Exibir todos os Livro
app.get('/livros', (req, res) =>{
//utilizando o metodo .find() para retornar os dados
    livros.find((err, livros) =>{
        res.status(200).json(livros);
    })
})

//Consultar livro por id
app.get('/livros/:id',(req, res) => {
    //salvando o id de uma variavel
    const id = req.params.id
    //utilizando o findbyid para retornar livro por id
    livros.findById(id, (err, livros) =>{
        if(err){
            res.status(400).send("Erro na conexão!")
        }else{
            res.status(200).send(livros)
        }
    })
})

//Atualizar livro por id
app.put('/livros/:id', (req, res) => {
    //salvando o id em uma variavel
    const id = req.params.id;
    //utilizando o metodo que localiza pelo id e atualiza
    livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: 'Livro atualizado com sucesso!!'})
        }
    })
})

//Excluindo um livro por id
app.delete('/livros/:id',(req, res) => {
    const id = req.params.id;
    livros.findByIdAndDelete(id, (err) =>{
        if(err){
            res.status(500).send({message: err.message})
        }else{
            res.status(200).send({message: 'Livro excluido com sucesso!!'})
        }
    });
})


/*app.get('/editoras', (req, res) =>{
    res.status(200).send(editoras);
})*/

//Cadastrando um novo livro
app.post('/livros',(req, res) => {
    //criando variavel que recebe o conteudo passado em body
    let livro = new livros(req.body);
    //persistindo ele no banco
    livro.save((err) =>{
        if(err){
            res.status(500).send("Erro ao salvar o livro!")
        }else{
            res.status(201).send(livro.toJSON())
        }
    })
})

function buscarlivro(id){
    return livros.findIndex(livro => livro.id ==id)
}

export default app