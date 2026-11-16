
import { templos, url } from '../data/templos.js';

const mostrarAqui = document.querySelector("#mostrarAqui");

// Referências ao elemento HTML do diálogo
const dialogo = document.querySelector('#meuDialogo');
const titulo = document.querySelector('#meuDialogo h2');
const info = document.querySelector('#meuDialogo p');
const fechar = document.querySelector('#meuDialogo button');

// Fechar o diálogo
fechar.addEventListener("click", () => {
    dialogo.close();
});

function exibirItens(dados) {
    dados.forEach(x => {
        const foto = document.createElement('img');

        foto.src = `${url}${x.caminho}`;
        foto.alt = x.nome;

        mostrarAqui.appendChild(foto);
    });
}

exibirItens(templos);
