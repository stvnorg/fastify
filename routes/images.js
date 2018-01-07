// image-files route
async function routes (fastify, options) {
	fastify.get('/images/*', function (request, reply) {
	// Get the request url and extract the filename
	var url = request['req']['url'].split('/');
	//console.log(url);
	const fs = require('fs');
	const stream = fs.createReadStream('../fastify/images/' + url.slice(2,url.length).join('/'));
  reply.type('image/jpeg').send(stream);
	})
}

module.exports = routes
