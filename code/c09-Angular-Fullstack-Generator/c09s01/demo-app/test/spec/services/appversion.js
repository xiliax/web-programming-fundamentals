'use strict';

describe('Service: appVersion', function () {

  // load the service's module
  beforeEach(module('demoAppApp'));

  // instantiate service
  var appVersion;
  beforeEach(inject(function (_appVersion_) {
    appVersion = _appVersion_;
  }));

  it('should do something', function () {
    expect(!!appVersion).toBe(true);
  });

});
