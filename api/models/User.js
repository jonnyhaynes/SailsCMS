/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {

  	name: {
  		type: 'string',
  		required: true
  	},

  	email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},

  	password: {
  		type: 'string'
  	},

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.password;
      delete obj._csrf;
      return obj;
    }

  },


  beforeValidation: function (user, next) {
    if (typeof user.admin !== 'undefined') {
      if (user.admin === 'unchecked') {
        values.admin = false;
      } else  if (user.admin[1] === 'on') {
        user.admin = true;
      }
    }
     next();
  },

  beforeCreate: function (user, next) {

    // This checks to make sure the password and password confirmation match before creating record
    if (!user.password || user.password != user.confirmation) {
      return next('Password doesn\'t match password confirmation.');
    }

    bcrypt.genSalt(10, function(err, salt) {

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        // values.online= true;
        next();
      });

    });

  }



};
