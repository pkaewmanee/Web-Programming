const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const url = require('url');

http.createServer(function (request, response) {
    const pathname = url.parse(request.url, true).pathname;

    if (pathname.startsWith('/profile/')) {
        const userId = pathname.split('/')[2];

        // Read users.json file
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                return response.end('Error reading user file\n');
            }

            const user = JSON.parse(data);

            // Check if the user ID matches
            if (user.id === userId) {
                // Encrypt the password using sha1
                const hash = crypto.createHash('sha1').update(user.password).digest('hex');
                user.password = hash;

                // Send user information as response
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(`
                    id: ${user.id}\n
                    username: ${user.username}\n
                    password: ${user.password}\n
                    fullname: ${user.fullname}
                `);
            } else {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('User not found\n');
            }
        });
    } else {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello World\n');
    }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
