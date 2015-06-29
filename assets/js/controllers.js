'use strict';

/* Controllers */

var datChatControllers = angular.module('datChatControllers', []);

datChatControllers.controller('ChatListCtrl', ['$scope', '$sailsBind', '$location', 'Chat',
  function($scope, $sailsBind, $location, Chat) {
    $sailsBind.bind('chat', $scope);
    $scope.newChat = { visible : false };
    $scope.chatCreate = function(name, topic) {
    	var chat = Chat.create({ name: name, topic: topic },
    		function(data) {
	    		$location.path('/chat/' + data.id);
	    	});
    }

    $scope.chatDelete = function(id) {
		Chat.delete({id: id});
	};

    $scope.toggleChatCreate = function() {
    	$scope.newChat.visible = !$scope.newChat.visible;
    }
  }]);

datChatControllers.controller('ChatCtrl', ['$scope', '$routeParams', '$sailsBind', 'Chat', 'ChatMessages',
  function($scope, $routeParams, $sailsBind, Chat, ChatMessages) {
    $scope.chat = Chat.chat({chatId: $routeParams.chatId});

    $sailsBind.bind('message', $scope, { 'owner': $routeParams.chatId })

    $scope.submitMessage = function(message) {
    	if (message.trim() === '' || $scope.userName.trim() === '') {
    		return;
    	}
    	ChatMessages.create({ owner: $routeParams.chatId, author: $scope.userName, message: $scope.composeMessage });
    	$scope.composeMessage = '';
    }
  }]);
