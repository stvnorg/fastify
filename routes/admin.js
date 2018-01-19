const CV = require('../functions/cv.js'); // import the getCV() function from home.js routes file

// Admin route
async function routes (fastify, options) {
	fastify.get('/admin', async function (request, reply) {
		
		if (request.session && request.session.email) {
			const { db } = fastify.mongo; //
			var cv = await CV.getCV(db);  // Get the list of CVs
			console.log(cv);							//
			
			if (request.query.delete && !request.query.edit) {
				id = parseInt(request.query.id)
				if (id.toString().length == request.query.id.length) {
					var response = await CV.delCV(db, id);
					reply.type('text/html');
					reply.view('../fastify/templates/admin.ejs', { cv: cv } )
				}
				else {
					return reply.send('ID is not an Integer');
				}
			} 
			
			reply.type('text/html');
			reply.view('../fastify/templates/admin.ejs', { cv: cv } )
			
		} else {
			
			return reply.redirect('/login');
			
		}
	})
}

module.exports = routes
