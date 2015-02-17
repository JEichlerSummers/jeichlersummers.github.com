$(document).ready(function() {
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	    $('.mobiletwitterbutton').css('display', 'block');
	    $('.share-links').css('display', 'none');
	} else {
		$('.mobiletwitterbutton').css('display', 'none');
	}
});