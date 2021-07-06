// let http = require('http');
// let file = require('fs');
// let path = require('path');
// let qs = require('querystring');
// let server = http.createServer((req, res) => {
//   console.log(req.method, req.url);
//   let store = '';
//   req.on('data', (chunk) => {
//     store += chunk;
//   });
//   if (req.method === 'GET' && req.url === '/') {
//     file.readFile('./index.html', (err, content) => {
//       res.setHeader('Content-Type', 'text/html');
//       if (err) console.log(err);
//       // console.log(content.toString());
//       res.end(content);
//     });
//   } else if (req.method === 'GET' && req.url === '/about') {
//     file.readFile('./about.html', (err, content) => {
//       res.setHeader('Content-Type', 'text/html');
//       if (err) console.log(err);
//       console.log(content.toString());
//       res.end(content);
//     });
//   } else if (req.url.split('.').pop() === 'css') {
//     let pathFile = path.join(__dirname, 'style.css');
//     file.readFile(__dirname + req.url, (err, content) => {
//       if (err) console.log(err);
//       res.setHeader('Content-Type', 'text/css');
//       res.end(content);
//     });
//   } else if (req.url.split('.').pop() === 'jpg') {
//     file.readFile(__dirname + req.url, (err, content) => {
//       if (err) console.log(err);
//       res.setHeader('Content-Type', 'image/jpg');
//       res.end(content);
//     });
//   } else if (req.url.split('.').pop() === 'png') {
//     file.readFile(__dirname + req.url, (err, content) => {
//       if (err) console.log(err);
//       res.setHeader('Content-Type', 'image/png');
//       res.end(content);
//     });
//   } else if (req.method === 'GET' && req.url === '/contact') {
//     res.writeHead(202, { 'Content-Type': 'text/html' });
//     file.createReadStream('./form.html').pipe(res);
//   } else if (req.method === 'GET' && req.url === '/form') {
//     res.writeHead(202, { 'Content-Type': 'text/html' });
//     file.createReadStream('./form.html').pipe(res);
//   } else if (req.method === 'POST' && req.url === '/form') {
//     req.on('end', () => {
//       let parsedData = qs.parse(store);
//       res.setHeader('Content-Type', 'text/html');
//       res.end(`<h2>${parsedData.name}</h2>
//                   <h2>${parsedData.email}</h2>
//                   <h2>${parsedData.unique}</h2>
//                   <h2>${parsedData.age}</h2>
//                   <h2>${parsedData.bio}</h2>`);
//     });
//   }
// });
// server.listen(5000, () => {
//   console.log('Server is running on port 5k');
// });

// // let http = require('http');
// // let file = require('fs');
// // let qs = require('querystring');

// // let server = http.createServer((req, res) => {
// //   console.log(req.method, res.url);
// //   let dataFormate = req.headers['content-type'];
// //   let store = '';
// //   req.on('data', (chunk) => {
// //     store += chunk;
// //   });
// //   req.on('end', () => {
// //     if (req.method === 'GET' && req.url === '/contact') {
// //       res.setHeader('Content-Type', 'text/html');
// //       file.createReadStream('./contactform.html').pipe(res);
// //     } else if (req.method === 'POST' && req.url === '/contact') {
// //       let parsedData = qs.parse(store);
// //       res.setHeader('Content-Type', 'text/html');
// //       res.end(
// //         `</h1>${parsedData.name}</h1><p>${parsedData.age}</p><p>${parsedData.emial}</p>`
// //       );
// //     }
// //   });
// // });

// // server.listen(5678, () => {
// //   console.log('sever is running on port 5678');
// // });

let http = require('http');
let file = require('fs');
let qs = require('querystring');
let server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(202, { 'Content-Type': 'text/html' });
    file.createReadStream('./index.html').pipe(res);
  } else if (req.method === 'GET' && req.url === '/about') {
    res.writeHead(202, { 'Content-Type': 'text/html' });
    file.createReadStream('./about.html').pipe(res);
  } else if (req.method === 'GET' && req.url === '/contact') {
    res.writeHead(202, { 'Content-Type': 'text/html' });
    file.createReadStream('./form.html').pipe(res);
  } else if (req.url.split('.').pop() === 'css') {
    // let pathFile = path.join(__dirname, 'style.css');
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
  } else if (req.method === 'GET' && req.url === '/form') {
    res.writeHead(202, { 'Content-Type': 'text/html' });
    file.createReadStream('./form.html').pipe(res);
  } else if (req.method === 'POST' && req.url === '/form') {
    req.on('end', () => {
      let parsedData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h2>${parsedData.name}</h2>
                  <h2>${parsedData.email}</h2>
                  <h2>${parsedData.unique}</h2>
                  <h2>${parsedData.age}</h2>
                  <h2>${parsedData.bio}</h2>`);
    });
  } else if (req.method === 'GET' && req.url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    file.createReadStream('./contacts/chinna.json').pipe(res);
    req.on('end', () => {
      let parsedData = qs.parse(store);
      res.end(`<h2>${parsedData.name}</h2>`);
    });
  }
});

server.listen(5678, () => {
  console.log('Server is running on port 5678');
});
