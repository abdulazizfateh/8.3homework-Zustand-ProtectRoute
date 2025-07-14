import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header />
            <main className='site_main'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default React.memo(Layout);