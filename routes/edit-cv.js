const CV = require('../functions/cv.js'); // import the getCV() function from home.js routes file

// Add CV route
async function routes (fastify, options) {
	fastify.get('/edit-cv', async function (request, reply) {

		// Check the session.email variable
		if (request.session && request.session.email) {
			id = parseInt(request.query.id)
			if (id && id.toString().length == request.query.id.length) {
				const { db } = fastify.mongo; 				//
				var cv = await CV.getOneCV(db, id);		// Get the CV details from ID
				cv.workspan = await CV.toDateFormat(cv.workspan);
				cv.jobtask = cv.jobtask.replace(/<br>/g, '\r\n');
				console.log(cv, 'EDIT-CV GET');

				reply.type('text/html');
				reply.view('../fastify/templates/edit-cv.ejs', { success: false, cv: cv } )
			} else {
				reply.send('invalid id');
			}

		} else {
			return reply.redirect('/login');
		}
	})

	fastify.post('/edit-cv', async function (request, reply) {
		if (request.session && request.session.email) {
			console.log(request.body);
			try {
				var role = request.body.role.toString();
				var company = request.body.company.toString();
				var location = request.body.location.toString();
				var startDate = request.body.startDate.toString();
				var endDate = 'present';
				if (request.body.endDate) {
					var endDate = request.body.endDate.toString();
					console.log(endDate)
				}
				var jobTask = request.body.jobTask.toString().replace(/\r\n/g, '<br>');
			} catch (err) {
				reply.send("invalid body params");
			}

			if (role && company && startDate && endDate && jobTask) {
				//console.log(role, company, location, startDate, endDate, jobTask, request.body);

				const { db } = fastify.mongo; //
				var cv = await CV.getCV(db)		// Get the list of CVs
				console.log(cv, 'EDIT-CV POST');							//

				var workspan = null

				if (!cv.length) {
					workspan = await CV.yearsWorking(startDate, endDate);
					if (workspan) CV.editCV(db, [1, role, company, location, workspan, jobTask]);
				}
				else {
					workspan = await CV.yearsWorking(startDate, endDate);
					if (workspan) CV.editCV(db, [parseInt(cv[0].id), role, company, location, workspan, jobTask]);
				}

				var cv = await CV.getCV(db);  // Get the list of CVs
			}

			reply.view('../fastify/templates/admin.ejs', { cv: cv } )

		} else {
			return reply.redirect('/login');
		}
	})
}

module.exports = routes
