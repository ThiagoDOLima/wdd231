document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualização do Rodapé


    // Carrega as empresas via fetch() do JSON.
    // Alterna entre as exibições Grade(Cards) e Lista.
    // Alterna o menu móvel(hambúrguer).
    // Preenche automaticamente a data de última modificação e ano atual no rodapé.
    
    const anoAtualSpan = document.getElementById("ano-atual");
    const ultimaAtualizacaoSpan = document.getElementById("ultima-atualizacao");

    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    if (ultimaAtualizacaoSpan) {
        ultimaAtualizacaoSpan.textContent = document.lastModified;
    }

    // 2. Menu Responsivo Mobile
    const botaoMenu = document.getElementById("botao-menu");
    const menuPrincipal = document.getElementById("menu-principal");

    if (botaoMenu && menuPrincipal) {
        botaoMenu.addEventListener("click", () => {
            menuPrincipal.classList.toggle("aberto");
            botaoMenu.textContent = menuPrincipal.classList.contains("aberto") ? "✕" : "☰";
        });
    }

    // 3. Fetch de Empresas e Alternância de Visualização (Grade / Lista)
    const listaEmpresasContainer = document.getElementById("lista-empresas");
    const btnGrade = document.getElementById("visualizacao-grade");
    const btnLista = document.getElementById("visualizacao-lista");

    let membrosData = [];

    const rotulosNivel = {
        1: "Membro",
        2: "Prata",
        3: "Ouro"
    };

    async function carregarMembros() {
        try {
            const resposta = await fetch("dados/membros.json");
            if (!resposta.ok) {
                throw new Error(`Erro de HTTP: ${resposta.status}`);
            }
            membrosData = await resposta.json();
            exibirMembrosGrade(membrosData);
        } catch (erro) {
            console.error("Erro ao carregar os dados dos membros:", erro);
            listaEmpresasContainer.innerHTML = "<p>Erro ao carregar o diretório de empresas. Tente novamente mais tarde.</p>";
        }
    }

    function exibirMembrosGrade(membros) {
        listaEmpresasContainer.className = "grade-empresas";
        listaEmpresasContainer.innerHTML = "";

        membros.forEach((membro) => {
            const cartao = document.createElement("article");
            cartao.className = `cartao-membro nivel-${membro.nivel}`;

            cartao.innerHTML = `
        <div class="cartao-imagem">
          <img src="${membro.imagem}" alt="Logo de ${membro.nome}" loading="lazy">
          <span class="badge-nivel">${rotulosNivel[membro.nivel] || "Membro"}</span>
        </div>
        <div class="cartao-corpo">
          <h3>${membro.nome}</h3>
          <p class="descricao">${membro.descricao}</p>
          <p><strong>Endereço:</strong> ${membro.endereco}</p>
          <p><strong>Telefone:</strong> ${membro.telefone}</p>
          <a href="${membro.website}" target="_blank" rel="noopener noreferrer" class="link-site">Visitar Website</a>
        </div>
      `;
            listaEmpresasContainer.appendChild(cartao);
        });
    }

    function exibirMembrosLista(membros) {
        listaEmpresasContainer.className = "lista-empresas";
        listaEmpresasContainer.innerHTML = "";

        membros.forEach((membro) => {
            const item = document.createElement("article");
            item.className = `item-membro-lista nivel-${membro.nivel}`;

            item.innerHTML = `
        <h3>${membro.nome} <small>(${rotulosNivel[membro.nivel] || "Membro"})</small></h3>
        <p>${membro.endereco}</p>
        <p>${membro.telefone}</p>
        <a href="${membro.website}" target="_blank" rel="noopener noreferrer">Website</a>
      `;
            listaEmpresasContainer.appendChild(item);
        });
    }

    if (btnGrade && btnLista) {
        btnGrade.addEventListener("click", () => {
            btnGrade.classList.add("selecionado");
            btnLista.classList.remove("selecionado");
            exibirMembrosGrade(membrosData);
        });

        btnLista.addEventListener("click", () => {
            btnLista.classList.add("selecionado");
            btnGrade.classList.remove("selecionado");
            exibirMembrosLista(membrosData);
        });
    }

    carregarMembros();
});