$(document).ready(function(){
    let carrinho = []
    try{
        const stored = localStorage.getItem("carrinho")
        if(stored){
            carrinho = JSON.parse(stored) || []
        }
    }catch(e){
        carrinho = []
    }

    const listElement = $('#lista')
    const totalElement = $('#total')

    function exibirCarrinho(){
        listElement.empty()
        let totalPreco = 0

        $.each(carrinho, function(index, item){
            const preco = Number(item.valor) || 0
            const precoTexto = preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            const listItem = $("<li>")
            const imagem = $("<img>")
                .attr("src", item.imagem)
                .attr("alt", item.desc)

            const itemDetails = $("<div>").addClass("item-details")
                .append($("<div>").addClass("item-name").text(item.desc))
                .append($("<div>").addClass("item-price").text(`Preço: ${precoTexto}`))

            const removeButton = $("<button>")
                .attr('type', 'button')
                .attr('aria-label', `Remover ${item.desc}`)
                .text('Remover')
                .click(function(){
                    removerItem(index)
                })

            listItem.append(imagem, itemDetails, removeButton)
            listElement.append(listItem)

            totalPreco += preco
        })

        totalElement.text(`Total: ${totalPreco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`)
    }

    function removerItem(index){
        carrinho.splice(index, 1)
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
        exibirCarrinho()
    }

    exibirCarrinho()
})

function gerar(){
    const listaElement = document.getElementById("lista")
    const totalElement = document.getElementById("total")
    const listaClone = listaElement.cloneNode(true)
    $(listaClone).find("button").remove()
    const listaHtml = listaClone.innerHTML
    const totalHtml = totalElement.innerHTML
    const conteudoHTML = `
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1>PEDIDO CONFIRMADO</h1>
                <h3>Agradecemos a sua compra e sua preferência.</h3>
                <br>
                ${listaHtml}
                <br>
                <br>
                ${totalHtml}
            </body>
        </html>
    `

    const blob = new Blob([conteudoHTML], {type: "application/msword"})
    const link = document.createElement("a")

    link.href = URL.createObjectURL(blob)
    link.download = "pedido.doc"
    link.click()
    // liberar o objeto URL após o download
    setTimeout(() => URL.revokeObjectURL(link.href), 1000)
    document.getElementById("pedido").style.display = "block"
}


function successClose(){
    document.getElementById("pedido").style.display = "none"
}