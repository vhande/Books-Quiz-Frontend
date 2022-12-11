import React from 'react'
import {Container,Card} from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Link} from 'react-router-dom'

function BooksComponent({popularBooks}) {
  
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    
  return (
    <Container fluid id="container" className=" p-3 my-4 d-flex flex-column" >
      <h1 className="h2 text-center">Popular Books</h1>
    <Carousel id="carousel" className="py-2"
  swipeable={true}
  draggable={false}
  showDots={false}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  keyBoardControl={true}
  customTransition="1"
  containerClass="carousel-container"
  itemClass="carousel-item-padding-40-px"

>
{popularBooks !== undefined ?  popularBooks.map(item =>
  
    <Link to={`/search/${item.id}`} key={item.id}>
    <Card  className=" card rounded-0 mx-3 d-flex flex-row h-100 align-items-center justify-content-evenly" >
      <div  className="text-center w-100">
        <Card.Title  className="text-break">{item.volumeInfo.title}</Card.Title>
        <Card.Subtitle  className="text-break">{item !== undefined && item.volumeInfo.authors !== undefined ?
          item.volumeInfo.authors.map(item=> item) : ""}</Card.Subtitle>
          </div>
          <div className="w-100">
    <Card.Img 
          key={item.id}
          className="carousel-img d-block w-100"
          src= {item.volumeInfo.imageLinks !== undefined ? item.volumeInfo.imageLinks.thumbnail :"https://www.svgrepo.com/show/289667/book-cover.svg"}
            alt="Slide"
        />
        </div>
    </Card> 
    </Link>  ) : "" }
  </Carousel>
      </Container>
  )
}

export default BooksComponent