/*  Local Storage é um recurso do HTML 5 para se armazenar dados que não são perdidos
ao fim da seção, logo, podemos fechar e abrir o browser várias vezes e as informações
gravadas permanecerão lá  */
// Inicio da Função JSON

function logar(){
    var email = document.getElementById("email");
    var senha = document.getElementById("senha");

    if(email.value == "admin@email.com" && senha.value == "1234"){
        var autoriza = 1;
        localStorage.setItem("acesso", true);
        window.location.href = "novochamado.html";

    }else if(email.value == "user@email.com" && senha.value == "1234"){
        var autoriza = 2;
        localStorage.setItem("acesso", true);
        window.location.href = "novochamado.html";
    }else{
        alert("Usuario ou Senha Invalidos!");
    }

}

$(function(){

	var operacao = "A"; //"A"=Adição; "E"=Edição
	
	var indice_selecionado = -1;
	
	var tbClientes = localStorage.getItem("tbClientes"); // Recupera os dados armazenados

	tbClientes = JSON.parse(tbClientes); // Converte string para objeto

	if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbClientes = [];

	// Função para adicionar registros
	function Adicionar(){
		//variável para verificar se número de código já existe
		var cli = GetCliente("Codigo", $("#txtCodigo").val());
		// Caso existe é informado ao cliente
		if(cli != null){
			alert("Código já cadastrado.");
			return;
		}
	// Caso contrário insere
		var cliente = JSON.stringify({
            Codigo    : $("#txtCodigo").val(),
			Nome      : $("#txtNome").val(),
			Email     : $("#txtEmail").val(),
            Data      : $("#txtData").val(),
            Hora      : $("#txtHora").val(),
            Categoria : $("#txtCategoria").val(),
            Prioridade: $("#txtPrioridade").val(),
            Descricao : $("#txtDescricao").val(),
			Status	  : ("Chamado Aberto")       
		});

		console.log(cliente)
		tbClientes.push(cliente);

		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

		alert("Registro adicionado.");
		
		return true;
	}

	// Função para editar clientes
	function Editar(){
		tbClientes[indice_selecionado] = JSON.stringify({
			Codigo    : $("#txtCodigo").val(),
            Nome      : $("#txtNome").val(),
			Email     : $("#txtEmail").val(),
            Data      : $("#txtData").val(),
            Hora      : $("#txtHora").val(),
            Categoria : $("#txtCategoria").val(),
            Prioridade: $("#txtPrioridade").val(),
            Descricao : $("#txtDescricao").val(),
			Status    : $("#txtStatus").val()
			});
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}
	// Função para listar clientes  (cabeçalho)
	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Código</th>"+
			"	<th>Nome</th>"+
			"	<th>Email</th>"+
            "	<th>Data</th>"+
            "	<th>Hora</th>"+
            "	<th>Categoria</th>"+
            "	<th>Prioridade</th>"+
            "	<th>Descrição</th>"+
			"	<th>Status</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		// Malha de repetição para inserir todos os registros
		 for(var i in tbClientes){
			var cli = JSON.parse(tbClientes[i]);
			// Formatar data para o format brasileiro dia, mes, ano
			var dtfinal = cli.Data.substring(8,10) + "/" +cli.Data.substring(5,7)  +"/"  +cli.Data.substring(0,4);
		  	$("#tblListar tbody").append("<tr>"+
			  							"	<td></td>" + 
									 	 "	<td>"+cli.Codigo+"</td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
                                         "	<td>"+cli.Data+"</td>" + 
                                         "	<td>"+cli.Hora+"</td>" + 
                                         "	<td>"+cli.Categoria+"</td>" + 
                                         "	<td>"+cli.Prioridade+"</td>" + 
                                         "	<td>"+cli.Descricao+"</td>" + 
										 "	<td>"+cli.Status+"</td>" + 
		  								 "</tr>");
		 }
		 
	}



	// Função para excluir registros
	function Excluir(){
		let decisao = confirm("Deseja mesmo exluir o chamado?");
		if (decisao==true) {
		tbClientes.splice(indice_selecionado, 1);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro excluído.");
		}else{
			alert("O chamado não foi excluido");
		}
	}

	// Função par pesquisar cliente
	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}
	// Chamda da função listar clientes
	Listar();

	// Ação com base nos eventos de formulário
	$("#frmCadastro").on("submit",function(){
		if(operacao == "A")
			return Adicionar();
		else
			return Editar();		
	});
	// Ação com base nos eventos do botão Editar
	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbClientes[indice_selecionado]);
		$("#txtCodigo").val(cli.Codigo);
		$("#txtNome").val(cli.Nome);
		$("#txtEmail").val(cli.Email);
        $("#txtData").val(cli.Data);
        $("#txtHora").val(cli.Hora);
        $("#txtCategoria").val(cli.Categoria);
        $("#txtPrioridade").val(cli.Prioridade);
        $("#txtDescricao").val(cli.Descricao);
		$("#txtStatus").val(cli.Status);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
	});
	// Ação com base nos eventos do botão Excluir
	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});



	// status
$("#txtNome").change(function () {
	//alert( $( this ).val() );
	var pessoa = $(this).val();

	if (pessoa == "Wilson") {
		$("#txtStatus").val('Em aberto');
	} else
		$("#txtStatus").val('Em andamento');
});

// Obtém a data/hora atual
	
	var data = new Date();
	
	// Guarda cada pedaço em uma variável
	var dia     = data.getDate();           // 1-31
	var dia_sem = data.getDay();            // 0-6 (zero=domingo)
	var mes     = data.getMonth();          // 0-11 (zero=janeiro)
	var ano2    = data.getYear();           // 2 dígitos
	var ano4    = data.getFullYear();       // 4 dígitos
	var hora    = data.getHours();          // 0-23
	var min     = data.getMinutes();        // 0-59
	var seg     = data.getSeconds();        // 0-59
	var mseg    = data.getMilliseconds();   // 0-999
	var tz      = data.getTimezoneOffset(); // em minutos
	
	if(dia<10) {
		dia = '0'+dia;
	} 
  
	if(mes<10) {
		mes = '0'+ (mes+1);
	} 

	// Formata a data e a hora (note o mês + 1)
	var str_data = dia + '/' + (mes+1) + '/' + ano4; // Brasil
	var str_data_Brazil = ano4 + '-' + mes + '-' + dia; // europeu
	var hora_geral = hora + ':'+ min;
	//var str_hora = hora + ':' + min + ':' + seg;

	// Mostra o resultado
	//alert('Hoje é ' + str_data + ' às ' + str_hora);
	$("#txtData").val(str_data_Brazil);
	$("#txtHora").val(hora_geral);

	//alert(hora_geral);

	// Código automatico //
	try {
		var ultimo = JSON.parse(tbClientes.slice(-1));
		var ultconv = parseInt(ultimo.Codigo);
		
			 $("#txtCodigo").val(ultconv+1);	
	} catch (error) {
		console.log(error);
	}
	
	
	
});