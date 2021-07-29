import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote = ({anecdotes,votes,index,text}) =>{

  return(
    <div>
      <h2>{text}</h2>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </div>
  )
}

const Button = ({click,text}) => {
  return(
    <button onClick={click}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0));
  
  const copyVotes=[...votes];
  const mostVotes=copyVotes.indexOf(Math.max(...copyVotes))
  
  const nextButton = () =>{
    const random = Math.floor(Math.random() * (props.anecdotes.length));
    setSelected(random);
  }

  const voteButton = () =>{
    copyVotes[selected]+=1;
    setVotes(copyVotes);
  }

  return (
    <div>
      <Anecdote anecdotes={props.anecdotes} votes={copyVotes} index={selected} text="Anecdote of the day"/>
      <Button click={nextButton} text="next anecdote"/>
      <Button click={voteButton} text="vote"/>
      <Anecdote anecdotes={props.anecdotes} votes={copyVotes} index={mostVotes} text="Anecdote with most votes"/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


