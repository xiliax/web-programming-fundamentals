/* prints POST and PUT request body */

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  var method = req.method

  console.log("URL: ", req.url)
  console.log("Method: ", method)
  console.log("Headers: ", req.headers)
  console.log("")

  if(('PUT' == method) || ('POST' == method)){
    var body = ''

    req.on('data', function(chunk){
      body = body + chunk
    });

    req.on('end', function(){
      var item = JSON.parse(body)
      console.log("Item title: ", item.title)
      console.log("")
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
