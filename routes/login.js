// Login route
async function routes (fastify, options) {
	fastify.get('/login', function (request, reply) {
   	reply.view('../fastify/templates/login.ejs', { text: 'text' } )
	})
	fastify.post('/login', options, function (request, reply) {
		reply.send(request.body)
	})
}

module.exports = routes
