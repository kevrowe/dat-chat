'use strict';

/* Services */

var datChatServices = angular.module('datChatServices', ['ngResource']);

datChatServices.factory('Chat', ['$resource',
  function($resource){
    return $resource('chat/:chatId', {}, {
      chatList: {method:'GET', isArray:true},
      chat: {method:'GET'},
      create: {method: 'POST'},
      delete: {method: 'DELETE', url: 'chat/destroyWithMessages/:id', isArray: true}
    });
  }]);

datChatServices.factory('ChatMessages', ['$resource',
  function($resource){
    return $resource('message/', { }, {
      message: {method:'GET', isArray:true},
      create: {method:'POST'}
    });
  }]);