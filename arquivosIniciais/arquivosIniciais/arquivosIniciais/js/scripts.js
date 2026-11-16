const btnAbrir = document.querySelector("#btnAbrir");
const caixaDialogo = document.querySelector("#caixaDialogo");
const btnFechar = document.querySelector("#btnFechar");

btnAbrir.addEventListener("click", () => {
    caixaDialogo.showModal();
});

btnFechar.addEventListener("click", () => {
    caixaDialogo.close();
});