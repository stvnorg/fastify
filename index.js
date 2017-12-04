// Require the framework and instantiate it
const fastify = require('fastify')()

fastify.addContentTypeParser('*', function (req, done) {
	var data = ''
	req.on('data', chunk => { data += chunk })
	req.on('end', () => {
		done(data)
	})
})

fastify.register(require('point-of-view'), {
	engine: {
		ejs: require('ejs')
	}
})

fastify.register(require('fastify-formbody'), {}, (err) => {
	if (err) throw err
})

fastify.register(require('./routes/static.js'))

fastify.register(require('./routes/home.js'))

fastify.register(require('./routes/login.js'))

fastify.register(require('./routes/view-logs.js'))

// Run the server!
fastify.listen(3000, function (err) {
	if (err) throw err
	fastify.log.info(`server listening on ${fastify.server.address().port}`)
})
