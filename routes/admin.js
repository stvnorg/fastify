const CV = require('./home.js'); // import the getCV() function from home.js routes file

// Index route
async function routes (fastify, options) {
	fastify.get('/admin', async function (request, reply) {
		
		if (request.session && request.session.email) {
			const { db } = fastify.mongo; //
			var cv = await CV.getCV(db);  // Get the list of CVs
			console.log(cv);							//
			
			reply.type('text/html');
			reply.view('../fastify/templates/admin.ejs', { cv: cv } )
			
		} else {
			
			return reply.redirect('/login');
			
		}
	})
}

module.exports = routes
