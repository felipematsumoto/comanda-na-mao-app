$(document).ready(function() {
	$(".navbar").show();	
	var dvc = {
		 dev_id: getCookie("UserID"),
		 reg_id: localStorage.getItem('registrationId')
	 }
	 
	 var oldRegId = localStorage.getItem('sentId');
	 if (oldRegId !== localStorage.getItem('registrationId')) {
		 // Save new registration ID
		 localStorage.setItem('sentId', localStorage.getItem('registrationId'));
		 // Post registrationId to your app server as the value has changed
		 $.ajax({
			  type: "POST",
			  dataType: 'json',
			  processData: false,
			  contentType: 'application/json; charset=UTF-8',
			  url: "http://comandanamao.duckdns.org:8100/gcm/v1/device/register/",
			  data: JSON.stringify(dvc),
			  timeout: 10000,
			  success: function (){
			  },
			  error: function (e) {
				  console.log(e.responseText);
			  }
		  });
	 }

	if(getCookie("MesaID") == ""){
		$("#divBtn").html('<button type="button" class="btn btn-info btn-lg btn-block" id="btnOpenQRS">Entrar em uma mesa</button>');
	}else{
		$("#divBtn").html('<button type="button" class="btn btn-info btn-lg btn-block" id="btnOpenComanda">Voltar para a comanda</button>');
	}
});

$(document).on('click', '#btnOpenComanda', function(e) {
		e.preventDefault();
		loadPage("exibir_pedido.html");
	});
	
	$(document).on('click', '#btnOpenQRS', function(e) {
    e.preventDefault();
		cordova.plugins.barcodeScanner.scan(
		   function (result) {
		        if(!result.cancelled){
		               if(result.format == "QR_CODE"){
							var argumentos = result.text.split(';');
							setCookie("RestauranteID",argumentos[0].split('=')[1]);
							setCookie("MesaID",(argumentos[1].split('=')[1]));

							$.ajax({
						      type: "GET",
						      url: "http://comandanamao.duckdns.org:8100/comanda/inicia_comanda/",
						      data: {
						        usuario: getCookie("User"),
						        mesa: getCookie("MesaID"),
						        restaurante: getCookie("RestauranteID")
						      },
						      success: function(result) {
						      	loadPage("exibir_pedido.html");
						      },
						      error: function(result) {
						        console.log(result);
						      }
						    });
		               }else{
		                  alert("Este aplicativo aceita apenas QR codes");
		               }
		        }
		     },
		     function (error) {
		          alert("Ocorreu um erro: " + error);
		     }
		);
	});

$(document).on('click', '#nav-tab-card', function(e) {
    e.preventDefault();
    render($(e.target).data("type"), $("#restaurante_nome").data('value'));
  });