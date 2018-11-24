$(document).ready(function () {

  console.log('entrou');
  $("#btnPedido").click(function(){
            console.log('click');
            var form = $("#formRestaurante")[0];
            var data = new FormData(form);
            data.append('mesa',getCookie("MesaID"));
			data.append('user',getCookie("UserID"));
             $("#btnPedido").prop("disabled", true);
             $.ajax({
              type: "POST",
              enctype: 'multipart/form-data',
              url: "http://comandanamao.duckdns.org:8100/comanda/fazer_pedido/",
              data: data,
              processData: false,
              contentType: false,
              cache: false,
              timeout: 10000,
              success: function (data){
                  if(data && data !=""){
                    alert(data);
                  }else{
                    alert('Pedido efetuado com sucesso'); 
                  }
                  
				          $("#btnPedido").prop("disabled", false);
              },
              error: function (e) {
                  alert('Erro ao fazer o pedido');
				  $("#btnPedido").prop("disabled", false);
              }
          });
          return false;
  });
});
