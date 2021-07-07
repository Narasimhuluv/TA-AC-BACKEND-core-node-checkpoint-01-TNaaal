// let http = require('http');
// let url = require('url');
// let file = require('fs');
// let qs = require('querystring');
// let userpath = __dirname + '/contacts/';
// let server = http.createServer((req, res) => {
//   console.log(req.method, req.url);
//   let store = '';
//   let parsedData = url.parse(req.url, true);
//   req.on('data', (chunk) => {
//     store += chunk;
//   });
//   if (req.method === 'GET' && req.url === '/') {
//     res.writeHead(202, { 'Content-Type': 'text/html' });
//     file.createReadStream('./index.html').pipe(res);
//   } else if (req.method === 'GET' && req.url === '/about') {
//     res.writeHead(202, { 'Content-Type': 'text/html' });
//     file.createReadStream('./about.html').pipe(res);
//   } else if (req.method === 'GET' && req.url === '/contact') {
//     res.writeHead(202, { 'Content-Type': 'text/html' });
//     file.createReadStream('./form.html').pipe(res);
//   } else if (req.url.split('.').pop() === 'css') {
//     // let pathFile = path.join(__dirname, 'style.css');
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
//   } else if (req.method === 'GET' && req.url === '/form') {
//     res.writeHead(202, { 'Content-Type': 'text/html' });
//     file.createReadStream('./form.html').pipe(res);
//   }
//   // else if (req.method === 'POST' && req.url === '/form') {
//   //   req.on('end', () => {
//   //     let parsedData = qs.parse(store);
//   //     res.setHeader('Content-Type', 'text/html');
//   //     res.end(`<h2>${parsedData.name}</h2>
//   //                 <h2>${parsedData.email}</h2>
//   //                 <h2>${parsedData.unique}</h2>
//   //                 <h2>${parsedData.age}</h2>
//   //                 <h2>${parsedData.bio}</h2>`);
//   //   });
//   // }
//   else if (req.method === 'POST' && req.url === '/form') {
//     req.on('end', () => {
//       let data = qs.parse(store);
//       let userName = data.name;
//       let stringifyData = JSON.stringify(data);
//       file.open(userpath + userName + '.json', 'wx', (err, content) => {
//         if (err) console.log(err);
//         file.writeFile(content, stringifyData, (err) => {
//           if (err) console.log(err);
//           file.close(content, () => {
//             res.end(`${userName} is created sucessfully`);
//           });
//         });
//       });
//     });
//   }
// });

let http = require('http');
let fs = require('fs');
let qs = require('querystring');
let userPath = __dirname + '/contacts/';
let server = http.createServer((req, res) => {
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(202, { 'Content-Type': 'text/html' });
      fs.createReadStream('./index.html').pipe(res);
    } else if (req.method === 'GET' && req.url === '/about') {
      res.writeHead(202, { 'Content-Type': 'text/html' });
      fs.createReadStream('./about.html').pipe(res);
    } else if (req.url.split('.').pop() === 'css') {
      // let pathFile = path.join(__dirname, 'style.css');
      fs.readFile(__dirname + req.url, (err, content) => {
        if (err) console.log(err);
        res.setHeader('Content-Type', 'text/css');
        res.end(content);
      });
    } else if (req.url.split('.').pop() === 'jpg') {
      fs.readFile(__dirname + req.url, (err, content) => {
        if (err) console.log(err);
        res.setHeader('Content-Type', 'image/jpg');
        res.end(content);
      });
    } else if (req.url.split('.').pop() === 'png') {
      fs.readFile(__dirname + req.url, (err, content) => {
        if (err) console.log(err);
        res.setHeader('Content-Type', 'image/png');
        res.end(content);
      });
    } else if (req.method === 'GET' && req.url === '/contact') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    } else if (req.method === 'POST' && req.url === '/form') {
      let parsedData = qs.parse(store);
      let username = parsedData.name;
      let stringyData = JSON.stringify(parsedData);
      fs.open(userPath + username + '.json', 'wx', (err, fd) => {
        fs.writeFile(fd, stringyData, (err) => {
          fs.close(fd, (err) => {
            res.end(`${username} created`);
          });
        });
      });
    }
  });
});
server.listen(5678, () => {
  console.log('Server is running on port 5678');
});
