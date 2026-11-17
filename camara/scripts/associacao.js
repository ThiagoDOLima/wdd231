// Rodapé
document.querySelector("#ano-atual").textContent = new Date().getFullYear();
document.querySelector("#ultima-atualizacao").textContent = document.lastModified;

// Menu (mesmo comportamento do botão ☰). Ajuste a classe "aberto" ao que seu CSS usa
const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu-principal");
botaoMenu.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
});

// Data e hora em que o formulário foi carregado
document.querySelector("#timestamp").value = new Date().toISOString();

// Nenhum nível vem marcado: o usuário precisa escolher (o campo é obrigatório)
document.querySelector("#nivel").selectedIndex = -1;

// Modais dos níveis de associação
document.querySelectorAll("[data-modal]").forEach((link) => {
    link.addEventListener("click", (evento) => {
        evento.preventDefault();
        document.getElementById(link.dataset.modal).showModal();
    });
});

document.querySelectorAll("dialog").forEach((modal) => {
    modal.querySelector(".fechar").addEventListener("click", () => modal.close());
    // Clicar fora da caixa também fecha
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) modal.close();
    });
});
