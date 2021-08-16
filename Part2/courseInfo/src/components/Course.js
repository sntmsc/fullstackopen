import React from 'react'

const Course = ({course}) =>{
    return(
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }
  const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((sum,part) =>sum+part.exercises,0)
    return(
      <p>Number of exercises {total}</p>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    const parts= course.parts.map(part => <Part key={part.id} part={part}/>)
    return (
      <div>
        {parts}
      </div>
    )
  }
  


export default Course