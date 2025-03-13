import { useState } from "react"

const Button = (props) => {
  const { label, onClick } = props

  return(
    <button onClick={onClick}>{label}</button>
  )
}

const StatisticLine = (props) => {
  const { text, value } = props

  return(
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / all 
  const positive = all === 0 ? 0 : (good / all) * 100

  if(all === 0){
    return(
      <h2>No feedback given</h2>
    )
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
              <StatisticLine text="good" value={good}/>
          </tr>
          <tr>
              <StatisticLine text="neutral" value={neutral}/>
          </tr>
          <tr>
              <StatisticLine text="bad" value={bad}/>
          </tr>
          <tr>
              <StatisticLine text="all" value={all}/>
          </tr>
          <tr>
              <StatisticLine text="average" value={average}/>
          </tr>
          <tr>
              <StatisticLine text="positive" value={`${positive} %`}/>
          </tr>  
        </tbody>
      </table>
    </>
  )
}


function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <div>
        <Button label="good" onClick={() => setGood(good + 1)}/>
        <Button label="neutral" onClick={() => setNeutral(neutral + 1)}/>
        <Button label="bad" onClick={() => setBad(bad + 1)}/>
      </div>
      <h2>statistics</h2>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </>
  )
}

export default App
