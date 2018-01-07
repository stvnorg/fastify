const CV = require('./home.js'); // import the getCV() function from home.js routes file
var validator = require('validator');

// Index route
async function routes (fastify, options) {
	fastify.get('/add-cv', async function (request, reply) {
		
		if (request.session && request.session.email) {
			reply.type('text/html');
			reply.view('../fastify/templates/add-cv.ejs', {} )
		} else {
			return reply.redirect('/login');
		}
	})
	
	fastify.post('/add-cv', async function (request, reply) {
		if (request.session && request.session.email) {
			var role = request.body.role.toString();
			var company = request.body.company.toString();
			var startDate = request.body.startDate.toString();
			var endDate = request.body.endDate.toString();
			var jobTask = request.body.jobTask.toString();
			
			console.log(role, company, startDate, endDate, jobTask, request.body);
			
			const { db } = fastify.mongo; //
			var cv = await CV.getCV(db);  // Get the list of CVs
			console.log(cv);							//
			
			reply.view('../fastify/templates/admin.ejs', { cv: cv } )
		} else {
			return reply.redirect('/login');
		}
	})
}

module.exports = routes
