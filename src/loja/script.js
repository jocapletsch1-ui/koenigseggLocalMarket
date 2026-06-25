let produtos;

window.onload = function(){
    var storedUser = localStorage.getItem("usuario");
    if (storedUser) {
        var user = JSON.parse(storedUser);
        var dataEntrada = new Date(user.dataEntrada);

        var dataFormatada = dataEntrada.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric"
        });

        document.getElementById("user").textContent = user.name;
        document.getElementById("perfil").textContent = dataFormatada;
        document.getElementById("idPerfil").textContent = user.id;
    }
};

document.addEventListener("DOMContentLoaded", function() {
    fetch("../dados/data.json")
    .then((response) => response.json())
    .then((data) => {
        produtos = data;

        const produtosContainer = document.getElementById("produtos-container");

        produtos.forEach((produto, index) => {
            const card = document.createElement("div");
            card.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${produto.imagem}" class="card-img-top" alt="${produto.desc}">
                    <div class="card-body">
                        <h5 class="card-title">${produto.desc}</h5>
                        <p class="card-text">R$ ${produto.valor.toFixed(2)}</p>
                        <a href="#" class="btn btn-primary adicionar" data-indice="${index}">
                            Adicionar ao carrinho
                        </a>
                    </div>
                </div>
            `;

            produtosContainer.appendChild(card);
        });
    })
    .catch((error) => console.error("Erro ao carregar dados:", error));
});

$(document).ready(function() {
    $("#buscarJogo").on("keyup", function () {
        const valor = $(this).val().toLowerCase();

        $(".center .card").each(function () {
            const nome = $(this).find(".card-title").text().toLowerCase();

            if (nome.includes(valor)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("produtos-container").addEventListener("click", function(event){
        const btn = event.target.closest(".adicionar");
        if(!btn) return;

        event.preventDefault();

        const indexdoProduto = btn.dataset.indice;
        const produtoSelecionado = produtos[indexdoProduto];

        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
        carrinho.push(produtoSelecionado);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        
        alert(`"${produtoSelecionado.desc}" foi adicionado ao seu carrinho!`);
    });
});
