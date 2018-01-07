var bcrypt = require('bcryptjs');
var config = require('../config/secret');

// Login route
async function routes (fastify, options) {
	
	fastify.get('/login', function (request, reply) {
		//console.log(request)
		if (request.session && request.session.email) {
			return reply.redirect('/admin')
			//reply.send('Hi ' + request.session.email)
		}
   	return reply.view('../fastify/templates/login.ejs', { email: null } )
	})

	
	fastify.post('/login', function (request, reply) {

		if (request.session && request.session.email) return reply.redirect('/admin')
		
		var hashedPassword = bcrypt.hashSync(request.body.password, 8);

		if (request.body.email == 'steven@marchnine.com' && request.body.password == "g4nt3ngS") {
			request.session.email = request.body.email.toString();
			console.log(request.session);
			reply.view('../fastify/templates/login.ejs', { email: request.session.email } )
		} else {
			reply.send('Wrong email/password!');
		}
	})
}

module.exports = routes
