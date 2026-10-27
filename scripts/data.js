
const anoAtual = document.querySelector("#anoAtual");
const ultimaModificacao = document.querySelector(
    "#ultimaModificacao"
);

// Exibe o ano atual
anoAtual.textContent = new Date().getFullYear();

// Exibe a data da última modificação do HTML
const dataModificacao = new Date(document.lastModified);

ultimaModificacao.textContent =
    `Última modificação: ${dataModificacao.toLocaleString("pt-BR")}`;
