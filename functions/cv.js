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
	})
}

function yearsWorking(start, end) {
	return new Promise(function(resolve, reject) {
		
		var years_working = null;
		
		START = start.match(/\d{2}\/\d{2}\/\d{4}/g)
		END = end.match(/\d{2}\/\d{2}\/\d{4}/g)

		try {
			a = START.length
			b = START[0]
			c = END.length
			d = END[0]
			if (a == 1 && b.length == start.length && c == 1 && d.length == end.length) {
				console.log(start, end)
				resolve(years_working);
			} else {
				console.log('not valid') 
			}
		} catch(err) {
			console.log('not valid')
		}
	})
}

module.exports.getCV = getCV
module.exports.addCV = addCV
module.exports.yearsWorking = yearsWorking