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

    // ==========================================
    // 2. CLIMA (OpenWeatherMap API)
    // ==========================================
    const apiKey = "a583478092a575ac937f9b07538a0e3e"; // COLOQUE SUA CHAVE AQUI
    const lat = "-23.6666"; // Capão Redondo
    const lon = "-46.7725";

    // URLs da API (Tempo Atual e Previsão)
    const urlTempoAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

    async function buscarClima() {
        try {
            // Busca clima atual
            const respAtual = await fetch(urlTempoAtual);
            if (!respAtual.ok) throw new Error("Falha na API Atual");
            const dadosAtual = await respAtual.json();

            // Busca previsão de 3 dias
            const respPrevisao = await fetch(urlPrevisao);
            if (!respPrevisao.ok) throw new Error("Falha na API Previsão");
            const dadosPrevisao = await respPrevisao.json();

            // Filtra previsão para pegar apenas 1 registro por dia (ex: 12:00)
            const previsaoDiaria = dadosPrevisao.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

            exibirClima(dadosAtual, previsaoDiaria);
        } catch (error) {
            console.error(error);
            document.getElementById("dados-clima").innerHTML = "<p><em>(Adicione sua chave API do OpenWeather no arquivo inicio.js para ver o clima)</em></p>";
        }
    }

    function exibirClima(atual, previsao) {
        const container = document.getElementById("dados-clima");

        // Letra maiúscula na descrição
        const desc = atual.weather[0].description;
        const descFormatada = desc.charAt(0).toUpperCase() + desc.slice(1);

        let html = `
            <div class="clima-hoje">
                <img src="https://openweathermap.org/img/wn/${atual.weather[0].icon}@2x.png" alt="${descFormatada}">
                <div>
                    <p class="temp-atual">${Math.round(atual.main.temp)}°C</p>
                    <p class="desc-atual">${descFormatada}</p>
                </div>
            </div>
            <hr>
            <h3>Previsão para 3 dias:</h3>
            <ul class="previsao-lista">
        `;

        const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

        previsao.forEach(dia => {
            const dataObj = new Date(dia.dt_txt);
            const nomeDia = diasDaSemana[dataObj.getDay()];
            html += `<li><strong>${nomeDia}:</strong> ${Math.round(dia.main.temp)}°C</li>`;
        });

        html += `</ul>`;
        container.innerHTML = html;
    }

    // ==========================================
    // 3. MEMBROS EM DESTAQUE (Aleatórios Ouro/Prata)
    // ==========================================
    async function buscarDestaques() {
        try {
            const resposta = await fetch("dados/membros.json");
            const membros = await resposta.json();

            // Filtra apenas nível 2 (Prata) ou 3 (Ouro)
            const elegiveis = membros.filter(m => m.nivel === 2 || m.nivel === 3);

            // Embaralha o array (Aleatório)
            elegiveis.sort(() => 0.5 - Math.random());

            // Pega os 2 ou 3 primeiros
            const selecionados = elegiveis.slice(0, 3);

            exibirDestaques(selecionados);
        } catch (error) {
            console.error("Erro ao carregar membros:", error);
        }
    }

    function exibirDestaques(empresas) {
        const container = document.getElementById("container-destaques");
        container.innerHTML = "";

        const rotulos = { 2: "Membro Prata", 3: "Membro Ouro" };

        empresas.forEach(empresa => {
            const card = document.createElement("div");
            card.className = "card-destaque";
            card.innerHTML = `
                <div class="card-topo">
                    <span class="badge-nivel">${rotulos[empresa.nivel]}</span>
                    <img src="${empresa.imagem}" alt="Logo de ${empresa.nome}" loading="lazy">
                </div>
                <div class="card-info">
                    <h3>${empresa.nome}</h3>
                    <p>📍 ${empresa.endereco}</p>
                    <p>📞 ${empresa.telefone}</p>
                    <a href="${empresa.website}" target="_blank">Visitar Site</a>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // Executa as funções
    buscarClima();
    buscarDestaques();
});