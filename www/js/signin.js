$(document).ready(function () {
            $("#signinButton").click(function(event){
                  var form = $("#signinForm")[0];
                  var data = new FormData(form);
                  $("#signinButton").prop("disabled", true);
                  $.ajax({
                      type: "POST",
                      enctype: 'multipart/form-data',
                      url: "http://comandanamao.duckdns.org:8100/login/signin/",
                      data: data,
                      processData: false,
                      contentType: false,
                      cache: false,
                      timeout: 10000,
                      success: function (result) {
                        if(result.login == 'null'){
                          alert("Dados incorretos");
                        }
                        else{
                          setCookie("User",result.login);
                          setCookie("Tipo",result.tipoUser);
                          setCookie("ID",result.ID);
                          geraBarra(result.tipoUser);

                          if(result.tipoUser == 'Dono')
                          {
                            loadPage("homeDono.html");
                          }
                          else if(result.tipoUser == 'Consumidor')
                          {
                            loadPage("homeCliente.html");
                          }

                        }
                        $("#signinButton").prop("disabled", false);
                      },
                      error: function (e) {
                        console.log(e);
                        $("#signinButton").prop("disabled", false);
                      }
					        });
					        return false;
            });

            $("#registerButton").click(function(event){
                  loadPage("signup.html");
            });
});
