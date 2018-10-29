function listar_pedidos(data){
  $.ajax({
    type: "POST",
    enctype: 'multipart/form-data',
    url: "http://comandanamao.duckdns.org:8100/comanda/lista_pedidos/",
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    timeout: 10000,
    success: function (data){
        alert('Sucesso! :)');
    },
    error: function (e) {
        alert('Erro ao listar :(');
    }
  });
}
$(document).ready(function () {
  //Chamar a funcao listar_pedidos com o data no cookie do LOGIN do usuario (isso ver com o renan, ele que fez)
  //Eg: data = {"usuario":"mmagueta"}
  //No sucesso basta alterar todos os campos dando um for com append
});