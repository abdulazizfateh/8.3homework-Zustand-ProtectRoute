import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='site_header p-1.5 px-1'>
            <nav className='header_nav h-16 md:h-20 border border-[#5f5f5f] rounded-lg flex items-center justify-center gap-4'>
                <NavLink to={"/"} className='header_link text-xl'>Home</NavLink>
                <NavLink to={"/statistics"} className='header_link text-xl'>Statistics</NavLink>
            </nav>
        </header>
    )
}

export default React.memo(Header);