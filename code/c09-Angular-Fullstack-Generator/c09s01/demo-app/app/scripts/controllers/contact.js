'use strict';

/**
 * @ngdoc function
 * @name demoAppApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the demoAppApp
 */
angular.module('demoAppApp')
  .controller('ContactCtrl', function () {
    this.contacts = [
      {type: 'Phone', value: '1-800-925-1234'},
      {type: 'Website', value: 'http://my-awesome-app.com'},
      {type: 'Twitter', value: '@awesome-app'},
      {type: 'Facebook', value: 'http://facebook.com/awesome-app'}
    ];
  });
