// Cool Page route

async function routes (fastify, options) {
	fastify.get('/coolpage', async function (request, reply) {
		
		reply.view('../fastify/templates/coolpage.ejs', { content: '' });
	})
}

module.exports = routes
