$(document).ready(function () {
            $("#signinButton").click(function(event){
                  var form = $("#signinForm")[0];
                  var data = new FormData(form);
                   $("#signinButton").prop("disabled", true);
                   $.ajax({
                    type: "GET",
                    enctype: 'multipart/form-data',
                    url: "http://comandanamao.duckdns.org:8100/login/signin/",
                    data: data,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 600,
                    success: function (result) {
                        if(data && result !=""){
                          $.each(data, function(i, item){
                            $('input[name="'+ i +'"]').addClass('is-invalid');
                          })
                        }else{
                          $('input').removeClass('is-invalid');
                          $('#signinForm')[0].reset();
                          alert('Usuário logado com sucesso');
                          alert(result.login);
                          alert(result.tipoUser);
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
            });
