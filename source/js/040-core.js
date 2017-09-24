$(".js-collection").fancybox({
	openEffect: 'elastic',
	closeEffect: 'elastic',
	padding: 0,
	arrows: true,
	tpl: {
		closeBtn: '<button type="button" title="Close" class="fancybox-item fancybox-close">' +
				'<svg class="closeBtn-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
					'<circle fill="#fff" cx="256" cy="256" r="153" fill-opacity="1" stroke-opacity="1"></circle>' +
					'<path class="closeBtn-path" d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z' +
						'M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8' +
						'l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76' +
						'l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7' +
						'c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"/>' +
				'</svg>' +
			'</button>',
		next: '<button title="Next" class="fancybox-nav fancybox-next">' +
			'<svg class="next-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">' +
					'<path class="next-path" d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5' +
						'c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/>' +
				'</svg>' +
			'</button>',
		prev: '<button title="Previous" class="fancybox-nav fancybox-prev">' +
				'<svg class="prev-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve">' +
					'<path class="prev-path" d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225' +
						'c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/>' +
				'</svg>' +
			'</button>',
	},
	helpers:  {
		title : {
			type : 'inside',
		},
		media: {},
	},
	afterShow: function() {
		$('.js-body').addClass('is-open');

		$('.fancybox-wrap').swipe({
			swipe: function(event, direction) {
				if(direction === 'left' || direction === 'up') {
					$.fancybox.prev( direction );
				}
				else {
					$.fancybox.next( direction );
				}
			}
		});
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
	arrows: false,
	tpl: {
		closeBtn: '<button type="button" title="Close" class="fancybox-item fancybox-close">' +
				'<svg class="closeBtn-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">' +
					'<circle fill="#fff" cx="256" cy="256" r="153" fill-opacity="1" stroke-opacity="1"></circle>' +
					'<path class="closeBtn-path" d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,379.7,33,256,33z' +
						'M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8' +
						'l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76' +
						'l-75.9-75c-3.1-3.1-3.1-8.2,0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7' +
						'c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"/>' +
				'</svg>' +
			'</button>',
	},
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