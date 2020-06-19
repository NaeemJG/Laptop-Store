const fs = require('fs')
const http = require('http')
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json)
const url = require('url')
const server = http.createServer((req, res) => {
    const pathName = url.parse(req.url, true).pathname
    const id = url.parse(req.url, true).query.id
    console.log(pathName)
    // Product Overview
    if (pathName === '/product' || pathName === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile(`${__dirname}/Template/overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/Template/card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map(laptop => replaceTemplate(data, laptop)).join('')
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
                res.end(overviewOutput)
            })
        })
    // Laptop Detail
    } else if (pathName == '/laptop' && id < laptopData.length) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile(`${__dirname}/Template/laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id]
            const output = replaceTemplate(data, laptop)
            res.end(output)
        })

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end(`<h1>Page was not found on the page</h1>`);
    }

}).listen(3000)

const replaceTemplate = (originalHtml, laptop) => {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName)
    output = output.replace(/{%IMAGE%}/g, laptop.image)
    output = output.replace(/{%PRICE%}/g, laptop.price)
    output = output.replace(/{%SCREEN%}/g, laptop.screen)
    output = output.replace(/{%CPU%}/g, laptop.cpu)
    output = output.replace(/{%STORAGE%}/g, laptop.storage)
    output = output.replace(/{%RAM%}/g, laptop.ram)
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description)
    output = output.replace(/{%ID%}/g, laptop.id)
    return output;
}