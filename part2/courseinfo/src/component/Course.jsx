const Header = (props) => {
    return(
      <header>
        <h3>{ props.course }</h3>
      </header>
    )
}
  
const Part = (props) => {
    return(
      <p>{props.part} {props.exercises}</p>
    )
}
  
const Content = (props) => {
    return(
      <div>
        {props.parts.map(part => (
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
        ))}
      </div>
    )
}
  
const Total = ({exercises}) => {
    
    let total = exercises.reduce((acc, part) => {
      return acc + part.exercises
    }, 0)
  
    return(
      <div>
        <strong>total of {total} exercises</strong>
      </div>
    )
}  

const Course = ({course}) => {
    return(
      <>
        <Header course={course.name} />
        <Content 
          parts={course.parts} 
        />
        <Total 
          exercises={course.parts} 
        />
      </>
    )
}

export default Course