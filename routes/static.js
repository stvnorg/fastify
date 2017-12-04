// static-files route
async function routes (fastify, options) {
	fastify.get('/static/*', function (request, reply) {
	// Get the request url and extract the filename
	var url = request['req']['url'].split('/')
	const fs = require('fs')
	const stream = fs.createReadStream('../fastify/static/' + url[2])
  reply.type('text/css').send(stream)
	})
}

module.exports = routes
