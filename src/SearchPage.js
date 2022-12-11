import React, { useEffect, useMemo } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {Card, Container,Badge} from 'react-bootstrap'

function SearchPage() {


    const {id} = useParams()
    const [bookDetail, setBookDetail] = useState({})
     const navigate = useNavigate(); 
    
    const fetchSearch = async () => {
      let res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      let data = await res.json()
      setBookDetail(data.volumeInfo)
 
    }
    useEffect(() => {
        fetchSearch();
        navigate({
          pathname: `/search/${id}`,
        }) 
    }, [id])




    
  return (
  <Container fluid id="container" className="d-flex justify-content-center align-items-center">
      <Card  className="m-4 quiz-card d-flex align-items-center justify-content-center rounded-0">
      
        <Card.Body className="d-inline-flex flex-column  align-items-center  justify-content-end ">
        <Card.Img   variant= "top" className="mb-4" src={bookDetail !== undefined && bookDetail.imageLinks !== undefined ?
          bookDetail.imageLinks.thumbnail :
          "https://www.svgrepo.com/show/289667/book-cover.svg"} />
          <div> 
          <Card.Title>{bookDetail !== undefined ? bookDetail.title : ""}</Card.Title>
          <Card.Subtitle className="mb-1">{bookDetail !== undefined && bookDetail.authors !== undefined ?
          bookDetail.authors.map(item=> bookDetail.authors.indexOf(item) !== bookDetail.authors.length-1 ? item + ", " 
          : item) : ""}</Card.Subtitle>
          <Card.Subtitle className="mb-1">{bookDetail.publishedDate !== undefined ? bookDetail.publishedDate.slice(0,4) : ""}</Card.Subtitle>
          <Card.Subtitle className="mb-1">{bookDetail !== undefined ? bookDetail.publisher : ""}</Card.Subtitle>
          <Card.Text>
          {bookDetail !== undefined && bookDetail.description !== undefined ? bookDetail.description.replaceAll("<br>", "").replaceAll("<p>","").replaceAll("</p>","").replaceAll("<i>","").replaceAll("</i>","").replaceAll("<b>","").replaceAll("</b>","").replaceAll("<ul>","").replaceAll("</ul>","").replaceAll("<li>","").replaceAll("</li>",""): ""}
          </Card.Text>
          <a target="_blank" className="preview-link" href={bookDetail !== undefined ? bookDetail.previewLink : ""}>Preview on Google Books</a>
          </div>
        </Card.Body>
     
      </Card>
      </Container>

  )
}

export default SearchPage