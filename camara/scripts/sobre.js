
import { atracoes } from "../dados/atracoes.mjs";

// ======================================
// MENU DE NAVEGAÇÃO
// ======================================

const botaoMenu = document.querySelector("#botao-menu");
const menuPrincipal = document.querySelector("#menu-principal");

if (botaoMenu && menuPrincipal) {
    botaoMenu.addEventListener("click", () => {
        const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

        botaoMenu.setAttribute("aria-expanded", String(!aberto));
        botaoMenu.setAttribute(
            "aria-label",
            aberto ? "Abrir menu de navegação" : "Fechar menu de navegação"
        );

        menuPrincipal.classList.toggle("aberto");
    });
}

// ======================================
// EXIBIR OS PONTOS DE INTERESSE
// ======================================

const listaAtracoes = document.querySelector("#lista-atracoes");

function exibirAtracoes() {
    if (!listaAtracoes) return;

    listaAtracoes.innerHTML = atracoes.map((atracao) => `
        <article class="cartao-atracao area-${atracao.id}">

            <h2>${atracao.nome}</h2>

            <figure>
                <img
                    src="${atracao.imagem}"
                    alt="${atracao.nome}"
                    width="300"
                    height="200"
                    loading="lazy">
            </figure>

            <address>${atracao.endereco}</address>

            <p>${atracao.descricao}</p>

            <button
                class="botao-saiba-mais"
                type="button"
                data-endereco="${atracao.endereco}">
                Saiba mais
            </button>

        </article>
    `).join("");

    // Botões de localização
    document.querySelectorAll(".botao-saiba-mais").forEach((botao) => {
        botao.addEventListener("click", () => {
            const endereco = botao.dataset.endereco;

            const destino = new URL("https://www.google.com/maps/search/");
            destino.searchParams.set("api", "1");
            destino.searchParams.set("query", endereco);

            window.open(destino.href, "_blank", "noopener,noreferrer");
        });
    });
}

exibirAtracoes();

// ======================================
// CONTROLE DA ÚLTIMA VISITA
// ======================================

const mensagemVisitante = document.querySelector("#mensagem-visitante");

function verificarUltimaVisita() {
    const chave = "ultimaVisitaSobre";
    const agora = Date.now();

    const ultimaVisita = localStorage.getItem(chave);

    if (!ultimaVisita) {

        mensagemVisitante.textContent =
            "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";

    } else {

        const diferenca = agora - Number(ultimaVisita);

        const umDia = 1000 * 60 * 60 * 24;

        if (diferenca < umDia) {

            mensagemVisitante.textContent =
                "Já voltou? Que legal!";

        } else {

            const dias = Math.floor(diferenca / umDia);

            mensagemVisitante.textContent =
                `Seu último acesso foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
        }
    }

    localStorage.setItem(chave, agora);
}

if (mensagemVisitante) {
    verificarUltimaVisita();
}

// ======================================
// INFORMAÇÕES DO RODAPÉ
// ======================================

const anoAtual = document.querySelector("#ano-atual");
const ultimaAtualizacao = document.querySelector("#ultima-atualizacao");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

if (ultimaAtualizacao) {
    ultimaAtualizacao.textContent = document.lastModified;
}
