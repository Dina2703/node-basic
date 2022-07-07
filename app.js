const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
//express app
const app = express();

//connect to Mongodb
const dbURI =
  "mongodb+srv://dina:dina2703@cluster1.wtcd8.mongodb.net/note-tuts?retryWrites=true&w=majority";
//use mongoose object to connect to the database
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

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

//mongoose and mongo sandbox routes. TEST
//create a new doc and save to the collection in our database
app.get("/add-blog", (req, res) => {
  //with 'new' word we create a new instance of the Blog document, and pass required proporties, which we defined in 'blogSchema'
  const newBlog = new Blog({
    title: "blog number 2",
    snippet: "test blog",
    body: "more about this blog",
  });
  //to save just created newBlog to 'blogs' collection in the database
  newBlog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//get all blogs
app.get("/all-blogs", (req, res) => {
  Blog.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//find a single blog

app.get("/single-blog", (req, res) => {
  Blog.findById("62c6410c7fe3aa8fcd5e0dc4")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

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
