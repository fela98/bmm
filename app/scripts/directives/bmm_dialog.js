'use strict';

/**
 * A generic confirmation for risky actions.
 * Usage: bmm-dialog-message="Sure?" bmm-dialog-confirm="function()"
 */

angular.module('bmmLibApp')
  .directive('bmmDialog', [function () {
    return {
      link: function postLink(scope, element) {
        
        element.addClass('bmm-dialog');

        element.bind('click', function() {
          var message = attrs.bmmDialogMessage;
          if (message && confirm(message)) {
            scope.$apply(attrs.bmmDialogConfirm);
          }
        });

      }
    };
  }]);