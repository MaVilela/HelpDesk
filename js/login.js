function logar(){
    var email = document.getElementById("email");
    var senha = document.getElementById("senha");


    if(email.value == "admin@admin.com" && senha.value == "1234"){
        localStorage.setItem("acesso", true);
        alert("Usuario Autenticado!");
        window.location.href = "chamado.html";
    }else{
        alert("Usuario ou Senha Invalidos!");
    }
}
