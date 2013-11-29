$.fn.scroll_loading = function(options) {
	var defaults = {
		url: '',
		data: {},
		type: 'html',
		callback: function() {
		}
	}

	var configs = $.extend(defaults, options);

	configs.loading = false;

	$(this).each(function() {
		var el = $(this);

		el.on('mousewheel DOMMouseScroll', function(e) {
			var el = $(this);
			if (e.originalEvent.wheelDelta >= 0) { //scroll up

			} else { //scroll down
				if (el.scrollTop() + el.innerHeight() >= el[0].scrollHeight) {
					//fim do elemento
					if (configs.loading == true) {
						return false;
					}

					configs.loading = true;

					$.ajax({
						type: "POST",
						url: configs.url,
						data: configs.data,
						dataType: configs.type,
						complete: function(returned) {
							configs.callback(el, returned.responseText);
							configs.loading = false;
						}
					});
				}
			}

		});
	});
}