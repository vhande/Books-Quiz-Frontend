import React from 'react'
import BooksComponent from './Components/Homepage/BooksComponent'
import RandomBooks from './Components/Homepage/RandomBooks'
import Homequiz from './Components/Homepage/Homequiz'
import {Container} from 'react-bootstrap'



function Homepage({randomBook,getBooks,popularBooks}) {
  return (
    <>
    <Container fluid className="homepage">
    <RandomBooks randomBook={randomBook} getBooks={getBooks}/>
    <BooksComponent 
    popularBooks={popularBooks} />
    <Homequiz/>
    </Container>

   
   
   
  
    </>
  )
}

export default Homepage