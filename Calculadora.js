const form = document.getElementById("form-atividade");
const corpoTabela = document.querySelector("tbody");
const tfoot = document.querySelector("tfoot tr");

let notas = []; // armazena todas as notas

form.addEventListener("submit", function(e) {
    e.preventDefault(); // evita recarregar a página

    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    const nome = inputNomeAtividade.value.trim();
    const nota = Number(inputNotaAtividade.value);

    if (nome === "") {
        alert("Digite o nome da atividade");
        return;
    }

    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("Digite uma nota válida entre 0 e 10");
        return;
    }

    const situacao = nota >= 7 ? "Aprovado" : "Reprovado";

    // Adiciona a linha à tabela
    const linha = `
        <tr>
            <td>${nome}</td>
            <td>${nota}</td>
            <td>${situacao === "Aprovado" ? '<img src="imag/aprovado.jpg" alt="Aprovado">' : '<img src="imag/reprovado.jpg" alt="Reprovado">'}</td>
        </tr>
    `;
    corpoTabela.innerHTML += linha;

    // Adiciona a nota ao array de notas
    notas.push(nota);

    // Calcula a média
    const soma = notas.reduce((acc, val) => acc + val, 0);
    const media = (soma / notas.length).toFixed(2); // média com 2 casas decimais
    const situacaoFinal = media >= 7 ? "Aprovado" : "Reprovado";

    // Atualiza o tfoot
    tfoot.innerHTML = `
        <td>Média Final</td>
        <td>${media}</td>
        <td><span class="resulado ${situacaoFinal.toLowerCase()}">${situacaoFinal}</span></td>
    `;

    // Limpa os campos
    inputNomeAtividade.value = "";
    inputNotaAtividade.value = "";
});