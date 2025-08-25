const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let usuarios = [
    {id: 1, nome: "Ana Silva", email:"ana.silva@exemplo.com"},
    {id: 2, nome: "Bruno Costa", email:"bruno.costa@exemplo.com"},
    {id: 3, nome: "Carla Lima", email:"carla.lima@exemplo.com"}
];
let ids = 3;

app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Usuários!');
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;
    if(novoUsuario.nome == undefined || novoUsuario.nome == null) {
        return res.status(400).json({mensagem: "nome e email são obrigatórios."});
    }
    if (novoUsuario.email == undefined || novoUsuario.email == null) {
        return res.status(400).json({mensagem: "nome e email são obrigatórios."});
    }
    novoUsuario.id = ids + 1;
    ids++;
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    const indexUsuario = usuarios.findIndex(u => u.id === idUsuario);

    if (indexUsuario === -1 ) {
        return res.status(404).json({ mensagem: "Usuario não encontrado"})
    }

    usuarios[indexUsuario] = { ...usuarios[indexUsuario], ...dadosAtualizados};
    res.status(200).json(usuarios[indexUsuario]);
}); 

app.delete('/usuarios/:id', (req, res) => {
    const idUsuario = parseInt(req.params.id);
    const indexUsuario = usuarios.findIndex(u => u.id === idUsuario);
    if (indexUsuario === -1) {
        return res.status(404).json({ mensagem: "usuário não encontrado."})
    }
    usuarios.splice(indexUsuario, 1);
    ids--;
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
