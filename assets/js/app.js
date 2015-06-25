'use strict';

/* App Module */

var datChatApp = angular.module('datChatApp', [
  'ngRoute',
  'ngSailsBind',
  'datChatControllers',
  'datChatFilters',
  'datChatServices'
]);

datChatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/chat', {
        templateUrl: 'partials/chat-list.html',
        controller: 'ChatListCtrl'
      }).
      when('/chat/:chatId', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl'
      }).
      otherwise({
        redirectTo: '/chat'
      });
  }]);
