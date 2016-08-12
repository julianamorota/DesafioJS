$(document).ready(function(){

  $('#btnSalvar').prop('disabled', false);
  $('#btnAlterar').prop('disabled', true);
  function isNew()
  {
    var retrievedObject = localStorage.getItem('local');
    local = ('retrievedObject: ', JSON.parse(retrievedObject));
    var retrievedObject = localStorage.getItem('redirectLocal');
    var redirect = ('retrievedObject: ', JSON.parse(retrievedObject));
    console.log("isnew");
    console.log(redirect);
    if(redirect == "false")
    {
      var retrievedObject = localStorage.getItem('idLocal');
      var idLocal = ('retrievedObject: ', JSON.parse(retrievedObject));
      $('#cidade').val(local[idLocal].cidade);
      $('#estado').val(local[idLocal].estado);
      $('#cidade').attr('name', idLocal);
      var teste = $('#cidade').attr('name');
      console.log(teste);
      $('#btnAlterar').prop('disabled', false);
      $('#btnSalvar').prop('disabled', true);
    }
  }
  isNew();


});
