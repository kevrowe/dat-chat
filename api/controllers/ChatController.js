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

			var messageResult = Message.find().where({ 'chatId' : chatId }).exec(function(err, messages) {
				if (err) {
					return err;
				}

				// Apparently if Model.find doesn't find anything matching the
				// "where" clause, it just returns everything... helpful.
				if (messages.length === 0 || messages[0].chatId !== chatId) {
					return [];
				}

				var messageIds = messages.map(function(e, i) {
					return e.id;
				});

				var deletedMessages = Message.destroy({ id: messageIds }).exec(function(err, deletedMessages) { return deletedMessages; });

				return messages;
			});

			return res.json(chat);
		});
	}
};

