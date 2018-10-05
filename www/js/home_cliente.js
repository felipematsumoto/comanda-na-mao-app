$(document).ready(function() {
	$(".navbar").show();
	$("#btnOpenQRS").click(function(event){
		cordova.plugins.barcodeScanner.scan(
		   function (result) {
		        if(!result.cancelled){
		               if(result.format == "QR_CODE"){
		                    var value = result.text;
		                    alert(value);
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