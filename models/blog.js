const mongoose = require("mongoose");

//Schema defines the structure of a type of a document(property types)
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Model wraps around our Schema, and provides us with an interface by which we can  communicate with a database collection for that document type. The first argument(name of this model) we pass in MUST be singular like "Blog", mongoose will pluralize it and then look for that collectio('Blogs') inside the database.The second argument is schema we want  to base this model on.
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
