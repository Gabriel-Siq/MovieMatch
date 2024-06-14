const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');

////////////////////////////////////// FILES //////////////////////////////////////
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about avocado:\n${textIn}\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!')

// Non-Blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     err ? console.log("Sorry, an error has ocurred"):
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         err ? console.log("Sorry, an error has ocurred"):
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             err ? console.log("Sorry, an error has ocurred"):
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}` , err => {
//                 console.log("Your file has been written");
//             })
//         })
//     })
    
// });
// console.log("Will read file!");

////////////////////////////////////// SERVER //////////////////////////////////////

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === '/') {
        res.end('There is nothing to see here');
    } else if (pathName === '/overview') {
        res.end('This is the overview!');
    } else if (pathName === '/movies') {
        res.end('This is the movies page!');
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Sorry, the page was not found!</h1>');
    }
});

server.listen(8000, 'localhost', () => {
    console.log("Server has been started on port 8000!");
});
