  //array global - cadastro.escola e cadastro.cidade
  var cadastro = [];

  //inicializa o array com 5 escolas
  function inicializaArray()
  {
    var i;
    for (i=0; i<5; i++)
    {
      cadastro[i] = {escola: "escola " + (i+1)};
    }
    //localStorage.setItem('cadastro', JSON.stringify(cadastro));
  }

  //-----------------------------------------------------------------------------

  //limpa a lista de escolas
  function limparLista()
  {
    var lista = document.getElementById("lista");

    while(lista.firstChild)
    {
      lista.removeChild(lista.firstChild);
    }
    linksPaginacao('hidden');
  }

  //carregar combo da escola
  function carregaCombo()
  {
    try
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
      //limpa os combos
      document.getElementById("cbbEscola").innerHTML = "";
      //adiciona itens nos combos
      var cbbEscola = document.getElementById("cbbEscola");
      //opção de busca vazia
      var opVazia = document.createElement('option');
      opVazia.innerHTML = "-";
      opVazia.value = -1;
      cbbEscola.appendChild(opVazia);
      //preenche combos
      for (var i = 0; i < cadastro.length; i++)
      {
        var opE = document.createElement('option');
        opE.innerHTML = cadastro[i].escola;
        opE.value = i;
        cbbEscola.appendChild(opE);
      }
    }
    catch (e)
    {
      alert(e);
    }
  }

  //listar escolas cadastrados
  function listarEscolas()
  {
    try
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
      limparLista();
      botoesEditarExcluir('visible');
    	document.getElementById("escola").value = "";

      for (var i = 0; i < cadastro.length; i++)
      {
        var lista = document.getElementById("lista");
        var cidade = cadastro[i].cidade;
        if(typeof cidade == "undefined")
        {
            cidade = "-"
        }
        var desc = cadastro[i].escola + " / " + cidade;
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "item";
        checkbox.id = i;
        lista.appendChild(checkbox);

        var label = document.createElement('label')
        label.htmlFor = desc;
        label.appendChild(document.createTextNode(desc));

        lista.appendChild(label);
        lista.appendChild(document.createElement("br"));
      }
    }
    catch (e)
    {
      alert(e);
    }
  }

  function botoesEditarExcluir(tipo)
  {
    document.getElementById("btnEditar").setAttribute('style', 'visibility:' + tipo);
    document.getElementById("btnExcluir").setAttribute('style', 'visibility:' + tipo);
  }
  function linksPaginacao(tipo)
  {
    document.getElementById("pagAnt").setAttribute('style', 'visibility:' + tipo);
    document.getElementById("pagProx").setAttribute('style', 'visibility:' + tipo);
    document.getElementById("page").setAttribute('style', 'visibility:' + tipo);
  }

  function buscar()
  {
    var retrievedObject = localStorage.getItem('cadastro');
    cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
  	var opcao = document.getElementById("cbbFiltro").value;
  	var pesquisa = document.getElementById("pesquisa").value;

  	if (pesquisa.length > 0)
  	{
  		var id = -1;
  		if (opcao == "escola")
  			for (var i = 0; i < cadastro.length; i++)
  				if (cadastro[i].escola == pesquisa)
  					id = i;
  		else
  			for (var i = 0; i < cadastro.length; i++)
  				if (cadastro[i].cidade == pesquisa)
  					id = i;

  		if (id == -1)
  		{
  		  alert("Nenhuma escola/cidade encontrada");
        limparLista();
        botoesEditarExcluir('hidden');
  		}
  		else
  		{
        limparLista();
        botoesEditarExcluir('visible');

        var lista = document.getElementById("lista");
  		  var cidade = cadastro[id].cidade;
  		  if(typeof cidade == "undefined")
  			  cidade = "-"
  		  var desc = cadastro[id].escola + " / " + cidade;
  		  var checkbox = document.createElement("input");
  		  checkbox.type = "checkbox";
  		  checkbox.name = "item";
  		  checkbox.id = id;
  		  lista.appendChild(checkbox);

  		  var label = document.createElement('label')
  		  label.htmlFor = desc;
  		  label.appendChild(document.createTextNode(desc));

  		  lista.appendChild(label);
  		  lista.appendChild(document.createElement("br"));
  		}
  	}
  	else
  		alert("Digite o nome da escola/cidade");
  }
  //-----------------------------------------------------------------------------

  function adicionarCidade()
  {
    try
    {
      limparLista();
      //pega id da escola
      var id = document.getElementById("cbbEscola").value;
    	if(id == -1)
    		alert("Selecione uma escola");
    	else
    	{
        var retrievedObject = localStorage.getItem('cadastro');
        cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));

        cadastro[id].cidade = document.getElementById("cidade").value;
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        carregaCombo();
        document.getElementById("cidade").value = "";
        limparLista();
        botoesEditarExcluir('hidden');

        alert("Cadastro realizado com sucesso!");
      }
    }
    catch(e)
    {
      alert(e);
    }
  }

  function adicionarEscola()
  {
    try
    {
      limparLista();
      var nomeEscola = document.getElementById("escola").value;
      //verifica se o campo está em branco
      if(nomeEscola.length == 0)
        alert("Digite o nome de uma escola");

      else
      {
        var retrievedObject = localStorage.getItem('cadastro');
        cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
        cadastro[cadastro.length] = {escola: nomeEscola};
    	  //limpa text da escola
    	  document.getElementById("escola").value = "";
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
    	  carregaCombo();
        botoesEditarExcluir('hidden');
    	  alert("Cadastro realizado com sucesso!");

      }
    }
    catch (e)
    {
      alert(e);
    }
  }

  function editarEscola()
  {
    try
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));

      var id = document.getElementById("escola").name;
      var escola = document.getElementById("escola").value;

      cadastro[id].escola = escola;

      document.getElementById("btnAlterar").disabled = true;
    	document.getElementById("btnAddEscola").disabled = false;
    	document.getElementById("escola").value = "";
      localStorage.setItem('cadastro', JSON.stringify(cadastro));

      carregaCombo();
      mudaPagina(1);
      //listarEscolas();
      alert("Alteracao realizada com sucesso!");

    }
    catch (e)
    {
      alert(e);
    }
  }

  function excluirEscola()
  {
    try
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
      var checkbox = document.getElementsByName("item");
      var checked = false; var inicio; var parada; var indice;
      inicio = (pagAtual * itensPorPagina) - 1;
      parada = (pagAtual-1) * itensPorPagina;
      indice = itensPorPagina-1;
      console.log(checkbox.length);
      console.log(indice);
       while(indice >= checkbox.length)
       {
           indice--;
           inicio--;
       }

      console.log(indice);
      for (var i = inicio; i >= parada; i--)
      {
        if (indice >= 0)
          if (indice >= 0 && checkbox[indice].checked == true)
          {
            console.log(i);
            cadastro.splice(i, 1);
            checked = true;
          }
        indice--;
      }
      if(checked)
      {
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        limparLista();
        mudaPagina(1);
        carregaCombo();
        alert("Exclusao realizada com sucesso!");

      }
      else
      {
        alert("Selecione pelo menos um item para excluir");
      }
    }
    catch (e)
    {
      alert(e);
    }
  }

   function validarEdicao()
  {
    var retrievedObject = localStorage.getItem('cadastro');
    cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
    var checkbox = document.getElementsByName("item");
    var cont = 0; var indice=0; var id; var inicio; var parada;
    inicio = (pagAtual-1) * itensPorPagina;
    parada = (pagAtual * itensPorPagina) -1;
	console.log(inicio);
	console.log(parada);
    for (var i = inicio; i <= parada; i++)
    {
		if (indice < checkbox.length)
		{
			console.log(i);
			if (checkbox[indice].checked == true)
			{
				id = i;
				cont++;
			}
			console.log(indice);
			indice++;
		}
      
    }

    if(cont == 1)
    {
      limparLista();
      botoesEditarExcluir('hidden');
    	document.getElementById("btnAlterar").disabled = false;
    	document.getElementById("btnAddEscola").disabled = true;
    	document.getElementById("escola").value = "";
      document.getElementById('escola').value = cadastro[id].escola;
      document.getElementById('escola').name = id;
    }
    else
    {
      alert("Selecione um item para editar");
    }
}

