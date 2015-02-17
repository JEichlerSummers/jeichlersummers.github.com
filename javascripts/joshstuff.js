$(document).ready(function() {
	if (navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/)) {
	    $('.mobiletwitterbutton').css('display', 'block');
	    //$('.share-links').css('display', 'none');
	} else {
		$('.mobiletwitterbutton').css('display', 'none');
	}
});

