
const url = "http://127.0.0.1:3000";
let card = document.querySelector('.card');

async function homeApi() {

    let dados = await fetch(url);

    if (!dados.ok) {
        throw new Error(`Erro na requisição: ${dados.status}`);
    }

    let infos = await dados.json()

    console.log("Dados da API:", infos);

    document.getElementById("mensagemApi").innerHTML = infos.mensagem;

}


async function mostrar() {

    let mostrar = url + "/mostrar"

    try {
        let dados = await fetch(mostrar);

        let resp = await dados.json();

        console.log(resp);

        msg = ``
        resp.forEach((resp) => {
            msg += `<tr>`
            msg += `<td> ${resp.nome}</td>`
            msg += `<td> ${resp.idade}</td>`
            msg += `<td> ${resp.profissao}</td>`
            msg += `</tr>`

        })

        document.getElementById("result").innerHTML = msg;

    } catch (erro) {
        console.log("Erro: ", erro);
    }


}


function add() {
    card.classList.add("mostrarCard");
}

function closeCard() {
    card.classList.remove("mostrarCard");
}



async function send() {
    let name = document.getElementById('nome').value
    let idade = document.getElementById('idade').value
    let profissao = document.getElementById('profissao').value

    if (name.trim() == '' || idade.trim() == '' || profissao.trim() == '') {
        alert("fill in all the fields");
        return;
    }

    console.log(name)
    console.log(idade)
    console.log(profissao)

    const usuario = { name, idade, profissao };
    let adicionar = url + "/adicionar";

    try {

        const dados = await fetch(adicionar, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        })


        let resp = await dados.json();
        console.log("Resposta do servidor:", resp);
        alert(resp.mensagem);

    } catch (erro) {
        console.log("erro: ", erro)
        alert("Erro ao enviar dados");
    }




}




mostrar();
homeApi();
