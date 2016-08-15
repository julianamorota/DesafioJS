$(document).ready(function(){

  $('#btnSalvar').prop('disabled', false);
  $('#btnAlterar').prop('disabled', true);
  $("#titulo").html("Cadastro");

  function isNew()
  {
    var retrievedObject = localStorage.getItem('local');
    local = ('retrievedObject: ', JSON.parse(retrievedObject));
    var retrievedObject = localStorage.getItem('redirectLocal');
    var redirect = ('retrievedObject: ', JSON.parse(retrievedObject));
    if(redirect == "false")
    {
      var retrievedObject = localStorage.getItem('idLocal');
      var idLocal = ('retrievedObject: ', JSON.parse(retrievedObject));
      $('#cidade').val(local[idLocal].cidade);
      $('#estado').val(local[idLocal].estado);
      $('#cidade').attr('name', idLocal);
      $("#titulo").html("Alteracao");

      $('#btnAlterar').prop('disabled', false);
      $('#btnSalvar').prop('disabled', true);
    }
  }
  isNew();


});
