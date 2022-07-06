//create a server
const http = require("http");

//fs - filesystem module from node
const fs = require("fs");
const server = http.createServer((req, res) => {
  console.log("request made");
  console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    //redirect case
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "notFound.html";
      res.statusCode = 404;
      break;
  }
  //send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

//the server listening port 3000 on localhost
server.listen(3000, () => {
  console.log("listening for request on port 3000");
});
