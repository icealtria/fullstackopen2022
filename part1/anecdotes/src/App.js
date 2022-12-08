import { useState } from "react"

const Button = ({ handleClick, context }) => (
  <button onClick={handleClick}>{context}</button>
)

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdote}</div>
      <div>has {vote} votes</div>
    </div>
  )
}

const MostVotes = ({ context, vote }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{context}</div>
      <div>has {vote} votes</div>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  const MaxVotes = () => {
    let max = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
      }
    }
    return max
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={handleVote} context="vote" />
      <Button handleClick={handleNext} context="next anecdote" />
      <MostVotes context={anecdotes[votes.indexOf(MaxVotes())]} vote={MaxVotes()} />
    </div>
  )
}

export default App