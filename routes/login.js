var bcrypt = require('bcryptjs');
var config = require('../config/secret');

// Login route
async function routes (fastify, options) {

	fastify.get('/login', function (request, reply) {
		console.log(request.session)
		if (request.session && request.session.email) {
			reply.send('Hi ' + request.session.email)
		}

   	return reply.view('../fastify/templates/login.ejs', { text: 'text' } )
	})

	fastify.post('/login', options, function (request, reply) {
		var hashedPassword = bcrypt.hashSync(request.body.password, 8);
		if (request.body.email == 'test@test.com' && request.body.password == "test") {
			request.session.email = request.body.email;
			console.log(request.session);
			reply.send('Hi ' + request.session.email);
		} else {
			reply.send('Wrong email/password!');
		}
		reply.view('../fastify/templates/login.ejs', { text: 'text' } )
	})
}

module.exports = routes
