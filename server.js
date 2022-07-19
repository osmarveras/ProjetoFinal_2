//importanto modulo http

/*const http = require('http');

const port = 3000;

const rotas = {
    '/': 'API Livros',
    '/livros': 'Pagina principalnpm livros',
    '/cadlivros': "cadastro de livros",
    '/deletarlivros': 'Exclusão de livros',
}

const server = http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(rotas[req.url]);
})

server.listen(port, () => {
    console.log(`Servidor está rodando http://localhost:${port}`)
});*/

import app from './src/app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor está rodando http://localhost:${port}`)
});
