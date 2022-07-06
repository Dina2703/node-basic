const express = require("express");
const morgan = require("morgan");
//express app
const app = express();

//listen for requests
app.listen(3000);

//create custom middleware. call next() method at the end of your middleware code, in order to move to the next coming code block(below the middleware code block, which is route handlers in this case)
// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

//3-d party middleware. Morgan utility
app.use(morgan("dev"));

//middleware & static files. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware. Otherwise you can't apply style.css roles for html files.
app.use(express.static("public"));

//route handlers
app.get("/", (req, res) => {
  // res.json({ message: "hello" });
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page. Middleware to handle not Found route, MUST be at the end, so if any other route path doesn't math, the code below will fire. Otherwise it will fire for any single request.
app.use((req, res) => {
  res.status(404).sendFile("./views/notFound.html", { root: __dirname });
});
