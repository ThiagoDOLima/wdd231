// Rodapé
document.querySelector("#ano-atual").textContent = new Date().getFullYear();
document.querySelector("#ultima-atualizacao").textContent = document.lastModified;

// Menu
const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu-principal");
botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
});

// Resumo com os campos obrigatórios enviados pelo formulário
const dados = new URLSearchParams(window.location.search);
const resumo = document.querySelector("#resumo");

const campos = [
    ["nome", "Nome"],
    ["sobrenome", "Sobrenome"],
    ["email", "E-mail"],
    ["celular", "Celular"],
    ["organizacao", "Empresa/organização"],
    ["timestamp", "Data e hora do pedido"],
];

campos.forEach(([chave, rotulo]) => {
    let valor = dados.get(chave) || "—";
    if (chave === "timestamp" && dados.get(chave)) {
        valor = new Date(valor).toLocaleString("pt-BR");
    }
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = rotulo;
    dd.textContent = valor;
    resumo.append(dt, dd);
});
