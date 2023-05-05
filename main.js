const http = require('http');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');


const catsData = require('./cats.json');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "text/html" });

    // read the index.html file and send it as response
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
    res.write(html);
    res.end();
  } else if (req.url === '/cats') {
    res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" });


    // get a random cat from the catsData array
    const randomCat = catsData.cats[Math.floor(Math.random() * catsData.cats.length)];

    // send the random cat as JSON response
    res.write(JSON.stringify(randomCat));
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404 Page Not Found</h1>');
    res.end();
  }
});

server.listen(process.env.PORT, () => console.log('Server running on port 3000'));