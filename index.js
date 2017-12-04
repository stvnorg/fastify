// Require the framework and instantiate it
const fastify = require('fastify')()

fastify
  .register(require('fastify-cookie'))
  .register(require('fastify-caching'))
  .register(require('fastify-server-session'), {
    secretKey: 'some-secret-password-at-least-32-characters-long',
    sessionMaxAge: 900000, // 15 minutes in milliseconds
    cookie: {
      path: '/'
    }
  })

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
