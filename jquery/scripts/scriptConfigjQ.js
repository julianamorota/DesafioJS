$(document).ready(function()
{
  var retrievedObject = localStorage.getItem('parametroLocal');
  var parametro = ('retrievedObject: ', JSON.parse(retrievedObject));
  var itensPorPagina;
  if (parametro)
    itensPorPagina = parametro;
  else
	itensPorPagina = 3; //padrão
  $('#paginas').val(itensPorPagina);
});
