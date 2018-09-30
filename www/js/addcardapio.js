$(document).ready(function () {
    $("#btnSave").click(function(event){
          var form = $("#formCardapio")[0];
          var data = new FormData(form);
           $("#btnSave").prop("disabled", true);
           $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "http://comandanamao.duckdns.org:8100/cardapio/add_cardapio/",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600,
            success: function (data){
                console.log(data);
                $("#btnSave").prop("disabled", false);
                alert('O produto foi cadastrado com sucesso');
                $("#formCardapio")[0].reset();
            },
            error: function (e) {
                console.log(e);
                alert('Não foi possivel cadastrar o produto');
                $("#btnSave").prop("disabled", false);
            }
        });
        return false;
        e.preventDefault();
    });
});