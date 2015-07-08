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
      when('/game', {
        templateUrl: 'partials/game-list.html',
        controller: 'GameListCtrl'
      }).
      when('/game/:gameId', {
        templateUrl: 'partials/game.html',
        controller: 'GameCtrl'
      }).
      when('/chat/:chatId', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl'
      }).
      otherwise({
        redirectTo: '/game'
      });
  }]);
