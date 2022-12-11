import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

function Layout({children, categoryArray}) {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop>
      <Header 
      
      categoryArray={categoryArray} />
        {children}
      <Footer/>
      </ScrollToTop>
    </BrowserRouter>
    </>
  )
}

export default Layout