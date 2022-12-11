import React, { useEffect } from 'react'
import {Card,Container,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function RandomBooks({randomBook,getBooks}) {

  return (
    <Container fluid className="card">
    <Card className="card text-center rounded-0 d-flex h-100 p-4 flex-sm-row justify-content-evenly align-items-center">
        <div className="w-100">
      <Card.Img  className="random-img rounded-0 w-100 mb-2" variant="top" src={randomBook !== undefined && randomBook.volumeInfo.imageLinks !== undefined ?
        randomBook.volumeInfo.imageLinks.thumbnail :
        "https://www.svgrepo.com/show/289667/book-cover.svg"} />
        </div>
          <div className="w-100">
      {randomBook!== undefined ? <Link to={`search/${randomBook.id}`}><Card.Title className="font-yellow w-100">{randomBook !== undefined ?
        randomBook.volumeInfo.title : ""}</Card.Title>
      <Card.Subtitle className="font-yellow w-100">{randomBook !== undefined && randomBook.volumeInfo.authors !== undefined ?
        randomBook.volumeInfo.authors.map(item=>item) : ""}</Card.Subtitle></Link> : ""}
           <Button className="rounded-0 mt-3 btn-outline-dark btn-secondary text-light"onClick={getBooks}>Another Random Book</Button>
    </div>
  
  </Card>
  </Container>
  )
}

export default RandomBooks