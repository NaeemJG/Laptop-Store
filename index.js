const fs  = require('fs')
const http = require('http')
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json)
const url = require('url')
const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname
    const id = url.parse(req.url, true).query.id
    console.log(id)
    if(pathName === '/product' || pathName === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<h1>Products page :/</h1>`);
        res.end();
    } else if(pathName == '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile(`${__dirname}/Template/laptop.html`, 'utf-8', (err, data) => {
            
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`<h1>Page was not found on the page</h1>`);
    }

    
}).listen(3000)

