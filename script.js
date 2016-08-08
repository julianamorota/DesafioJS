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
}

//limpa a lista de escolas
function limparLista()
{
  var lista = document.getElementById("lista");
  while(lista.firstChild)
  {
    lista.removeChild(lista.firstChild);
  }
}

//carregar cbb de escola
function carregaCombo()
{
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

//cadastrar cidade para a escola selecionada
function adicionarCidade()
{
  //pega id da escola
  var id = document.getElementById("cbbEscola").value;
	if(id == -1)
	{
		alert("Selecione uma escola");
	}
	else
	{
    console.log(id);
    cadastro[id].cidade = document.getElementById("cidade").value;
    carregaCombo();
    document.getElementById("cidade").value = "";
  }
  testLista();
}

//cadastrar nova escola
function adicionarEscola()
{
  limparLista();
  var nomeEscola = document.getElementById("escola").value;
  //verifica se o campo está em branco
  if(nomeEscola.length === 0)
  {
    alert("Digite o nome de uma escola");
  }
  else
  {
    console.log(cadastro.length);
    cadastro[cadastro.length] = {escola: nomeEscola};
  }
  //limpa text da escola
  document.getElementById("escola").value = "";
  carregaCombo();
  testLista();
}

function editarEscola()
{
  var id = document.getElementById("escola").name;
  var escola = document.getElementById("escola").value;
  cadastro[id].escola = escola;
  camposCadastro('hidden');
  carregaCombo();
  listarEscolas();
}

function listarEscolas()
{
  camposCadastro('hidden');
  botoesEditarExcluir('visible');
  limparLista();
  for (var i = 0; i < cadastro.length; i++)
  {
    var lista = document.getElementById("lista");
    var desc = cadastro[i].escola;
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
/*
function buscar()
{
	limparLista();
	var valorE = document.getElementById("cbbEscola").value;
	if(valorE == -1)
	{
		alert("Selecione uma escola");
	}
	else
	{
		var lista = document.getElementById("lista");
		var escola = document.createElement('li');
		escola.innerText = cadastro[valorE].escola;
		lista.appendChild(escola);
		var cidade = document.createElement('li');
		cidade.innerText = cadastro[valorE].cidade;
		lista.appendChild(cidade);
		document.getElementById("btnEditar").setAttribute('style', 'visibility:visible');
		document.getElementById("btnExcluir").setAttribute('style', 'visibility:visible');
	}
}
*/

function excluir()
{
  var checkbox = document.getElementsByName("item");
  var checked = false;
  for (var i = checkbox.length - 1; i >= 0; i--)
  {
    if (checkbox[i].checked == true)
    {
      cadastro.splice(i, 1);
      checked = true;
    }
  }
  if(checked)
  {
  	limparLista();
    listarEscolas();
  	carregaCombo();
  }
  else
  {
    alert("Selecione pelo menos um item para excluir");
  }
}

function validaEditar()
{
  var checkbox = document.getElementsByName("item");
  var cont = 0;
  var id;
  for (var i = checkbox.length - 1; i >= 0; i--)
  {
    if (checkbox[i].checked == true)
    {
      id = i;
      cont++;
    }
  }
  if(cont == 1)
  {
    limparLista();
    camposCadastro('visible');
    botoesEditarExcluir('hidden');
    document.getElementById("btnAddEscola").disabled = true;
    document.getElementById("btnAlterar").disabled = false;
    document.getElementById('escola').value = cadastro[id].escola;
    document.getElementById('escola').name = id;
  }
  else
  {
    alert("Selecione um item para editar");
  }
}

//show or hide os campos para cadastro de uma nova escola
function camposCadastro(tipo)
{
  limparLista();
  botoesEditarExcluir('hidden');
  document.getElementById("escola").setAttribute('style', 'visibility:' + tipo);
  document.getElementById("btnAddEscola").setAttribute('style', 'visibility:' + tipo);
  document.getElementById("lblEscola").setAttribute('style', 'visibility:' + tipo);
  document.getElementById("btnAlterar").setAttribute('style', 'visibility:' + tipo);
  document.getElementById("btnAlterar").disabled = true;
  document.getElementById("btnAddEscola").disabled = false;
  document.getElementById("escola").value = "";
}

function botoesEditarExcluir(tipo)
{
  document.getElementById("btnEditar").setAttribute('style', 'visibility:' + tipo);
  document.getElementById("btnExcluir").setAttribute('style', 'visibility:' + tipo);
}

///*
//teste listarEscolas
function testLista()
{
  for (var i=0; i < cadastro.length; i++)
  {
    console.log(cadastro[i].escola);
    console.log(cadastro[i].cidade);
  }
}
//*/
inicializaArray();
carregaCombo();
testLista();
