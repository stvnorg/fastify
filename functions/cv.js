/* ----------------------------------------------- */
/* Function to get list of CV from the collections */
/* ----------------------------------------------- */
function getCV(db) {
	return new Promise(function(resolve, reject) {
		db.collection('cv', onCollection);
		var cv = null;
			
		function onCollection(err, col) {
			if (err) return reply.send(err);
			col.find({}).sort({ id: -1 }).toArray( (err, data) => {
				cv = data;
				resolve(cv);
			})
		}
	})
}


/* -------------------------------------------- */
/* Function to add new record on CV collections */
/* -------------------------------------------- */
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
				workspan: data[4], 
				jobtask: data[5] }, (err, result) => { resolve(result); })
		}
	})
}


/* ------------------------------------------- */
/* Function to delete record on cv collections */
/* ------------------------------------------- */
function delCV(db, id) {
	return new Promise(function(resolve, reject) {
		db.collection('cv', onCollection);
		var response = null;
		
		function onCollection(err, col) {
			if (err) return reply.send(err);
			col.deleteOne({id: id}, (err, result) => { resolve(result); })
		}
	})
}


/* -------------------------------------------------------------------------------------- */
/* Function to calculate how many months, years you have been working for the given dates */
/* -------------------------------------------------------------------------------------- */
function yearsWorking(start, end) {
	
	return new Promise(function(resolve, reject) {
		
		const MONTH = {
			'01':'January',
			'02':'February',
			'03':'March',
			'04':'April',
			'05':'May',
			'06':'June',
			'07':'July',
			'08':'August',
			'09':'September',
			'10':'October',
			'11':'November',
			'12':'December'
		}
		
		var workspan = null;
		
		var START = start.match(/\d{4}\-\d{2}\-\d{2}/g)
		var END = end.match(/\d{4}\-\d{2}\-\d{2}/g)

		try {
			var n = START.length
			var m = START[0]
			var o = END.length
			var p = END[0]
			if (n == 1 && m.length == start.length && o == 1 && p.length == end.length) {
				
				m = m.split('-')
				var start_month = m[1]
				var start_year = m[0]
				
				p = p.split('-')
				var end_month = p[1]
				var end_year = p[0]
				
				if (parseInt(start_year) > parseInt(end_year)) {
					console.log('not a valid range');
					resolve(null);
				}
				else if (parseInt(start_year) == parseInt(end_year) && parseInt(start_month) > parseInt(end_month)) {
					console.log('not a valid range');
					resolve(null);
				}
				
				workspan = MONTH[start_month] + " " + start_year + " - " + MONTH[end_month] + " " + end_year + " ("
				
				start_month = parseInt(start_month)
				start_year = parseInt(start_year)
				end_month = parseInt(end_month)
				end_year = parseInt(end_year)
				
				var total_month = ((end_year - start_year) * 12) + (end_month - start_month)
				
				if (total_month < 12) resolve(workspan + total_month.toString() + " Months)")
				else {
					workspan = workspan + parseInt(total_month / 12).toString() + " Years " + (total_month % 12).toString() + " Months)"
					resolve(workspan);
				}
				
			} else {
				console.log('not a valid date') 
				resolve(null);
			}
		} catch(err) {
			console.log(err)
			resolve(null);
		}
	})
}

module.exports.getCV = getCV
module.exports.addCV = addCV
module.exports.delCV = delCV
module.exports.yearsWorking = yearsWorking