const Course = ({ course }) => {
    const { name, parts } = course
    const total = parts.reduce((sum, parts) => sum += parts.exercises, 0)
    return (
        <div>
            <Header header={name} />
            <Content parts={parts} />
            <Statistics score={total} />
        </div>
    )
}

const Header = ({ header }) => <h2>{header}</h2>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>)
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Statistics = ({ score }) => <>total: {score}</>

export default Course