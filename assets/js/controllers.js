'use strict';

/* Controllers */

var datChatControllers = angular.module('datChatControllers', []);

datChatControllers.controller('ChatListCtrl', ['$scope', '$sailsBind', 'Chat',
  function($scope, $sailsBind, Chat) {
    $sailsBind.bind('chat', $scope);
  }]);

datChatControllers.controller('ChatCtrl', ['$scope', '$routeParams', '$sailsBind', 'Chat', 'ChatMessages',
  function($scope, $routeParams, $sailsBind, Chat, ChatMessages) {
    $scope.chat = Chat.chat({chatId: $routeParams.chatId});
    $sailsBind.bind('message', $scope, {'chatId': {'equals': $routeParams.chatId}})

    $scope.submitMessage = function(message) {
    	ChatMessages.create({ chatId: $routeParams.chatId, author: $scope.userName, message: $scope.composeMessage });
    	$scope.composeMessage = '';
    }
  }]);
