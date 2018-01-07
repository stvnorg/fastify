const CV = require('./home.js'); // import the getCV() function from home.js routes file
var validator = require('validator');

function addCV(db, data) {
	return new Promise(function(resolve, reject) {
		db.collection('cv', onCollection);
		var cv = null;
			
		function onCollection(err, col) {
			if (err) return reply.send(err);
			col.insertOne({ 
				id: data[0], 
				role: data[1], 
				company: data[2], 
				location: data[3],
				startdate: data[4], 
				enddate: data[5], 
				jobtask: data[6] }, (err, result) => { resolve(result); })
		}
	});
}

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
			var location = request.body.location.toString();
			var startDate = request.body.startDate.toString();
			var endDate = request.body.endDate.toString();
			var jobTask = request.body.jobTask.toString();
			
			if (role && company && startDate && endDate && jobTask) { 
				console.log(role, company, location, startDate, endDate, jobTask, request.body);
			
				const { db } = fastify.mongo; //
				var cv = await CV.getCV(db);  // Get the list of CVs
				console.log(cv);							//
			
				if (!cv.length) {
					addCV(db, [1, role, company, location, startDate, endDate, jobTask]);
				} else {
					addCV(db, [parseInt(cv[cv.length-1].id)+1, role, company, location, startDate, endDate, jobTask]);
				}
				
				var cv = await CV.getCV(db);  // Get the list of CVs
				console.log(cv);
			}
			reply.view('../fastify/templates/admin.ejs', { cv: cv } )
			
		} else {
			return reply.redirect('/login');
		}
	})
}

module.exports = routes
