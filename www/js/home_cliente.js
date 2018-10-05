$(document).ready(function() {
	$(".navbar").show();
	$("#btnOpenQRS").click(function(event){
		cordova.plugins.barcodeScanner.scan(
		   function (result) {
		        if(!result.cancelled){
		               if(result.format == "QR_CODE"){
												var argumentos = result.text.split(';');
												setCookie("RestauranteID",argumentos[0].split('=')[1]);
												setCookie("MesaID",(argumentos[1].split('=')[1]));
												alert(document.cookie);
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
});
