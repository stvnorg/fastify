// static and font files route
async function routes (fastify, options) {
	fastify.get('/static/*', function (request, reply) {
		// Get the request url and extract the filename
		var url = request['req']['url'].split('/');
		//console.log(url);
		const fs = require('fs');
		const stream = fs.createReadStream('../fastify/static/' + url.slice(2,url.length).join('/'));
  	reply.type('text/css').send(stream);
	})
	
	// font-awesome files
	fastify.get('/fonts/*', function (request, reply) {
		// Get the request url and extract the filename
		var url = request['req']['url'].split('/');
		const fs = require('fs');
		//console.log('../fastify/static/font-awesome-4.7.0/fonts/' + url.slice(2,url.length).join('/'));
		const stream = fs.createReadStream('../fastify/static/font-awesome-4.7.0/fonts/' + url.slice(2,url.length).join('/'));
  	reply.type('application/font-woff2').send(stream);
	})
}

module.exports = routes
