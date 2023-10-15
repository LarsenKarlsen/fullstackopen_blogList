const blogsRouter = require("express").Router()
const middleware = require("../utils/middleware")

const Blog = require("../models/blog")


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs:0 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const note = await Blog.findById(request.params.id).populate("user", { blogs:0 })
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const user = request.user
  console.log(user)

  const blog = new Blog(request.body)
  blog.user = user.id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true }).populate("user", { blogs:0 })

  response.status(200).json(updatedBlog)
})

blogsRouter.delete("/:id", middleware.tokenExtractor, middleware.userExtractor, async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  const blogCreatorId = blog.user.toString()
  if (blogCreatorId !== request.user.id) {
    return response.status(401).json({ error: "You dont have permission to delete this blog" })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter