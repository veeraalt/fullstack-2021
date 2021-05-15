import React from 'react'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${type}-alert`}>
      {message}
    </div>
  )
}

export default Notification