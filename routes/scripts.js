// scripts-files route
async function routes (fastify, options) {
  fastify.get('/scripts/*', function (request, reply) {
  // Get the request url and extract the filename
  var url = request['req']['url'].split('/')
  const fs = require('fs')
  const stream = fs.createReadStream('../fastify/scripts/' + url.slice(2,url.length).join('/'))
  reply.type('application/javascript').send(stream)
  })
}

module.exports = routes
