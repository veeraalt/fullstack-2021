import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    updateBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }

  const handleException = (exception) => {
    if (exception.response && exception.response.status === 401) {
      setErrorMessage('session expired, log in again')
      setTimeout(() => {
        window.localStorage.clear()
        window.location.reload()
        setErrorMessage(null)
      }, 5000)
    } else {
      setErrorMessage('something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      handleException(exception)
    }
  }

  const toggleLike = async (blog) => {
    const blogData = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.update(blog.id, blogData)
      updateBlogs()
    } catch (exception) {
      handleException(exception)
    }
  }

  const toggleRemove = async(blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        updateBlogs()
      }
    } catch (exception) {
      handleException(exception)
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} type="error"/>
      <Notification message={successMessage} type="success"/>
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        :
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} toggleLike={toggleLike} toggleRemove={toggleRemove}/>)}
        </div>
      }
    </div>
  )

}

export default App
