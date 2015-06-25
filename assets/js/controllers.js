'use strict';

/* Controllers */

var datChatControllers = angular.module('datChatControllers', []);

datChatControllers.controller('ChatListCtrl', ['$scope', '$sailsBind', '$location', 'Chat',
  function($scope, $sailsBind, $location, Chat) {
    $sailsBind.bind('chat', $scope);
    $scope.createChat = function() {
    	var chat = Chat.create({ name: 'Chat #' + parseInt(Math.random() * 1000), topic: 'TODO: allow setting topic' },
    		function(data) {
    			console.log(data.id);
	    		$location.path('#/chat/' + data.id);
	    		$scope.$apply();
	    	});
    }
  }]);

datChatControllers.controller('ChatCtrl', ['$scope', '$routeParams', '$sailsBind', 'Chat', 'ChatMessages',
  function($scope, $routeParams, $sailsBind, Chat, ChatMessages) {
    $scope.chat = Chat.chat({chatId: $routeParams.chatId});

    $sailsBind.bind('message', $scope, {'chatId': {'equals': $routeParams.chatId}})

    $scope.submitMessage = function(message) {
    	if (message.trim() === '' || $scope.userName.trim() === '') {
    		return;
    	}
    	ChatMessages.create({ chatId: $routeParams.chatId, author: $scope.userName, message: $scope.composeMessage });
    	$scope.composeMessage = '';
    }
  }]);
