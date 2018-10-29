var pagesCliente = ["homeCliente.html", "buscarestaurante.html","fazerPedido.html"]
var nomesCliente = ["Página Inicial", "Ver Restaurantes", "Fazer pedido"]
var pagesDono = ["homeDono.html", "restaurante.html", "addcardapio.html","buscarestaurante.html"]
var nomesDono = ["Página Inicial", "Criar Restaurantes", "Adicionar Produtos", "Ver Restaurantes"]

$('#listaLinks').on('click', 'li',function(){
    var that = $(this);
    that.closest('ul').find('.active').removeClass('active');
    that.addClass('active');
    loadPage(pages[that.val()]);
    $('#sidebarCollapse').click();
});


$('#sairButton').click(function(){

  $('#sidebarCollapse').click();
  setCookie("User","");
  setCookie("UserID","");
  setCookie("UserTipo","");

  setCookie("Cardapio","");

  setCookie("Restaurante","")
  setCookie("RestauranteID","");
  setCookie("MesaID","");

  loadPage('signin.html');

})

$(document).ready(function () {
	$('#sidebarCollapse').on('click', function () {
			  $('#sidebar').toggleClass('active');
        get_item("User",getCookie("UserID"));
        get_item("Restaurante",1);
    });

  if(checkCookie("UserID") != null)
  {
      tipo = getCookie("UserTipo");
      geraBarra(tipo);
      if(tipo == "Dono")
        loadPage("homeDono.html");
      else if(tipo == "Consumidor")
        loadPage("homeCliente.html");
  }
  else {
    loadPage("signin.html");
  }
});

function loadPage(page) {
    $("#workspace").load(page);
}

function geraBarra(tipo){

    var nomes
    if(tipo == "Dono")
    {
      pages = pagesDono
      nomes = nomesDono
    }
    else if(tipo == "Consumidor")
    {
      pages = pagesCliente
      nomes = nomesCliente
    }

    $("#listaLinks").empty();

    var menu_html = "";

    for(var i = 0; i < nomes.length; i++)
    {
        if(i == 0)
        {
          menu_html += '<li value="' + i + '" class="active">'
        }
        else
        {
          menu_html += '<li value="' + i + '">'
        }
        menu_html += '<a href="#">' + nomes[i] + '</a>'
        menu_html += '</li>'

    }

    $("#listaLinks").html(menu_html);

    $("#welcome").empty();
    $("#welcome").html("<h8> Olá " + getCookie("User") + "</h8>");


}

function get_item(tipo, id)
{
  $.ajax({
      type: "POST",
      url: "http://comandanamao.duckdns.org:8100/login/getitem/",
      data: {
        tipo: tipo,
        id: id,
      },
      timeout: 10000,
      success: function (result){
        console.log(result);

      },
      error: function (e) {
          console.log(e);
      }
  });
}
