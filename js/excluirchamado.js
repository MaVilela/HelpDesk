/*  Local Storage é um recurso do HTML 5 para se armazenar dados que não são perdidos
ao fim da seção, logo, podemos fechar e abrir o browser várias vezes e as informações
gravadas permanecerão lá  */
// Inicio da Função JSON

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
			Status    : $("#txtStatus").val()
            
		});

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
            Categoria : $("#txtcategoria").val(),
            Prioridade: $("#txtPrioridade").val(),
            Descricao : $("#txtDescricao").val(),
			Status    : $("#txtStatus").val()
			});
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Informações editadas.")
		operacao = "A";
		return true;
	}
	// Função para listar clientes
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
                                         "  <td><img src='img/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
              						 	 "	<td>"+cli.Codigo+"</td>" + 
										 "	<td>"+cli.Nome+"</td>" + 
										 "	<td>"+cli.Email+"</td>" + 
                                         "	<td>"+dtfinal+"</td>" + 
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
		let decisao = confirm("Deseja mesmo excluir o chamado?");
		if (decisao==true) {
		tbClientes.splice(indice_selecionado, 1);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro excluído.");
		}else{
			alert("O chamado não foi excluído");
		}
	}

	// função par pesquisar cliente
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
        $("#txtPrioridade").val(cli.propriedade);
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
	// Ação com base nos eventos do número do Código
	$("#txtcodigo").val (ultconv+1);
	var ultimo=JSON.parse (tbClientes.slice(-1));
	var ultimo=parseInt (ultimo.codigo);
	
});