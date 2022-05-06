import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, toggleLike, toggleRemove }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = (event) => {
    event.preventDefault()
    setShowAll(!showAll)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {showAll === false ?
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowAll}>view</button>
        </div>
        :
        <div>
          <div>
            {blog.title} {blog.author}
            <button onClick={toggleShowAll}>hide</button>
          </div>
          {blog.url}
          <div>
            likes {blog.likes}
            <button onClick={() => toggleLike(blog)}>like</button>
          </div>
          {blog.user.name}
          <div>
            {blog.user.username === user.username ?
              <button onClick={() => toggleRemove(blog)}>remove</button>
              : <div></div>}
          </div>
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  toggleLike: PropTypes.func.isRequired,
  toggleRemove: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
