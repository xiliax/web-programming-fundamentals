'use strict';

describe('tasks', function() {
  var _tasks;

  beforeEach(module('todo'));

  beforeEach(inject(function($injector) {
    _tasks = $injector.get('tasks');
  }));

  describe('creation', function() {
    it('return a function', function() {
      expect(typeof _tasks).toBe('function');
    });
  });

  describe('isValid', function() {
    it('should be valid if name and birth date is setted', function() {
      var m = new _tasks();
      m.name = 'Felipe Smith';
      m.birthDate = new Date();

      expect(m.isValid()).toBe(true);
    });

    it('should be not valid if name or birth date is not setted', function () {
      var m1 = new _tasks();
      expect(m1.isValid()).toBe(false);

      var m2 = new _tasks();
      m2.birthDate = new Date();
      expect(m2.isValid()).toBe(false);

      var m3 = new _tasks();
      m3.name = 'Felipe Smith';
      expect(m3.isValid()).toBe(false);
    })
  })
});
