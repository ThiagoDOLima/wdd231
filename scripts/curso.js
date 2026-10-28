
const cursos = [
    {
        assunto: "CSE",
        numero: 110,
        titulo: "Introdução a Programação",
        creditos: 2,
        certificado: "Web and Computer Programming",
        descricao: "Introdução à programação, variáveis, decisões, cálculos, laços, arrays e entrada e saída de dados.",
        tecnologia: ["Python"],
        completed: true
    },
    {
        assunto: "WDD",
        numero: 130,
        titulo: "Fundamentos da Web",
        creditos: 2,
        certificado: "Web and Computer Programming",
        descricao: "Fundamentos da Web, criação de páginas e introdução ao desenvolvimento de sites.",
        tecnologia: ["HTML", "CSS"],
        completed: true
    },
    {
        assunto: "CSE",
        numero: 111,
        titulo: "Programação com Funções",
        creditos: 2,
        certificado: "Web and Computer Programming",
        descricao: "Funções, organização do código, depuração, testes e tratamento de erros em Python.",
        tecnologia: ["Python"],
        completed: true
    },
    {
        assunto: "CSE",
        numero: 210,
        titulo: "Programação com Classes",
        creditos: 2,
        certificado: "Web and Computer Programming",
        descricao: "Introdução a classes, objetos, encapsulamento, herança e polimorfismo.",
        tecnologia: ["C#"],
        completed: false
    },
    {
        assunto: "WDD",
        numero: 131,
        titulo: "Fundamentos da Web Dinâmica",
        creditos: 2,
        certificado: "Web and Computer Programming",
        descricao: "Criação de sites dinâmicos com JavaScript, eventos, atualização de conteúdo e experiências responsivas.",
        tecnologia: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        assunto: "WDD",
        numero: 231,
        titulo: "Desenvolvimento Frontend para Web I",
        creditos: 2,
        certificado: "Web and Computer Programming",
        descricao: "Experiência do usuário, acessibilidade, conformidade, desempenho e uso básico de APIs.",
        tecnologia: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

// Elementos HTML
const listaCursos = document.querySelector("#lista-cursos");
const totalCreditos = document.querySelector("#total-creditos");
const botoesFiltro = document.querySelectorAll("[data-filtro]");

// Cria os cartões dos cursos
function mostrarCursos(lista) {
    listaCursos.innerHTML = "";

    lista.forEach((curso) => {
        const cartao = document.createElement("article");

        cartao.classList.add("cartao-curso");

        if (curso.completed) {
            cartao.classList.add("concluido");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = `${curso.assunto} ${curso.numero}`;

        const nomeCurso = document.createElement("p");
        nomeCurso.classList.add("nome-curso");
        nomeCurso.textContent = curso.titulo;

        const creditos = document.createElement("p");
        creditos.textContent = `${curso.creditos} créditos`;

        const tecnologias = document.createElement("p");
        tecnologias.textContent =
            `Tecnologias: ${curso.tecnologia.join(", ")}`;

        const status = document.createElement("p");
        status.classList.add("status-curso");
        status.textContent = curso.completed
            ? "✓ Curso concluído"
            : "Curso não concluído";

        cartao.append(
            titulo,
            nomeCurso,
            creditos,
            tecnologias,
            status
        );

        listaCursos.appendChild(cartao);
    });
}

// Filtra os cursos e calcula os créditos visíveis
function filtrarCursos(filtro) {
    let cursosFiltrados;

    if (filtro === "TODOS") {
        cursosFiltrados = cursos;
    } else {
        cursosFiltrados = cursos.filter(
            (curso) => curso.assunto === filtro
        );
    }

    const somaCreditos = cursosFiltrados.reduce(
        (total, curso) => total + curso.creditos,
        0
    );

    totalCreditos.textContent =
        `Total de créditos exibidos: ${somaCreditos}`;

    mostrarCursos(cursosFiltrados);

    // Atualiza a aparência e o estado dos botões
    botoesFiltro.forEach((botao) => {
        const selecionado = botao.dataset.filtro === filtro;

        botao.classList.toggle("ativo", selecionado);
        botao.setAttribute("aria-pressed", selecionado);
    });
}

// Adiciona o evento de clique aos filtros
botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtrarCursos(botao.dataset.filtro);
    });
});

// Exibe todos os cursos ao abrir a página
filtrarCursos("TODOS");
