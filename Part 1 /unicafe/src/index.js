import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
      <button onClick={props.function}>{props.text}</button>
  )
}

const Statistics = (props) => {
 

  return(
      <tr>
        <td>
          {props.text}
        </td>
        <td>
          {props.value}
        </td>
      </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total=good+neutral+bad
  const average = ((good*1)+(neutral*0)+(bad*(-1)))/(total);
  const positive = ((good*100)/total)+'%';

  const goodClick= () => {
    setGood(good+1);
  }

  const neutralClick= () => {
    setNeutral(neutral+1);
  }

  const badClick= () => {
    setBad(bad+1);
  }
  
  if(total===0){
    return(
      <div>
        <h2>Give feedback</h2>
        <Button function={goodClick} text="good"/>
        <Button function={neutralClick} text="neutral"/>
        <Button function={badClick} text="bad"/>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Give feedback</h2>
      <Button function={goodClick} text="good"/>
      <Button function={neutralClick} text="neutral"/>
      <Button function={badClick} text="bad"/>
      <h2>Statistics</h2>
      <table>
      <Statistics text="good " value={good}/>
      <Statistics text="neutral " value={neutral}/>
      <Statistics text="bad " value={bad}/>
      <Statistics text="all " value={total}/>
      <Statistics text="average " value={average}/>
      <Statistics text="positive " value={positive}/>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)