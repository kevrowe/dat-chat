/**
* Chat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

	},

	afterDestroy: function(destroyedRecords, cb) {
		Message.destroy({owner: _.pluck(destroyedRecords, 'id')}).exec(cb);
	}
};

