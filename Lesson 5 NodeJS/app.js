var http=require('http');
http.createServer(function(request, response)
{
response.writeHead(200,{'ContentType':'text/plain'});
response.end('Hello World\n');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8124/');