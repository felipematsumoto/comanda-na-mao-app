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
	
	
	$("#btnOpenQRS").click(function(event){
		cordova.plugins.barcodeScanner.scan(
		   function (result) {
		        if(!result.cancelled){
		               if(result.format == "QR_CODE"){
												var argumentos = result.text.split(';');
												setCookie("RestauranteID",argumentos[0].split('=')[1]);
												setCookie("MesaID",(argumentos[1].split('=')[1]));
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
