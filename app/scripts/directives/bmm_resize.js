'use strict';

angular.module('bmmLib')
	.directive('bmmResize', function () {
		return {
			link: function postLink(scope, element) {

				element.resizable();

			}
		};
	});
