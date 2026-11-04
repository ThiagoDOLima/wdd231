const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';


const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    console.table(dados.profetas); // teste temporário de resposta de dados
}

obterDadosDeProfetas();

async function obterDadosDeProfetas(url) {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    // console.table(dados.profetas);
    exibirProfetas(dados.profetas); // observe que você faz referência ao array profetas do objeto de dados JSON, não apenas ao objeto
}

obterDadosDeProfetas();