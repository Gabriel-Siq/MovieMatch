const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('../modules/replaceTemplate')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempMovie = fs.readFileSync(`${__dirname}/templates/template-movie.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%MOVIE_CARDS%}', cardsHtml)
        res.end(output);

    // Movies page
    } else if (pathname === '/movies') {
        res.writeHead(200, {'Content-type': 'text/html'});
        
        const movie = dataObj[query.id];
        const output = replaceTemplate(tempMovie, movie);
        res.end(output);
    
    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    
    // Not found
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
