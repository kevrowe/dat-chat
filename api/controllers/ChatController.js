/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	destroyWithMessages: function(req, res) {
		var chatId = req.param('id');

		return Chat.destroy({'id': chatId}).exec(function(err, chat) {
			if (err) {
				return res.serverError(err);
			}

			return Message.find().where({ 'chatId' : chatId }).exec(function(err, messages) {
				if (err) {
					return res.serverError(err);
				}

				// Apparently if Model.find doesn't find anything matching the
				// "where" clause, it just returns everything... helpful.
				if (messages.length === 0 || messages[0].chatId !== chatId) {
					return res.json([]);
				}

				var messageIds = messages.map(function(e, i) {
					return e.id;
				});

				var deletedMessages = Message.destroy({ id: messageIds }).exec(function(err, deletedMessages) { return deletedMessages; });

				return res.json(deletedMessages);
			});
		});
	}
};

