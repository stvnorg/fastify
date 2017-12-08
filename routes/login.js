var bcrypt = require('bcryptjs');
var config = require('../config/secret');

// Login route
async function routes (fastify, options) {
	
	fastify.get('/login', function (request, reply) {
		console.log(request)
		if (request.session && request.session.email) {
			return reply.redirect('/')
			//reply.send('Hi ' + request.session.email)
		}

   	return reply.view('../fastify/templates/login.ejs', { email: null } )
	})

	fastify.post('/login', function (request, reply) {

		if (request.session && request.session.email) reply.send('Hi ' + request.session.email)

		var hashedPassword = bcrypt.hashSync(request.body.password, 8);

		if (request.body.email == 'test@test.com' && request.body.password == "test") {
			request.session.email = request.body.email.toString();
			console.log(request.session);
			//reply.redirect('/');
			reply.view('../fastify/templates/login.ejs', { email: request.session.email } )
			//reply.send('Hi ' + request.session.email);
		} else {
			reply.send('Wrong email/password!');
		}
		reply.view('../fastify/templates/login.ejs', { email: null } )
	})
}

module.exports = routes
