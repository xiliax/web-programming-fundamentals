'use strict';

describe('Tasks', function() {
    var _Tasks;

    beforeEach(module('todo'));

    beforeEach(inject(function($injector) {
      _Tasks = $injector.get('Tasks');
    }));

    describe('instance', function() {
      it('should have the right prop for the instance', function() {
          var _something = new _Tasks();

          expect(_something.something).toEqual(123);
      });
    });

    describe('isValid', function() {
      it('should return true', function() {
          var _something = new _Tasks();

          expect(_something.isValid()).toBeTruthy();
      });
    });
});
