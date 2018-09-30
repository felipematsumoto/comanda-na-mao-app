$(document).ready(function () {
  $('input[name="telefone"]').mask("(00)0000-00009");
  $('input[name="cnpj"]').mask("00.000.000/0000-00");
  $("#btnCadastrar").click(function(event){
          var form = $("#formRestaurante")[0];
          var data = new FormData(form);
           $("#btnCadastrar").prop("disabled", true);
           $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://comandanamao.duckdns.org:8100/restaurante/add_restaurante/",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600,
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