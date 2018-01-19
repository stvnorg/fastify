// Require the framework and instantiate it
const fastify = require('fastify')()

/*
const redis = require('ioredis')({host:'localhost'});

const abcache = require('abstract-cache')({
  useAwait: false,
  driver: {
    name: 'abstract-cache-redis', // must be installed via `npm install`
    options: {client: redis}
  }
})
*/

//var fRedis = require('fastify-redis')({driver: require('ioredis'), host: 'localhost'}, err => { if (err) throw err })

fastify
  .register(require('fastify-cookie'))
  //.register(require('fastify-caching'), {cache: abcache})
	.register(require('fastify-caching'))
  .register(require('fastify-server-session'), {
    secretKey: 'some-secret-password-at-least-32-characters-long',
    sessionMaxAge: 600000,
		cookie: {
			//maxAge: 900000,
			path: '/'
    },
		//store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260})
  	//store: redis
	})
/*
	.register(require('fastify-redis'), {
  	driver: require('ioredis'),
  	host: 'localhost'
	}, err => {
  	if (err) throw err
	})
*/
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

fastify.register(require('fastify-mongodb'), {
	url: 'mongodb://localhost:27017/marchnine'
})

fastify.register(require('./routes/images.js'))

fastify.register(require('./routes/static.js'))

fastify.register(require('./routes/scripts.js'))

fastify.register(require('./routes/home.js'))

fastify.register(require('./routes/login.js'))

fastify.register(require('./routes/admin.js'))

fastify.register(require('./routes/add-cv.js'))

fastify.register(require('./routes/view-logs.js'))

// Run the server!
fastify.listen(3000, function (err) {
	if (err) throw err
	fastify.log.info(`server listening on ${fastify.server.address().port}`)
})
