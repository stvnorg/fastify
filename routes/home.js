// Index route

function getCV(db) {
	return new Promise(function(resolve, reject) {
		db.collection('cv', onCollection);
		var cv = null;
			
		function onCollection(err, col) {
			if (err) return reply.send(err);
			col.find({}).toArray( (err, data) => {
				cv = data;
				resolve(cv);
			})
		}
	})
}

async function routes (fastify, options) {
	fastify.get('/', async function (request, reply) {
		
		// create mongodb connection
		const { db } = fastify.mongo;
		
		var cv = await getCV(db);
		console.log(cv);
		reply.view('../fastify/templates/home.ejs', { cv: cv });
	})
}

module.exports = routes
module.exports.getCV = getCV
