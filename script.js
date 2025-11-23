let cardContainer = document.querySelector(".card-container");
let dados = [];

// Renomeei a função para ser mais descritiva e a chamo assim que o script carrega.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json"); 
        dados = await resposta.json(); // Armazena os dados na variável global
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Ocorreu um erro ao carregar as informações.</p>";
    }
}

function buscarPorAno() {
    const anoInput = document.getElementById("ano-busca");
    const ano = anoInput.value;

    if (!ano) {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos
        return;
    }

    const dadosFiltrados = dados.filter(dado => dado.ano_campeao == ano);
    renderizarCards(dadosFiltrados);

}

function renderizarCards(dadosParaRenderizar) {

    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    if (dadosParaRenderizar.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum time encontrado para o ano informado.</p>";
        return;
    }

    for (let dado of dadosParaRenderizar) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2><strong>Time: </strong>${dado.time}</h2>
        <h3><strong>Ano CAMPEÃO: </strong>${dado.ano_campeao}</h3>
        <p><strong>Ano Fundação: </strong>${dado.ano_fundacao}</p>
        <p><strong>Mascote: </strong>${dado.mascote}</p>
        <p><strong>Sobre: </strong>${dado.sobre}</p>
        `;
        cardContainer.appendChild(article);
    }
}

carregarDados(); // Chama a função para carregar os dados quando a página abre.