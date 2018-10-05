var pagesCliente = ["homeCliente.html", "buscarestaurante.html"]
var nomesCliente = ["Página Inicial", "Ver Restaurantes"]
var pagesDono = ["homeDono.html", "restaurante.html", "addcardapio.html","GaleriaProduto.html"]
var nomesDono = ["Página Inicial", "Criar Restaurantes", "Adicionar Produtos", "Ver Produtos"]
var pages

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
  setCookie("Tipo","");
  setCookie("ID","");
  setCookie("Restaurante","");

  loadPage('signin.html');

})

$(document).ready(function () {
	$('#sidebarCollapse').on('click', function () {
      if(checkCookie("User") != null)
      {
			   $('#sidebar').toggleClass('active');
         console.log(getCookie("User"));
         console.log(getCookie("Tipo"));
       }
    });

  if(checkCookie("ID") != null)
  {
      tipo = getCookie("Tipo");
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
