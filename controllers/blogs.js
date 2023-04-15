const blogsRouter = require("express").Router()

const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body)

  try{
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(error) {
    next(error)
  }

})

module.exports = blogsRouter