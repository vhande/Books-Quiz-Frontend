import React from 'react'
import { Container, Form, Nav, Navbar, Offcanvas, Dropdown, InputGroup, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import {GiBookAura} from 'react-icons/gi';



function Header({ categoryArray }) {
  const [inputValue, setInputValue] = useState("")
  const [searchBooks, setSearchBooks] = useState([])
  const myHook = useRef(null)
  const inputHook = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pickedCategory, setPickedCategory] = useState("")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleClose = () => setMenuOpen(false)

  const fetchSearch = async () => {
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}+subject:${pickedCategory}`)
    let data = await res.json()
    setSearchBooks(data.items)
  }

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputValue}+subject:${pickedCategory}`)
        .then(res => res.json())
        .then(data => {
          setSearchBooks(data.items)
        })
    }

    // close search dropdown when you click outside
const specifiedElement = document.getElementById('search')
document.addEventListener('click', event => {
  const isClickInside = specifiedElement.contains(event.target)
  if (!isClickInside) {
    myHook.current.classList.remove("show")
  }
})

  }, [inputValue,pickedCategory])



  // pick category for search bar
  const pickCategoryEvent = (e) => {
    setPickedCategory(e.target.title)
  }

  // sets the category empty
  const allBooks = () => {
    setPickedCategory("")
  }

  const searchEvent = (e) => {
    setInputValue(e.target.value)
  }

  const closeSearch = (e) => {
    if (e.target.title === 'close') {
    myHook.current.classList.remove("show")

  }
  }

  // to show and hide the dropdown of the searchbar
  const hookEvent = () => {
    if (inputHook.current.value !== "") {
      myHook.current.classList.add("show")
    } else {
      setSearchBooks([])
      myHook.current.classList.remove("show")
    }

  }
  

  const close = (e) => {
    if (e.target.title === "book") {
      myHook.current.classList.remove("show")
      inputHook.current.value = ""
    }
  } 

  return (
    <>
       {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
      <Navbar expand={false} key={expand} className="mb-3 px-3 header fixed-top">
        <Container fluid >
          <Container fluid className="d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex justify-content-center">
          <Navbar.Brand to="/" as={Link} className="brand m-0 d-flex align-items-center justify-content-center" href="#"><GiBookAura className="me-1"  /> Books</Navbar.Brand>
          </div>
                {/* Search bar */}
                <div className="search-bar d-flex mx-2">
                <Dropdown onClick={(e)=>{closeSearch(e)}} className="categories-dropdown">
                  <Dropdown.Toggle title="close" variant="secondary" className="categories-dropdown rounded-0 shadow-none" id="dropdown-basic">
                    {pickedCategory !== "" ? pickedCategory : "All"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu  >
                    <Dropdown.Item onClick={allBooks}>All</Dropdown.Item>
                    {categoryArray.sort().map(item => <Dropdown.Item key={item} className="category-list" title={item} onClick={pickCategoryEvent}>{item}</Dropdown.Item>)}
                  </Dropdown.Menu>
                </Dropdown>   
                <Dropdown>
                <InputGroup className="d-flex align-content-center justify-content-center">
                <Form.Control id="search"  className="rounded-0 shadow-none yellow-bg" style={{borderRight:"0"}} ref={inputHook} onChange={(e) => { searchEvent(e); hookEvent(); }} 
                  placeholder="Search books..."
                  aria-label="Username"
                  aria-describedby="basic-addon1" />
                <InputGroup.Text role="button" onClick={fetchSearch} className="yellow-bg rounded-0 border-0" id="basic-addon1"><BsSearch /></InputGroup.Text>
                <Dropdown.Menu ref={myHook} onClick={close}title="close" className="dropdown-menu yellow-bg mt-0 rounded-0">
                  {searchBooks !== undefined ? searchBooks.slice(0,5).map((item) =>
                    <ListGroup.Item key={item.id} to={`/search/${item.id}`} as={Link} id="search" title="book" eventKey="0" className="m-2 yellow-bg d-flex align-items-center">{item.volumeInfo.title}</ListGroup.Item>)
                    : ""}
                </Dropdown.Menu>
                </InputGroup>  
                </Dropdown>
                </div>
              {/* End of searchbar */}
          <Navbar.Toggle onClick={toggleMenu} 
          aria-controls="false" />
          </Container>
          <Navbar.Offcanvas className="offcanvas" 
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            show={menuOpen}
            onHide={handleClose}
            restoreFocus={true}>
            <Offcanvas.Header closeButton>
            <Link to={'/'}><Offcanvas.Title onClick={toggleMenu} className="brand" id={`offcanvasNavbarLabel-expand-${expand}`}>
              <GiBookAura /> Books
              </Offcanvas.Title></Link>
            </Offcanvas.Header>
            <Offcanvas.Body>

              <Nav className="d-flex align-items-center justify-content-end flex-grow-1 pe-3">
              <Link to={'/'} onClick={toggleMenu} className="nav-link"><Offcanvas.Title></Offcanvas.Title>Home</Link>
                <Link to={'/quiz'} onClick={toggleMenu}  className="nav-link">Quiz</Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas> 
        </Container>
      </Navbar>
  ))}
    </>

  );
}
export default Header