// Cool Page route

const CV = require('../functions/cv.js')

async function routes (fastify, options) {
	fastify.get('/coolpage', async function (request, reply) {
		
		// create mongodb connection
		const { db } = fastify.mongo;
		
		var cv = await CV.getCV(db);
		reply
    .code(200)
    .header('Content-Type', 'text/html')
    .view('../fastify/templates/coolpage.ejs', { content: '' })
		//return reply.view('../fastify/templates/coolpage.ejs', { content: '' });
	})
}

module.exports = routes
