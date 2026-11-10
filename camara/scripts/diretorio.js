
document.addEventListener("DOMContentLoaded", () => {

    // 1. Atualização do rodapé

    const anoAtualSpan = document.getElementById("ano-atual");
    const ultimaAtualizacaoSpan = document.getElementById("ultima-atualizacao");

    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    if (ultimaAtualizacaoSpan) {
        ultimaAtualizacaoSpan.textContent = document.lastModified;
    }


    // 2. Menu responsivo para dispositivos móveis

    const botaoMenu = document.getElementById("botao-menu");
    const menuPrincipal = document.getElementById("menu-principal");

    if (botaoMenu && menuPrincipal) {

        botaoMenu.addEventListener("click", () => {

            const menuAberto = menuPrincipal.classList.toggle("aberto");

            botaoMenu.textContent = menuAberto ? "✕" : "☰";

            botaoMenu.setAttribute("aria-expanded", menuAberto);

            botaoMenu.setAttribute(
                "aria-label",
                menuAberto
                    ? "Fechar menu de navegação"
                    : "Abrir menu de navegação"
            );

        });

        // Fecha o menu após clicar em um link de navegação.

        menuPrincipal.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                menuPrincipal.classList.remove("aberto");

                botaoMenu.textContent = "☰";

                botaoMenu.setAttribute("aria-expanded", "false");

                botaoMenu.setAttribute(
                    "aria-label",
                    "Abrir menu de navegação"
                );

            });

        });

    }


    // 3. Elementos do diretório de empresas

    const listaEmpresasContainer = document.getElementById("lista-empresas");

    const btnGrade = document.getElementById("visualizacao-grade");

    const btnLista = document.getElementById("visualizacao-lista");

    let membrosData = [];


    // Identificação dos níveis dos membros.

    const rotulosNivel = {
        1: "Membro",
        2: "Prata",
        3: "Ouro"
    };


    // 4. Carregar empresas do arquivo JSON

    async function carregarMembros() {

        if (!listaEmpresasContainer) {
            return;
        }

        try {

            const resposta = await fetch("dados/membros.json");

            if (!resposta.ok) {
                throw new Error(`Erro de HTTP: ${resposta.status}`);
            }

            membrosData = await resposta.json();

            // Verifica se os dados recebidos são uma lista válida.

            if (!Array.isArray(membrosData)) {
                throw new Error(
                    "O arquivo JSON não contém uma lista válida de empresas."
                );
            }

            exibirMembrosGrade(membrosData);

        } catch (erro) {

            console.error("Erro ao carregar os dados dos membros:", erro);

            listaEmpresasContainer.innerHTML = `
                <p>
                    Erro ao carregar o diretório de empresas.
                    Tente novamente mais tarde.
                </p>
            `;

        }

    }


    // 5. Exibir empresas em formato de grade

    function exibirMembrosGrade(membros) {

        if (!listaEmpresasContainer) {
            return;
        }

        listaEmpresasContainer.className = "grade-empresas";

        listaEmpresasContainer.innerHTML = "";

        membros.forEach((membro) => {

            const cartao = document.createElement("article");

            cartao.className = `cartao-membro nivel-${membro.nivel}`;

            cartao.innerHTML = `
                <div class="cartao-imagem">

                    <img
                        src="${membro.imagem}"
                        alt="Logo de ${membro.nome}"
                        loading="lazy"
                    >

                    <span class="badge-nivel">
                        ${rotulosNivel[membro.nivel] || "Membro"}
                    </span>

                </div>

                <div class="cartao-corpo">

                    <h3>${membro.nome}</h3>

                    <p class="descricao">
                        ${membro.descricao}
                    </p>

                    <p>
                        <strong>Endereço:</strong>
                        ${membro.endereco}
                    </p>

                    <p>
                        <strong>Telefone:</strong>
                        ${membro.telefone}
                    </p>

                    <a
                        href="${membro.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-site"
                    >
                        Visitar Website
                    </a>

                </div>
            `;

            listaEmpresasContainer.appendChild(cartao);

        });

    }


    // 6. Exibir empresas em formato de lista

    function exibirMembrosLista(membros) {

        if (!listaEmpresasContainer) {
            return;
        }

        listaEmpresasContainer.className = "lista-empresas";

        listaEmpresasContainer.innerHTML = "";

        membros.forEach((membro) => {

            const item = document.createElement("article");

            item.className = `item-membro-lista nivel-${membro.nivel}`;

            item.innerHTML = `
                <h3>
                    ${membro.nome}
                    <small>
                        (${rotulosNivel[membro.nivel] || "Membro"})
                    </small>
                </h3>

                <p>${membro.endereco}</p>

                <p>${membro.telefone}</p>

                <a
                    href="${membro.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Website
                </a>
            `;

            listaEmpresasContainer.appendChild(item);

        });

    }


    // 7. Alternar entre Grade e Lista

    if (btnGrade && btnLista) {

        btnGrade.addEventListener("click", () => {

            btnGrade.classList.add("selecionado");

            btnLista.classList.remove("selecionado");

            btnGrade.setAttribute("aria-pressed", "true");

            btnLista.setAttribute("aria-pressed", "false");

            exibirMembrosGrade(membrosData);

        });


        btnLista.addEventListener("click", () => {

            btnLista.classList.add("selecionado");

            btnGrade.classList.remove("selecionado");

            btnLista.setAttribute("aria-pressed", "true");

            btnGrade.setAttribute("aria-pressed", "false");

            exibirMembrosLista(membrosData);

        });

    }


    // 8. Inicialização do diretório

    carregarMembros();

});
