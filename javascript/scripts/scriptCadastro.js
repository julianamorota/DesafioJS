var cadastro = [];
var local = [];


//inicializa o array com 5 escolas
function inicializaArray()
{
  var i;
  for (i=0; i<5; i++)
  {
    cadastro[i] = {escola: "escola " + (i+1)};
  }
  //reseta combo
  //localStorage.setItem('cadastro', JSON.stringify(cadastro));
}

//carregar combo da escola
function carregaComboEscola()
{
  try
  {
    var retrievedObject = localStorage.getItem('cadastro');
    cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));
    //limpa os combos
    document.getElementById("cbbEscola").innerHTML = "";
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

function carregaComboCidade()
{
  try
  {
    var retrievedObject = localStorage.getItem('local');
    local = ('retrievedObject: ', JSON.parse(retrievedObject));
    //limpa os combos
    document.getElementById("cbbCidade").innerHTML = "";
    var cbbCidade = document.getElementById("cbbCidade");
    //opção de busca vazia
    var opVazia = document.createElement('option');
    opVazia.innerHTML = "-";
    opVazia.value = -1;

    cbbCidade.appendChild(opVazia);
    //preenche combos
    for (var i = 0; i < local.length; i++)
    {
      var opE = document.createElement('option');
      opE.innerHTML = local[i].cidade;
      opE.value = i;
      cbbCidade.appendChild(opE);
    }
  }
  catch (e)
  {
    alert(e);
  }
}

function adicionarCidade()
{
  try
  {
    //pega id da escola
    var idEscola = document.getElementById("cbbEscola").value;
    var idCidade = document.getElementById("cbbCidade").value;
    if(idEscola != -1 && idCidade != -1)
    {
      var retrievedObject = localStorage.getItem('cadastro');
      cadastro = ('retrievedObject: ', JSON.parse(retrievedObject));

      if(cadastro[idEscola].cidade)
      {
        var decisao = confirm("Ja existe uma cidade cadastrada para essa escola.\nContinuar?");
        if(decisao)
        {
          cadastro[idEscola].cidade = idCidade;
          localStorage.setItem('cadastro', JSON.stringify(cadastro));
          //limpa e recarrega
          carregaComboEscola();
		      carregaComboCidade();
          alert("Cadastro realizado com sucesso!");
        }
      }
      else
      {
        cadastro[idEscola].cidade = idCidade;
        localStorage.setItem('cadastro', JSON.stringify(cadastro));
        //limpa e recarrega
        carregaComboEscola();
		carregaComboCidade();
        alert("Cadastro realizado com sucesso!");
      }
    }
    else
      alert("Selecione/preencha os campos corretamente");
  }
  catch(e)
  {
    alert(e);
  }
}

inicializaArray();
carregaComboEscola();
carregaComboCidade();
