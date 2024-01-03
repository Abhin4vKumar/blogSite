import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
        <div className='flex items-center justify-center bg-[#101010] px-[50px] text-white font-sans w-[100%] h-[200px]'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div className='flex w-[100%] items-center justify-center text-center text-[#101010] font-sans h-[30px] bg-[#FFC300]' >BlogPost © Since 2023</div>
    </Fragment>
  )
}

export default Footer