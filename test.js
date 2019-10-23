const http = require('http');
const port = 90;
const server = http.createServer((req, res) => {
    const url = require('url');
    const body = url.parse(req.url);
    console.log(body.query.split('&'));
})
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
})