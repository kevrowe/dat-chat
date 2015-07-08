/**
 * RoundController
 *
 * @description :: Server-side logic for managing Rounds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addRound: function (gameId, roundId) {
		var game = Game.find({id: gameId}),
			round = Round.find({id: roundId});
	}
};

