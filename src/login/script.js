function login(){
    var nome = $("#nome").val();
    var senha = $("#senha").val();

    if(nome && senha && nome === "admin" && senha === "admin"){
        const user = {
            name: nome,
            dataEntrada: new Date(),
            id: Math.floor(Math.random() * 100000)
        }
        localStorage.setItem("usuario", JSON.stringify(user));
        window.location.href = "../loja";
    }else{
        document.getElementById("errorModal").style.display = "flex";
        document.getElementById("nome").style.borderBottom = "5px solid #ff0000";
        document.getElementById("senha").style.borderBottom = "5px solid #ff0000";
    }
}
function showPassword(){
    var senhaInput = document.querySelector("#senha")
    var img_eye = document.querySelector("#eye")

    if(senhaInput.getAttribute("type") === "password"){
        senhaInput.setAttribute("type", "text");
        img_eye.setAttribute("src", "../../public/hide.png");
    }else{
        senhaInput.setAttribute("type", "password");
        img_eye.setAttribute("src", "../../public/view.png");
    }
}
function fecharError(){
        document.getElementById("errorModal").style.display = "none";
        document.getElementById("nome").style.borderBottom = "2px solid gray";
        document.getElementById("senha").style.borderBottom = "2px solid gray";
}