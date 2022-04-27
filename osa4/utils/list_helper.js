const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = {}
  let maxLikes = 0
  for (const blog of blogs) {
    if (blog.likes > maxLikes) {
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      maxLikes = blog.likes
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {
  let result = {}
  if (blogs.length > 0) {
    const authors = _.countBy(blogs, 'author')
    const most = Object.entries(authors).sort((a, b) => b[1] - a[1])[0]
    result = {
      author: most[0],
      blogs: most[1]
    }
  }
  return result
}

const mostLikes = (blogs) => {
  let result = {}
  let mostLikes = 0
  if (blogs.length > 0) {
    const authors = _.groupBy(blogs, 'author')
    for (const author in authors) {
      const likes = _.sumBy(authors[author], 'likes')
      if (likes > mostLikes) {
        mostLikes = likes
        result = {
          author: author,
          likes: mostLikes
        }
      }
    }
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
