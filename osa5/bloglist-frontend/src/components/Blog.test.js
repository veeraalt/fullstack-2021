import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author but not other info by default', () => {
  const userData = {
    id: '123test',
    username: 'test-user',
    name: 'Test User'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'test-url.com/component-testing',
    likes: 2,
    user: userData
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} user={userData} toggleLike={mockHandler} toggleRemove={mockHandler} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Test Author')
  expect(div).not.toHaveTextContent('test-url.com/component-testing')
  expect(div).not.toHaveTextContent('likes')
  expect(div).not.toHaveTextContent('Test User')
})

test('renders all blog info when view button is clicked', async () => {
  const userData = {
    id: '123test',
    username: 'test-user',
    name: 'Test User'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'test-url.com/component-testing',
    likes: 2,
    user: userData
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} user={userData} toggleLike={mockHandler} toggleRemove={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Test Author')
  expect(div).toHaveTextContent('test-url.com/component-testing')
  expect(div).toHaveTextContent('likes 2')
  expect(div).toHaveTextContent('Test User')
})

test('likeHandler function of a blog is called twice when like button is pressed twice', async () => {
  const userData = {
    id: '123test',
    username: 'test-user',
    name: 'Test User'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'test-url.com/component-testing',
    likes: 2,
    user: userData
  }

  const mockLikeHandler = jest.fn()
  const mockRemoveHandler = jest.fn()

  render(<Blog blog={blog} user={userData} toggleLike={mockLikeHandler} toggleRemove={mockRemoveHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})
