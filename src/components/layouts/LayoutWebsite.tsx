import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import "../../assets/scss/index.scss"


const LayoutWebsite = () => {
    return (
        <>
            <Header />

            <Outlet />

            <Footer />
        </>
    )
}

export default LayoutWebsite