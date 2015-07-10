'use strict';

/* Services */

var datChatServices = angular.module('datChatServices', ['ngResource']);

datChatServices.factory('Game', ['$resource',
  function($resource){
    return $resource('game/:gameId', {}, {
      gameList: {method:'GET', isArray: true},
      get: {method:'GET'},
      populate: {method: 'GET', url: 'game/populate/:id'},
      create: {method: 'POST'},
      delete: {method: 'DELETE', url: 'game/destroy/:id'}
    });
  }]);

datChatServices.factory('ChatMessages', ['$resource',
  function($resource){
    return $resource('message/', { }, {
      message: {method:'GET', isArray:true},
      create: {method:'POST'}
    });
  }]);