import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const AnecdoteLine = ({ anecdotes, points, selected }) => {
  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [best, setBest] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))

  const handleNextClick = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    if (copy[selected] > points[best]) {
      setBest(selected)
    }
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <AnecdoteLine anecdotes={anecdotes} points={points} selected={selected} />
        <Button handleClick={handleVoteClick} text="vote" />
        <Button handleClick={handleNextClick} text="next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <AnecdoteLine anecdotes={anecdotes} points={points} selected={best} />
      </div>
    </div>
  )
}

export default App
