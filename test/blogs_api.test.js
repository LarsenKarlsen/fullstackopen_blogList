const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")

const Blog = require("../models/blog")
const helper = require("./test_helper")

// const initialBlogsDB = async () => {
//   for(let blog of helper.initialBlogs){
//     let newBlog = new Blog(blog)
//     await newBlog.save()
//   }
// }


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

})

const api = supertest(app)

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("returned correct amount of notes", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body[0]["id"]).toBeDefined()
  })
})

describe("testing GET api/blogs/:id", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test("fails with statuscode 404 if note does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "bubba"

    await api
      .get(`/api/blogs/${invalidId}`)
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

    await api
      .post("/api/blogs")
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

    await api
      .post("/api/blogs")
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

    await api
      .post("/api/blogs")
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

    await api
      .post("/api/blogs")
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

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    expect(response.body.likes).toBe(0)

  })
})

afterAll(async () => {
  await mongoose.connection.close()
})