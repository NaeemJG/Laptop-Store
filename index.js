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
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName)
            output = output.replace(/{%IMAGE%}/g, laptop.image)
            output = output.replace(/{%PRICE%}/g, laptop.price)
            output = output.replace(/{%SCREEN%}/g, laptop.screen)
            output = output.replace(/{%CPU%}/g, laptop.cpu)
            output = output.replace(/{%STORAGE%}/g, laptop.storage)
            output = output.replace(/{%RAM%}/g, laptop.ram)
            output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
            res.end(output)
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`<h1>Page was not found on the page</h1>`);
    }
    
    }).listen(3000)