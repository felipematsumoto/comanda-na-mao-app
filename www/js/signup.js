$(document).ready(function () {
          $("#signupButton").click(function(event){
                  var form = $("#signupForm")[0];
                  var data = new FormData(form);
                  $("#signupButton").prop("disabled", true);
                  $.ajax({
                        type: "POST",
                        enctype: 'multipart/form-data',
                        url: "http://comandanamao.duckdns.org:8100/login/signup/",
                        data: data,
                        processData: false,
                        contentType: false,
                        cache: false,
                        timeout: 10000,
                        success: function (result) {
                              if(result.status == '1'){
                                alert('Usário cadastrado com sucesso');
                                loadPage("signin.html");
                              }
                              else if(result.status == '0'){
                                alert('Login ou Email já existentes');
                              }
                              $("#signupButton").prop("disabled", false);
                        },
                        error: function (e) {
                              console.log(e);
                              $("#signupButton").prop("disabled", false);
                        }
			            });
			            return false;
          });


          $("#loginButton").click(function(event){
                loadPage("signin.html");
          });

});
