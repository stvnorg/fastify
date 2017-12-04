var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config/secret');

// Login route
async function routes (fastify, options) {
	fastify.get('/login', function (request, reply) {
		//console.log(config.secret);
		var token = request.headers['x-access-token'];
		if (!token) {
			return reply.view('../fastify/templates/login.ejs', { text: 'text' })
			//reply.send({ auth: false, message: 'No token provided.'});
		}
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) reply.send({ auth: false, message: 'Failed to authenticate token.' });
			else reply.send(decoded);
		})
   	//return reply.view('../fastify/templates/login.ejs', { text: 'text' } )
	})
	fastify.post('/login', options, function (request, reply) {
		console.log(request);
		//console.log(config.secret);
		var hashedPassword = bcrypt.hashSync(request.body.password, 8);
		if (request.body.password == "test") {
			var token = jwt.sign( { id: 1 }, config.secret, { expiresIn: 600 });
			reply.send({ auth: true, token: token });
		} else {
			reply.send('Wrong email/password!');
		}
		//reply.send(request.body)
	})
}

module.exports = routes
