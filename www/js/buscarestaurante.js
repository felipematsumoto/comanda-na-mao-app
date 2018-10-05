$(document).ready(function () {
    $("#btnSearch").click(function(event){
        var filtro = String(document.getElementById("inputSearch").value)
        $.ajax({
            type: "POST",
            url: "http://comandanamao.duckdns.org:8100/restaurante/busca/",
            data: {
              procura: filtro,
            },
            processData: false,
            contentType: false,
            cache: false,
            timeout: 10000,
            success: function (result){
                console.log(filtro);
                console.log(result);
            },
            error: function (e) {
                console.log(e);
            }
        });
    });
});
