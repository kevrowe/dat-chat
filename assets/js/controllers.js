'use strict';

/* Controllers */

var datChatControllers = angular.module('datChatControllers', []);

datChatControllers.controller('GameListCtrl', ['$scope', '$sailsBind', '$location', 'Game',
  function($scope, $sailsBind, $location, Game) {
    $sailsBind.bind('game', $scope);
    $scope.newGame = { visible : false };
    $scope.gameCreate = function(name) {
    	var game = Game.create({ name: name },
    		function(data) {
	    		$location.path('/game/' + data.id);
	    	});
    }

    $scope.gameDelete = function(id) {
		Game.delete({id: id});
	};

    $scope.toggleGameCreate = function() {
    	$scope.newGame.visible = !$scope.newGame.visible;
    }
  }]);

datChatControllers.controller('GameCtrl', ['$scope', '$routeParams', '$sailsBind', 'Game',
    function($scope, $routeParams, $sailsBind, Game) {
        // $scope.game = Game.populate({ id: $routeParams.gameId });

        io.socket.get('/game/populate', { id: $routeParams.gameId }, function(sockData) {
            $scope.game = sockData;
            $scope.$apply();
        });

        io.socket.on('game', function(sockRes) {
            var newGame = sockRes.data;
            for (var i in newGame) {
                $scope.game[i] = newGame[i];
            }
            $scope.$apply();
        });

        // Bind to rounds to update

        $scope.gameNewRound = function() {
            var round = Round.create({ tsar: 2, blackCard: 1 }, 
                function(data) {
                    $scope.game[0].rounds.append(data);
                });
        };
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
