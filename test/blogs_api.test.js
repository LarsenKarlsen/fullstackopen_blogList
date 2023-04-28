const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash("secret", 10)
  const user = new User({ username:"testRoot", passwordHash })
  await user.save()

  await Blog.deleteMany({})
  const userInDb = await User.findOne({})
  const initialBlogs = helper.initialBlogs.map(b => {
    b.user=userInDb._id
    return b
  })
  await Blog.insertMany(initialBlogs)
})

const api = supertest(app)

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as JSON", async () => {
    const token = await helper.getToken(api)

    await api
      .get("/api/blogs")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("returned correct amount of notes", async () => {
    const token = await helper.getToken(api)
    const response = await api
      .get("/api/blogs")
      .set("Authorization", token)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("unique identifier property of the blog posts is named id", async () => {
    const token = await helper.getToken(api)
    const response = await api.get("/api/blogs").set("Authorization", token)

    expect(response.body[0]["id"]).toBeDefined()
  })
})

describe("testing GET api/blogs/:id", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    blogToView.user = blogToView.user.toString()
    const token = await helper.getToken(api)

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test("fails with statuscode 404 if note does not exist", async () => {
    const token = await helper.getToken(api)
    const validNonexistingId = await helper.nonExistingId()

    // console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .set("Authorization", token)
      .expect(404)
  })

  test("fails with statuscode 400 id is invalid", async () => {
    const token = await helper.getToken(api)
    const invalidId = "bubba"

    await api
      .get(`/api/blogs/${invalidId}`)
      .set("Authorization", token)
      .expect(400)
  })
})

describe("testing POST api/blogs/", () => {
  test("HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
    const newBlog =   {
      title: "New Test BLOG",
      author: "Test author",
      url: "https://test.com/",
      likes: 42,
    }
    const token = await helper.getToken(api)

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    const titles = blogsAfter.map(b => b.title)

    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

    expect(titles).toContain("New Test BLOG")

  })

  test("Blog with empty title will not be saved", async () => {
    const invalidBlog =   {
      author: "Test author",
      url: "https://test.com/",
      likes: 42,
    }
    const token = await helper.getToken(api)

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(invalidBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)

  })

  test("Blog with empty author will not be saved", async () => {
    const invalidBlog =   {
      title: "Test author",
      url: "https://test.com/",
      likes: 42,
    }
    const token = await helper.getToken(api)

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(invalidBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)

  })

  test("Blog with empty URL will not be saved", async () => {
    const invalidBlog =   {
      title: "Test author",
      author: "https://test.com/",
      likes: 42,
    }
    const token = await helper.getToken(api)

    await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(invalidBlog)
      .expect(400)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)

  })

  test("HTTP POST request to the /api/blogs URL successfully creates a new blog post, if likes doesnt set, default value of likes = 0", async () => {
    const newBlog =   {
      title: "New Test BLOG",
      author: "Test author",
      url: "https://test.com/",
    }
    const token = await helper.getToken(api)

    const response = await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(response.body.likes).toBe(0)

  })

  test("Adding a blog fails with the status code 401 Unauthorized if a token is not provided", async() => {
    const newBlog =   {
      title: "New Test BLOG",
      author: "Test author",
      url: "https://test.com/",
    }
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })
})

describe("testing DELETE api/blogs/:id", () => {
  test("succed with status code 204 if id is valid", async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const token = await helper.getToken(api)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })
  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "bubba"
    const token = await helper.getToken(api)

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set("Authorization", token)
      .expect(400)
  })
})

describe("testing PUT api/blogs/:id", () => {
  test("succed with status code 200 if id is valid", async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 42
    const token = await helper.getToken(api)

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", token)
      .send(blogToUpdate)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0]).toEqual(blogToUpdate)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})