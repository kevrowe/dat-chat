/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	destroyMany: function (req, res) {
		Message.find().where({ 'chatId' : req.query.chatId }).exec(function(err, messages) {
			if (err) {
				return res.serverError(err);
			}

			// Apparently if Model.find doesn't find anything matching the
			// "where" clause, it just returns everything... helpful.
			if (messages.length === 0 || messages[0].chatId !== req.query.chatId) {
				return res.json({ status: 200 });
			}

			var messageIds = messages.map(function(e, i) {
				return e.id;
			});

			Message.destroy({ id: messageIds }).exec(function(err, deletedMessages) {});

			return res.json({ status: 200 });
		});
	}
};

