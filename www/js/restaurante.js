$(document).ready(function () {

  console.log('entrou');
  $("#btnCadastrar").click(function(){
            console.log('click');
            var form = $("#formRestaurante")[0];
            var data = new FormData(form);
            data.append('dono',getCookie("ID"));
             $("#btnCadastrar").prop("disabled", true);
             $.ajax({
              type: "POST",
              enctype: 'multipart/form-data',
              url: "http://comandanamao.duckdns.org:8100/restaurante/add_restaurante/",
              data: data,
              processData: false,
              contentType: false,
              cache: false,
              timeout: 10000,
              success: function (data){
                  if(data && data !=""){
                    $.each(data, function(i, item){
                      $('input[name="'+ i +'"]').addClass('is-invalid');
                    })
                  }else{
                    $('input').removeClass('is-invalid');
                    $('#formRestaurante')[0].reset();
                    alert('Restaurante cadastrado com sucesso');
                  }
                  $("#btnCadastrar").prop("disabled", false);
              },
              error: function (e) {
                  alert('Erro ao adicionar o restaurante');
                  $("#btnCadastrar").prop("disabled", false);
              }
          });
          return false;
  });
});
