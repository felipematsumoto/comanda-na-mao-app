function showModal(){
    $("#modalPag").modal('show');
  }

  $("#btnPagar").click(function(event){
        $("#btnPagar").prop("disabled", true);
        var data = new FormData();
        data.append('mesa',getCookie("MesaID"));
        data.append('usuario',getCookie("UserID"));
        data.append('restaurante',getCookie("RestauranteID"));

         $.ajax({
          type: "GET",
          enctype: 'multipart/form-data',
          url: "http://comandanamao.duckdns.org:8100/comanda/libera_comanda/",
          data: data,
          processData: false,
          contentType: false,
          cache: false,
          timeout: 10000,
          success: function (data){
              alert('Pagamento efetuado com sucesso');
              $("#modalPag").modal('hide');
              $("#btnPagar").prop("disabled", false);
              loadPage("exibir_pedido.html");
          },
          error: function (e) {
              alert('Erro ao fazer o pagamento');
              $("#btnPagar").prop("disabled", false);
              $("#modalPag").modal('hide');
          }
        });
      return false;
  });

$(document).ready(function () {

    $.ajax({
        type: "GET",
        enctype: 'multipart/form-data',
        url:"http://comandanamao.duckdns.org:8100/comanda/lista_pedidos/?usuario="+getCookie('User'),
        processData: false,
        contentType: false,
        cache: false,
        timeout: 10000,
        success: function (data) {
            var data = JSON.parse(JSON.stringify(data));
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
                lista_html += 'Progresso: '+ estado;
                lista_html += '</p>';
                lista_html += '</div>';
                lista_html += '</div>';
                lista_html += '<br>';
              }

              $("#produtos").html(lista_html);
        },
        error: function (e) {
            alert('Erro ao listar :(');
        }
    });

    $("#btnFazerPedido").click(function(event){
        setCookie("CardapioMode","buy");
        loadPage("GaleriaProduto.html");
    });


});
