$(document).ready(function () {
	$("#messageNotification").text(getCookie("messageNotification"));
	
	$("#btnNaoDividir").click(function(event){
		setCookie("MayDivideOrder","");
		setCookie("messageNotification","");
		loadPage("homeCliente.html");
	});
	
	$("#btnDividir").click(function(event){
		$.ajax({
			type: "POST",
			url: "http://comandanamao.duckdns.org:8100/comanda/dividir_pedido/",
			data: {
				pedido: getCookie("MayDivideOrder"),
				comanda: 2,
			},
			timeout: 10000,
			success: function (result){
				alert("Pedido dividido!");
				setCookie("MayDivideOrder","");
				setCookie("messageNotification","");
				loadPage("homeCliente.html");
			},
			error: function (e) {
				console.log(e);
			}
		});
	});
	
});