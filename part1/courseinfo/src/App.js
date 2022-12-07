const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  const p = []
  props.parts.forEach(part => {
    p.push(<Parts name={part.name} exercises={part.exercises} />)
  });
  return p
}

const Total = (props) => {
  const [part1, part2, part3] = props.exercises;
  return (
    <div>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    </div>
  );
}

const Parts = (props) =>
  <p>
    {props.name} {props.exercises}
  </p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts} />
    </div>
  )
}
export default App