var pages = ["home.html", "restaurante.html", "addcardapio.html","GaleriaProduto.html"];
$('#sidebar ul li').click(function(){
    var that = $(this);
    that.closest('ul').find('.active').removeClass('active');
    that.addClass('active');
    $("#workspace").load(pages[that.val()]);
    $('#sidebarCollapse').click();
});

$(document).ready(function () {
	$('#sidebarCollapse').on('click', function () {
			$('#sidebar').toggleClass('active');
    });
    
});
