const express = require("express");
//express app
const app = express();

//listen for requests
app.listen(3000);

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
