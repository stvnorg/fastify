const CV = require('../functions/cv.js'); // import the getCV() function from home.js routes file

// Add CV route
async function routes (fastify, options) {
	fastify.get('/add-cv', async function (request, reply) {
		
		if (request.session && request.session.email) {
			reply.type('text/html');
			reply.view('../fastify/templates/add-cv.ejs', { success: false } )
		} else {
			return reply.redirect('/login');
		}
	})
	
	fastify.post('/add-cv', async function (request, reply) {
		if (request.session && request.session.email) {
			var role = request.body.role.toString();
			var company = request.body.company.toString();
			var location = request.body.location.toString();
			var startDate = request.body.startDate.toString();
			var endDate = request.body.endDate.toString();
			var jobTask = request.body.jobTask.toString().replace(/\r\n/g, '<br>');
			
			if (role && company && startDate && endDate && jobTask) { 
				console.log(role, company, location, startDate, endDate, jobTask, request.body);
			
				const { db } = fastify.mongo; //
				var cv = await CV.getCV(db);  // Get the list of CVs
				console.log(cv);							//
			
				var workspan = null
				
				if (!cv.length) {
					workspan = await CV.yearsWorking(startDate, endDate)
					if (workspan) CV.addCV(db, [1, role, company, location, workspan, jobTask]);
				} 
				else {
					workspan = await CV.yearsWorking(startDate, endDate)
					if (workspan) CV.addCV(db, [parseInt(cv[0].id)+1, role, company, location, workspan, jobTask]);
				}
				
				var cv = await CV.getCV(db);  // Get the list of CVs
				console.log(cv);
			}
			reply.view('../fastify/templates/add-cv.ejs', { success: true } )
			
		} else {
			return reply.redirect('/login');
		}
	})
}

module.exports = routes
