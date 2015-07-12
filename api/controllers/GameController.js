/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

module.exports = {
	populate: function(req, res, next) {
		Game
			.findOne(req.param('id'))
			.populate('rounds')
			.populate('users')
			.then(function(game) {
				Game.subscribe(req.socket, game);
				Round.subscribe(req.socket, game.rounds);

				var roundBlackCards = BlackCard.find({
					id: _.pluck(game.rounds, 'blackCard')
				})
				.then(function(roundBlackCards) {
					return roundBlackCards;
				});

				var roundTsars = User.find({
					id: _.pluck(game.rounds, 'tsar')
				})
				.then(function(roundTsars) {
					return roundTsars;
				})

				return [game, roundBlackCards, roundTsars];
			})
			.spread(function(game, roundBlackCards, roundTsars) {
				roundBlackCards = _.indexBy(roundBlackCards, 'id');
				roundTsars = _.indexBy(roundTsars, 'id');

				game.rounds = _.map(game.rounds, function(round) {
					round.blackCard = roundBlackCards[round.blackCard];
					round.tsar = roundTsars[round.tsar];
					return round;
				});

				res.json(game);
			})
			.catch(function(err) {
				if (err) {
					return res.serverError(err);
				}
			});
	}	
};

