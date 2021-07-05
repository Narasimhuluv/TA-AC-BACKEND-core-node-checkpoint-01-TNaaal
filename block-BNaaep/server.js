let http = require('http');
let file = require('fs');
let path = require('path');
let qs = require('querystring');
let server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  if (req.method === 'GET' && req.url === '/') {
    file.readFile('./index.html', (err, content) => {
      res.setHeader('Content-Type', 'text/html');
      if (err) console.log(err);
      // console.log(content.toString());
      res.end(content);
    });
  } else if (req.method === 'GET' && req.url === '/about') {
    file.readFile('./about.html', (err, content) => {
      res.setHeader('Content-Type', 'text/html');
      if (err) console.log(err);
      console.log(content.toString());
      res.end(content);
    });
  } else if (req.url.split('.').pop() === 'css') {
    let pathFile = path.join(__dirname, 'style.css');
    file.readFile(__dirname + req.url, (err, content) => {
      if (err) console.log(err);
      res.setHeader('Content-Type', 'text/css');
      res.end(content);
    });
  } else if (req.url.split('.').pop() === 'jpg') {
    file.readFile(__dirname + req.url, (err, content) => {
      if (err) console.log(err);
      res.setHeader('Content-Type', 'image/jpg');
      res.end(content);
    });
  } else if (req.url.split('.').pop() === 'png') {
    file.readFile(__dirname + req.url, (err, content) => {
      if (err) console.log(err);
      res.setHeader('Content-Type', 'image/png');
      res.end(content);
    });
  } else if (req.method === 'GET' && req.url === '/contact') {
    file.readFile('./contactform.html', (err, content) => {
      res.setHeader('Content-Type', 'text/html');
      if (err) console.log(err);
      res.end(content);
    });
  }

  req.on('end', () => {
    let parsedUrl = qs.parse(store);
    console.log(parsedUrl);
    if (req.method === 'GET' && parsedUrl.pathname === '/users') {
      file.readFile(
        __dirname + '/contact/' + username + '.json',
        (err, content) => {
          res.setHeader('Content-Type', 'application/json');
          let parsedData = JSON.parse(content);
          res.end(`<h1>${parseData.name}</h1>
                <h2>${parseData.email}</h2>
                <h2>${parseData.username}</h2>
                <h2>${parseData.age}</h2>
                <h2>${parseData.bio}</h2>`);
        }
      );
    }
  });
});
server.listen(5000, () => {
  console.log('Server is running on port 5k');
});
// let path = require('path');
// let pathFile = path.join(__dirname, 'about.png');
// console.log(pathFile);
