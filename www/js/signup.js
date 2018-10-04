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
                    timeout: 600,
                    success: function (data) {
                        if(data && data !=""){
                          $.each(data, function(i, item){
                            $('input[name="'+ i +'"]').addClass('is-invalid');
                          })
                        }else{
                          $('input').removeClass('is-invalid');
                          $('#signupForm')[0].reset();
                          alert('Usário cadastrado com sucesso');
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
            });
