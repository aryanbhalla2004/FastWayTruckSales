import React from 'react'
import Header from '../Components/header'
import Footer from '../Components/footer'
import { Outlet } from 'react-router-dom'
export const LandingPage = (props) => {
  return (
    <>
      <Header page={props.page} setPage={props.setPage} setLoading={props.setLoading}/>
      <Outlet/>
      <Footer />
    </>
  )
}

export default LandingPage;