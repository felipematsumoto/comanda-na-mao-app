$(document).ready(function() {

  function render(id, restaurante){
    $.ajax({
      type: "GET",
      url: "http://comandanamao.duckdns.org:8100/cardapio/cardapio/",
      data: {
        procura: id,
        restaurante: restaurante
      },
      success: function(result) {

        // Cria cabecalho dos Botoes
        $("#nav-tab").empty();
        $("#nav-val").empty();

        var cardapio_html = "";

        for (var i = 0; i < result.botoes.length; i++)
        {
          if(id != result.botoes[i].Nome)
          {
            cardapio_html += '<a class="nav-item nav-link" data-type="' + result.botoes[i].Nome +'" id="nav-tab-card" data-toggle="tab" role="tab" aria-controls="nav-' + result.botoes[i].id +'" aria-selected="false">' + result.botoes[i].Nome +'</a>';
          }
          else {
           cardapio_html += '<a class="nav-item nav-link active" data-type="' + result.botoes[i].Nome +'" id="nav-tab-card" data-toggle="tab" role="tab" aria-controls="nav-' + result.botoes[i].id +'" aria-selected="true">' + result.botoes[i].Nome +'</a>';
          }
        }

        $("#nav-tab").html(cardapio_html);

        cardapio_html = "";

        // Preenche o cardapio

        for (var i = 0; i < result.menu.length; i++)
        {
          cardapio_html += '<div class="card" style="width: 18rem;">';
          cardapio_html += '<img class="card-img-top" src="http://comandanamao.duckdns.org:8100/static/cardapio'+ result.menu[i].Arquivo+'">';
          cardapio_html += '<div class="card-body">';
          cardapio_html += '  <p class="card-text">';
          cardapio_html += 'Nome: '+ result.menu[i].Nome +'<br>';
          cardapio_html += 'Descrição: '+ result.menu[i].Descricao +'<br>';
          cardapio_html += 'Tamanho: '+ result.menu[i].Tamanho +'<br>';
          cardapio_html += 'Preço: '+ result.menu[i].Preco;
          cardapio_html += '</p>';
          cardapio_html += '</div>';
          cardapio_html += '</div>';
        }

        $("#nav-val").html(cardapio_html);
      },
      error: function(result) {
        console.log(result);
      }
    });
  }

  function render_header(restaurante)
  {
    $.ajax({
            type: "GET",
            url: "http://comandanamao.duckdns.org:8100/restaurante/busca_id/",
            data: {
              id: Number(restaurante)
            },
            timeout: 10000,
            success: function (result){
              restaurante = result.Nome;
              print(result)
              var cardapio_html = "";
              cardapio_html += "<div id='restaurante_nome' data-value='" + restaurante + "'> <h3>" + restaurante + "  - Cardápio</h3></div>";
              $("#cabecalho").html(cardapio_html);
              render("Tudo", restaurante);
            },
            error: function (e) {
                console.log(e);
            }
        });
  }

  render_header(getCookie('RestauranteID')); // <----------------------------------------------- Aqui vem o Nomo do restaurante
  

  $(document).on('click', '#nav-tab-card', function(e) {
    e.preventDefault();
    render($(e.target).data("type"), $("#restaurante_nome").data('value'));
  });


  $("#btninfo").click(function(event){
        loadPage("dadosrestaurante.html");
  });


});
