import React, { useEffect, useState } from 'react'
import Homepage from './Homepage'
import SearchPage from './SearchPage'
import Quiz from './Quiz'
import { useNavigate, Route, Routes } from "react-router-dom"
import Layout from './Layout/Layout'


function App() {
 
    const categoryArray = ["Science fiction","Romance","Classics", "Fantasy", "Horror", "Adventure", "Graphic novel", "Biography", "Autobiography", "Cookbook", "History","Poetry","Self-help"]
    const [randomBook, setRandomBook] = useState();
    const [popularBooks, setPopularBooks] = useState([])

    const [selectedBook,setSelectedBook] = useState([])
    
    
    function getRandomInt(arr) {
        return Math.ceil(Math.random() * arr.length ); }

        

    const getPopularBooks = async () => {
        let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=genres:newyorktimesbestsellers&maxResults=20`)
        let data = await res.json()
        setPopularBooks(data.items)
  
    }


        
    const getBooks = async () => {
        let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${categoryArray[getRandomInt(categoryArray)]}&maxResults=40`)
        let data = await res.json()
        setRandomBook(data.items[getRandomInt(data.items)])
 
        // console.log(getRandomInt(data.items))
        // console.log(getRandomInt(categoryArray))
        }
       

    
        // let filterit = searchBooks.filter(book=>book.volumeInfo.title.toLowerCase() === e.target.value.toLowerCase())
        // setSelectedBook(filterit)
        // console.log(filterit[0].id)} 


    useEffect(()=>{
        getBooks();
        getPopularBooks();
    }, [])


  

         // search bar searching
   

    return (
        <Layout 
        
        
        categoryArray={categoryArray}
        >
            <Routes>
                <Route path="/" element={<Homepage 
                randomBook={randomBook}
                getBooks={getBooks}
                popularBooks={popularBooks} />} />
                <Route path="/search/:id" element={<SearchPage/>}/>
                <Route path="/quiz" element={<Quiz/>}/>
            </Routes>
        </Layout>
    )
}

export default App