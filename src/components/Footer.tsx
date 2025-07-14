import React from 'react'
import { TfiAngleUp } from "react-icons/tfi";

const Footer = () => {
  return (
    <footer className='site_header border-t border-[#5f5f5f]'>
      <div className='container mx-auto'>
        <div className='header_nav h-16 md:h-20 flex items-start pt-4 justify-center'>
          <TfiAngleUp onClick={() => scrollTo(0, 0)} className='text-2xl cursor-pointer' />
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer);