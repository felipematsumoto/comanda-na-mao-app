$(document).ready(function () {
    $("#btnSearch").click(function(event){
        var filtro = String(document.getElementById("inputSearch").value)
        $.ajax({
            type: "POST",
            url: "http://comandanamao.duckdns.org:8100/restaurante/busca/",
            data: {
              procura: filtro,
            },
            timeout: 10000,
            success: function (result){

              $("#nav-val").empty();

              lista_html = "";

              // Preenche o cardapio

              for (var i = 0; i < result.lista.length; i++)
              {
                lista_html += '<div class="card" value="'+ result.lista[i].Nome +'" style="width: 18rem;">';
                lista_html += '<img class="card-img-top" src="'+ result.lista[i].Foto +'">';
                lista_html += '<div class="card-body">';
                lista_html += '  <p class="card-text">';
                lista_html += 'Nome: '+ result.lista[i].Nome +'<br>';
                lista_html += 'Telefone: '+ result.lista[i].Tel +'<br>';
                lista_html += 'Endereço: '+ result.lista[i].End +'<br>';
                lista_html += 'Dono: '+ result.lista[i].Dono;
                lista_html += '</p>';
                lista_html += '</div>';
                lista_html += '</div>';
              }

              $("#nav-val").html(lista_html);


            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    $('#nav-val').on('click', 'div',function(e){
      setCookie("Cardapio",$(this)[0].attributes.value.value)
      loadPage("GaleriaProduto.html");
    });

    $("#btnMyRest").click(function(event){
        $.ajax({
            type: "POST",
            url: "http://comandanamao.duckdns.org:8100/restaurante/busca/",
            data: {
              procura: getCookie("User"),
              pornome: 'sim',
            },
            timeout: 10000,
            success: function (result){

              $("#nav-val").empty();

              lista_html = "";

              // Preenche o cardapio

              for (var i = 0; i < result.lista.length; i++)
              {
                lista_html += '<div class="card" value="'+ result.lista[i].Nome +'" style="width: 18rem;">';
                lista_html += '<img class="card-img-top" src="'+ result.lista[i].Foto +'">';
                lista_html += '<div class="card-body">';
                lista_html += '  <p class="card-text">';
                lista_html += 'Nome: '+ result.lista[i].Nome +'<br>';
                lista_html += 'Telefone: '+ result.lista[i].Tel +'<br>';
                lista_html += 'Endereço: '+ result.lista[i].End +'<br>';
                lista_html += 'Dono: '+ result.lista[i].Dono;
                lista_html += '</p>';
                lista_html += '</div>';
                lista_html += '</div>';
              }

              $("#nav-val").html(lista_html);


            },
            error: function (e) {
                console.log(e);
            }
        });
    });


    function init_btn(){
      if(getCookie("UserTipo") == "Dono")
      {
        $("#btnMyRest").show();
      }
      else if(getCookie("UserTipo") == "Consumidor")
      {
        $("#btnMyRest").hide();
      }
    }

    $("#btnSearch").click();
    init_btn();

});
