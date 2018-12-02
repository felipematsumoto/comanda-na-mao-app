$(document).ready(function () {
    url = location.href;
    var url = new URL(url);
    var usuario = url.searchParams.get("usuario");
    var usuario = url.searchParams.get("mesa");
    var usuario = url.searchParams.get("restaurante");
    var convidado = url.searchParams.get("convidado");
    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url:"http://comandanamao.duckdns.org:8100/comanda/lista_pedidos/?usuario="+usuario,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 10000,
        success: function (data) {
            var data = JSON.parse(JSON.stringify(data));
            var custo = 0;
            $("#produtos").empty();

              lista_html = "";

              // Preenche o cardapio

              for (var i in data)
              {

                if (data[i]['Estado'] == 2) {
                    estado = '<p class="card-text" style="color:green"> Pedido Pronto </p>';
                }
                else if (data[i]['Estado'] == 1) {
                    estado = '<p class="card-text" style="color:yellow"> Pedido em Preparo </p>';
                }
                else{
                    estado = '<p class="card-text" style="color:grey"> Pedido em Espera </p>';
                }

                lista_html += '<div class="card" value="'+ data[i][i] +'" style="width: 18rem;">';
                lista_html += '<img class="card-img-top" src="http://comandanamao.duckdns.org:8100/'+ data[i]['Foto_Produto'] +'">';
                lista_html += '<div class="card-body">';
                lista_html += '  <p class="card-text">';
                lista_html += 'Nome: '+ data[i]['Nome'] +'<br>';
                lista_html += 'Quantidade: '+ data[i]['Quantidade'] +'<br>';
                lista_html += 'Valor: R$ '+ data[i]['Custo'] +'<br>';
                custo += parseFloat(data[i]['Custo']);
                lista_html += 'Progresso: '+ estado;
                lista_html += '</p>';
                lista_html += '</div>';
                lista_html += '</div>';
                lista_html += '<br>';
              }

              $("#produtos").html(lista_html);
              $(".h1").html("<h1>"+custo+"</h1>");
        },
        error: function (e) {
            alert('Erro ao listar :(');
        }
    });
    
    $("#btnFazerPagamento").click(function(event){
        setCookie("Pagamento_Externo", "pay");
        setCookie("Convidado", convidado);
        loadPage("#");//Pagamento aqui
        
        $.ajax({
            type: "GET",
            enctype: 'multipart/form-data',
            url:"http://comandanamao.duckdns.org:8100/comanda/libera_comanda/?usuario="+usuario+"&mesa="+mesa+"&restaurante="+restaurante,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 10000,
            success: function (data) {
                alert("Pago!");
            }
        });
        
    });

});

