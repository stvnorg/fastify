// Index route
async function routes (fastify, options) {
	fastify.get('/', function (request, reply) {
		if (request.session && request.session.email) {
			reply.type('text/html');
			reply.send('Hi ' + request.session.email);
		} else {
			//reply.view('../fastify/templates/login.ejs', { email: null } )
			return reply.redirect('/login');
			//reply.send("Hello World!");
		}
	})
}

module.exports = routes
