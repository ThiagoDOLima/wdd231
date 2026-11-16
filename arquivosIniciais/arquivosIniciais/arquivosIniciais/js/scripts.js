const btnAbrir1 = document.querySelector("#btnAbrir1");
const btnAbrir2 = document.querySelector("#btnAbrir2");
const btnAbrir3 = document.querySelector("#btnAbrir3");
const caixaDialogo = document.querySelector("#caixaDialogo");
const btnFechar = document.querySelector("#btnFechar");
const caixaDialogoTexto = document.querySelector("#caixaDialogo div")

// abre a caixa de dialogo modal 1
btnAbrir1.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = 'Uma Maça contém 95 calorias';
});

// abre a caixa de dialogo modal 2
btnAbrir2.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = 'Uma Laranja contém 45 calorias';
});

// abre a caixa de dialogo modal 3
btnAbrir3.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = 'Uma Banana contém 105 calorias';
});

// fecha a caixa de dialogo modal
btnFechar.addEventListener("click", () => {
    caixaDialogo.close();
});