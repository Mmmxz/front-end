console.log('start...')
const http = require('http')
http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  response.end(`hello, I'm running`)
}).listen(8888)
console.log('Server running at http://127.0.0.1:8888/');
