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
            const laptop = laptopData[id]
            let output = data.replace('{%PRODUCTNAME%}', laptop.productName)
            let output = output.replace('{%IMAGE%}', laptop.image)
            let output = output.replace('{%PRICE%}', laptop.price)
            let output = output.replace('{%screen%}', laptop.screen)
            let output = output.replace('{%cpu%}', laptop.cpu)
            let output = output.replace('{%storage%}', laptop.storage)
            let output = output.replace('{%ram%}', laptop.ram)
            let output = output.replace('{%description%}', laptop.description)
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`<h1>Page was not found on the page</h1>`);output
    
}).listen(3000)

