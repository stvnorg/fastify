const CV = require('../functions/cv.js')

// Index route

async function routes (fastify, options) {
	fastify.get('/', async function (request, reply) {
		
		// create mongodb connection
		const { db } = fastify.mongo;
		
		var cv = await CV.getCV(db);
		console.log(cv);
		return reply.view('../fastify/templates/home.ejs', { cv: cv });
	})
}

module.exports = routes
