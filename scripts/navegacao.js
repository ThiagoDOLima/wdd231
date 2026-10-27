
const botaoMenu = document.querySelector("#menu");
const menuLinks = document.querySelector("#menuLinks");

botaoMenu.addEventListener("click", () => {
    const menuAberto = menuLinks.classList.toggle("aberta");

    botaoMenu.setAttribute("aria-expanded", menuAberto);

    if (menuAberto) {
        botaoMenu.setAttribute(
            "aria-label",
            "Fechar menu de navegação"
        );
        botaoMenu.textContent = "✕";
    } else {
        botaoMenu.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );
        botaoMenu.textContent = "☰";
    }
});
