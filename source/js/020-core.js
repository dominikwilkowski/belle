$(".js-collection").fancybox({
	openEffect: 'elastic',
	closeEffect: 'elastic',
	padding: 0,
	helpers:  {
		title : {
			type : 'inside',
		},
	},
	afterShow: function() {
		$('.js-body').addClass('is-open');
	},
	beforeClose: function() {
		$('.js-body').removeClass('is-open');
	}
});

$(".js-aboutme").fancybox({
	openEffect: 'elastic',
	closeEffect: 'elastic',
	type: 'inline',
	padding: 0,
	helpers:  {
		title : {
			type : 'inside',
		},
	},
	afterShow: function() {
		$('.js-body').addClass('is-open');
	},
	beforeClose: function() {
		$('.js-body').removeClass('is-open');
	}
});