//--------------------------------------------------------------
//PAGINAÇÃO

var pagAtual = 1;
var itensPorPagina = 3; //depois vai vim como parâmetro

function pagAnt()
{
  if(pagAtual > 1)
  {
    pagAtual--;
    mudaPagina(pagAtual);
  }
}

function pagProx()
{
  if(pagAtual < contarPaginas())
  {
    pagAtual++;
    mudaPagina(pagAtual);
  }
}

function mudaPagina(page)
{

  var btnProx = document.getElementById("pagProx");
  var btnAnt = document.getElementById("pagAnt");
  var lista = document.getElementById("lista");
  var status = document.getElementById("page");

  //valida página
  if(page < 1) page = 1;
  if(page > contarPaginas()) page = contarPaginas();

  limparLista();
  botoesEditarExcluir('visible');
  linksPaginacao('visible');
  document.getElementById("pagAnt").setAttribute('style', 'visibility:visible');
  var retrievedObject = localStorage.getItem('cadastro');
  cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
  document.getElementById("escola").value = "";

  for (var i = (page-1) * itensPorPagina; i < (page * itensPorPagina) && i < cadastro.length; i++)
  {
    var lista = document.getElementById("lista");
    var cidade = cadastro[i].cidade;
    if(typeof cidade == "undefined") cidade = "-"

    var desc = cadastro[i].escola + " / " + cidade;
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "item";
    checkbox.id = i;
    lista.appendChild(checkbox);

    var label = document.createElement('label')
    label.htmlFor = desc;
    label.appendChild(document.createTextNode(desc));

    lista.appendChild(label);
    lista.appendChild(document.createElement("br"));
  }
  status.innerHTML = page + "/" + contarPaginas();

  if(page == 1)
    btnAnt.style.visibility = "hidden";
  else
    btnAnt.style.visibility = "visible";

  if(page == contarPaginas())
    btnProx.style.visibility = "hidden";
  else
    btnProx.style.visibility = "visible";
}

function contarPaginas()
{
  var retrievedObject = localStorage.getItem('cadastro');
  cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
  return Math.ceil(cadastro.length / itensPorPagina);
}

// window.onload = function()
// {
//   mudaPagina(1);
// }

//--------------------------------------------------------------
  inicializaArray();
  carregaCombo();
  document.getElementById("btnAlterar").disabled = true;
