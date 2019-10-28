const http = require('http');
const port = 90;
const server = http.createServer((request, response) => {
    console.dir(request.param)
    if (request.method == 'POST') {
        console.log('POST')
        var body = ''
        request.on('data', function (data) {
            body = data;
        });
        console.log(1111,body);
        request.on('end', function () {
            console.log('Body: ' + body)
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('post received')
        });
    };
});
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});