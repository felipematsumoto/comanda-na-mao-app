$(function () {

    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        //url: "https://api.myjson.com/bins/1g1brg",
        url:" 'http://comandanamao.duckdns.org:8100/comanda/lista_pedidos/?usuario='+getCookie('User')", 
        // data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 10000,
        success: function (data) {
            var data = JSON.parse(JSON.stringify(data));
            var phtml = '';
            for (var i in data) {
                phtml += '<li class="produto-dd">' +
                '<input type="hidden" class="produto-id" value="' + data[i][i] + '" /><h3>' + data[i]["Coment"] + ' </h3><p>' +
                    '<img src="http://comandanamao.duckdns.org:8100/' + data[i]['Foto_Produto'].slice(1, -1) + '" height="90" /></p><p class="preco-de"></p>' +
                    '<p class="preco-por">Valor: R$ ' + data[i]['Custo'] + '</p></li>';
            }

            $("#produtos").append(phtml);
            console.log(data);
            // alert('Sucesso! :)');
        },
        error: function (e) {
            alert('Erro ao listar :(');
        }
    });
}
   	 );