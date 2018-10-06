$(document).ready(function () {
    $("#btnSave").click(function(event){
          var form = $("#formCardapio")[0];
          var data = new FormData(form);
           $("#btnSave").prop("disabled", true);
           $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://comandanamao.duckdns.org:8100/cardapio/add_cardapio/",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 10000,
            success: function (data){
                console.log(data);
                $("#btnSave").prop("disabled", false);
                alert('O produto foi cadastrado com sucesso');
                $("#formCardapio")[0].reset();
            },
            error: function (e) {
                console.log(e);
                alert('Não foi possivel cadastrar o produto');
                $("#btnSave").prop("disabled", false);
            }
        });
        return false;
        e.preventDefault();
    });

    function get_tipos(log)
    {

      $.ajax({
        type: "GET",
        url: "http://comandanamao.duckdns.org:8100/cardapio/tipos/",
        data: {
          login: log,
          mensagem: "tipos",
        },
        success: function(result) {

          console.log(result);

          // Cria cabecalho dos Botoes
          $("#tipoProduto").empty();

          var tipos_html = "";
          var resta_html = "";

          for (var i = 0; i < result.tipos.length; i++)
          {
              tipos_html += '<option value="' + result.tipos[i].Id +'">' + result.tipos[i].Nome + '</option>';
          }

          for(var i = 0; i < result.restaurantes.length; i++)
          {
              resta_html += '<option value="' + result.restaurantes[i].Id +'">' + result.restaurantes[i].Nome + '</option>';
          }

          $("#tipoProduto").html(tipos_html);
          $("#restaurante").html(resta_html);

        },
        error: function(result) {
          console.log(result);
        }
      });
    }



    get_tipos(getCookie('User'));

});
