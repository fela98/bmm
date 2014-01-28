'use strict';

describe('Directive: bmmNavigatorMain', function () {

  // load the directive's module
  beforeEach(module('bmmLibApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bmm-navigator-main></bmm-navigator-main>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the bmmNavigatorMain directive');
  }));
});
