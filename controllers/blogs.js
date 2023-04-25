const jwt = require("jsonwebtoken")
const blogsRouter = require("express").Router()

const Blog = require("../models/blog")
const User = require("../models/user")

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}


blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs:0 })
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

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error:"invalid token" })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  blog.user = user._id
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findOneAndUpdate(request.params.id, blog, { new:true })

  response.status(200).json(updatedBlog)
})

blogsRouter.delete("/:id", async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter