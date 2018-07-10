function myFunction($) {
    $.classList.toggle("change");

}

jQuery(document).ready(function($){
	$('.mobile-menu').on('click',function(){
		if($('.mobile-menu').hasClass('change')){

			//alert('hi');
			$('.header nav').slideDown();
		}else{
			$('.header nav').slideUp();
		}


	});
	
});