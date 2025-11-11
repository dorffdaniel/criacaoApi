
const http = require('http');

let usuarios = [];

const server = http.createServer((req, res) => {
    res.statusCode = 200

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // 🔹 Preflight OPTIONS
    if (req.method === "OPTIONS") {
        res.writeHead(204); // sem conteúdo
        res.end();
        return;
    }


    if (req.url == '/') {
        res.statusCode = 200

        res.end(JSON.stringify({ mensagem: "Bem vindo ao Servidor Api" }))
    }

    else if (req.url == '/mostrar') {
        res.statusCode = 200

        let resp = [{
            nome: 'carlos',
            idade: 26,
            profissao: 'professor'
        },
        {
            nome: "julia",
            idade: 45,
            profissao: "programadora"
        }
        ];

        res.end(JSON.stringify(resp));

    } else if (req.url == '/adicionar' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const dados = JSON.parse(body);

                // Adiciona ao array
                usuarios.push(dados);

                console.log("Usuários atuais:", usuarios);

                res.end(JSON.stringify({
                    mensagem: `Usuário ${dados.nome} adicionado com sucesso!`,
                    dadosRecebidos: dados
                }));
            } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ erro: "JSON inválido" }));
            }
        });

    } else {
        res.statusCode = 404
        res.end(JSON.stringify({ erro: "pagina nao encontrada " }));
    }

});


server.listen(3000, () => {
    console.log("servidor sendo executado na parta 3000")
})

module.exports = server;