document.addEventListener("DOMContentLoaded", () => {
    // 1. MENU E RODAPÉ (Reutilizado)
    const anoAtualSpan = document.getElementById("ano-atual");
    const ultimaAtualizacaoSpan = document.getElementById("ultima-atualizacao");
    if (anoAtualSpan) anoAtualSpan.textContent = new Date().getFullYear();
    if (ultimaAtualizacaoSpan) ultimaAtualizacaoSpan.textContent = document.lastModified;

    const botaoMenu = document.getElementById("botao-menu");
    const menuPrincipal = document.getElementById("menu-principal");
    if (botaoMenu && menuPrincipal) {
        botaoMenu.addEventListener("click", () => {
            const aberto = menuPrincipal.classList.toggle("aberto");
            botaoMenu.textContent = aberto ? "✕" : "☰";
            botaoMenu.setAttribute("aria-expanded", aberto);
        });
    }
});    