const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (acc, blog) => acc + blog.likes,
    0
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length===0){
    return -1
  }
  const favoriteBlog = blogs.reduce(
    (prev, current) => prev.likes<current.likes ? current : prev
  )
  delete favoriteBlog._id
  delete favoriteBlog.url
  delete favoriteBlog.__v
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  const result = {}

  blogs.forEach(blog => {
    if (blog["author"] in result) {
      result[blog["author"]] += 1
    } else {
      result[blog["author"]] = 1
    }
  })

  if (Object.keys(result).length===0){
    return -1
  }

  const mostBlogsAuthor = Object.keys(result).reduce((prev, current) => result[prev]>result[current]? prev: current)
  return { author: mostBlogsAuthor, blogs:result[mostBlogsAuthor] }
}

const mostLikes = (blogs) => {
  const result = {}

  blogs.forEach(blog => {
    if (blog["author"] in result) {
      result[blog["author"]] += blog.likes
    } else {
      result[blog["author"]] = blog.likes
    }
  })

  if (Object.keys(result).length===0){
    return -1
  }

  const mostLikesAuthor = Object.keys(result).reduce((prev, current) => result[prev]>result[current]? prev: current)
  return { author: mostLikesAuthor, likes:result[mostLikesAuthor] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}