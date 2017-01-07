'use strict';

describe('CommentDAO', function() {
    var _CommentDAO;

    beforeEach(module('demoApp'));

    beforeEach(inject(function($injector) {
      _CommentDAO = $injector.get('CommentDAO');
    }));

    describe('instance', function() {
      it('should have the right prop for the instance', function() {
          var _something = new _CommentDAO();

          expect(_something.something).toEqual(123);
      });
    });

    describe('isValid', function() {
      it('should return true', function() {
          var _something = new _CommentDAO();

          expect(_something.isValid()).toBeTruthy();
      });
    });
});
