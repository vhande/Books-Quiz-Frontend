import React from 'react'
import {Container,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Homequiz() {
  return (
    <Container fluid className="card rounded-0 text-center mb-5 p-4">
        <div>
            <h1 className="h2">Have you seen our quiz?</h1>
            <p className="lead">Do you consider yourself a bookworm? Take our 10 question find out if you are an expert or not.</p>
            <Link to={'/quiz'}><Button className="rounded-0  btn-outline-dark btn-secondary text-light">Go to Quiz</Button></Link>

        </div>

    </Container>
  )
}

export default Homequiz