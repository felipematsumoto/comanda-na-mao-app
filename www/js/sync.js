$(document).ready(function() {

	const sleep = (mili) => {
		return new Promise(resolve => setTimeout(resolve, mili))
	}

	while(True){
		sleep(500).then(() => {
		
			$.ajax({
				type: "GET",
				enctype: 'multipart/form-data',
				url:"URL", 
				processData: false,
				contentType: false,
				cache: false,
				timeout: 10000,
				success: function (data) {
				
				},
				error: function(e){
			
				}
			});

		});
});
