//array global para guardar as escolas
//cadastro.escola e cadastro.cidade
var cadastro = [];

//inicializar o array com 5 escolas
function inicializaArray()
{
  var i;
  for (i=0; i<5; i++)
  {
    cadastro[i] = {escola: "escola " + (i+1)};
  }
}

function limparLista()
{
  var lista = document.getElementById("lista");
  while(lista.firstChild)
  {
    lista.removeChild(lista.firstChild);
  }
}

//mostrar todas as escolas cadastradas em uma ul
function listarEscolas()
{
  camposCadastro('hidden');
  limparLista();
  for (var i = 0; i < cadastro.length; i++)
  {
    var lista = document.getElementById("lista");
    var item = document.createElement('li');
    item.innerText = cadastro[i].escola;
    lista.appendChild(item);
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
  var opVaziaEscola = document.createElement('option');
  opVaziaEscola.innerHTML = "-";
  opVaziaEscola.value = -1;
  cbbEscola.appendChild(opVaziaEscola);
  //preenche combos
  for (var i = 0; i < cadastro.length; i++)
  {
    var opE = document.createElement('option');
    opE.innerHTML = cadastro[i].escola;
    opE.value = i;
    cbbEscola.appendChild(opE);
  }
}

//cadastrar escola e cidade
function adicionar()
{
  //salva no array
  var valorE = document.getElementById("cbbEscola").value;
	if(valorE == -1)
	{
		alert("Selecione uma escola");
	}
	else
	{
    console.log(valorE);
    cadastro[valorE].cidade = document.getElementById("cidade").value;
    carregaCombo();
    document.getElementById("cidade").value = "";
  }
  testLista();

}

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

function excluir()
{
	var id = document.getElementById("cbbEscola").value;
	cadastro.splice(id, 1);
	limparLista();
	carregaCombo();
}

function editarEscola(id, nomeEsc, nomeCid)
{
  escola[id] = nomeEsc;
  cidade[id] = nomeCid;
}
//apresenta os campos para cadastro de uma nova escola
function camposCadastro(tipo)
{
  limparLista();
  document.getElementById("escola").setAttribute('style', 'visibility:' +tipo);
  document.getElementById("btnAddEscola").setAttribute('style', 'visibility:'+tipo);
  document.getElementById("lblEscola").setAttribute('style', 'visibility:'+tipo);
}

function addEscola()
{
  limparLista();

  var nomeEscola = document.getElementById("escola").value;
  console.log(nomeEscola);
  if(nomeEscola.length === 0)
  {
    alert("Digite o nome de uma escola");
  }
  else
  {
    console.log(cadastro.length);
    cadastro[cadastro.length] = {escola: nomeEscola};
  }
  document.getElementById("escola").value = "";
  carregaCombo();
}

function checkboxTeste()
{
  camposCadastro('hidden');
  limparLista();
  for (var i = 0; i < cadastro.length; i++)
  {
    var lista = document.getElementById("checkboxLista");
    var desc = cadastro[i].escola;
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = desc;
    checkbox.value = i;
    lista.appendChild(checkbox);

    var label = document.createElement('label')
    label.htmlFor = desc;
    label.appendChild(document.createTextNode(desc));

    lista.appendChild(label);
    lista.appendChild(document.createElement("br")); 
  }
}

//teste listarEscolas
function testLista()
{
  for (var i=0; i < cadastro.length; i++)
  {
    console.log(cadastro[i].escola);
    console.log(cadastro[i].cidade);
  }
}
inicializaArray();
carregaCombo();
testLista();
