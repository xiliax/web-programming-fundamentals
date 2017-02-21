'use strict';

describe('tasks', function() {
  var _tasks;

  beforeEach(module('todo'));

  beforeEach(inject(function($injector) {
    _tasks = $injector.get('tasks');
  }));

  describe('doSomething', function() {
	it('should be an object', function() {
		expect(typeof _tasks).toBe('object');
	})
	  
    it('should doSomething', function() {
      _tasks.doSomething();
    });
  });
});
