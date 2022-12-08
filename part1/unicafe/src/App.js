import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} context="Good" />
      <Button handleClick={handleNeutral} context="Neutral" />
      <Button handleClick={handleBad} context="Bad" />
      <Statictics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ handleClick, context }) =>
  <button onClick={handleClick}>
    {context}
  </button>

const Statictics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(1)
  const positive = (good / all * 100).toFixed(1) + '%'

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
            <StaticticsLine text="good" value={good} />
            <StaticticsLine text="neutral" value={neutral} />
            <StaticticsLine text="bad" value={bad} />
            <StaticticsLine text="all" value={all} />
            <StaticticsLine text="average" value={average} />
            <StaticticsLine text="positive" value={positive} />
        </table>
      </div>)
  }
}

const StaticticsLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

export default App