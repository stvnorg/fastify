var fs = require('fs');

// Logs Route
async function routes (fastify, options) {
	fastify.get('/logs/api', function(request, reply) {
		fs.readFile('/data/payment/logs/api.log', 'utf8', (err, fd) => {
			if (err) {
				if (err.code == 'ENOENT') {
					console.error("File doesn't exist");
					return;
				}
				throw err;
			}
			reply.code(200).header('Content-Type', 'text/html').send("<pre>" + fd + "</pre>");
		});
	});
}

module.exports = routes
