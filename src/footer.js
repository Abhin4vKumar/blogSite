import React, { Fragment } from 'react'

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <Fragment>
        <div className='relative flex items-center justify-center bg-[#101010] px-[50px] text-white font-sans w-[100%] h-[200px]'>
            <p>Explore the vibrant world of NEON BLOGS, where diverse voices converge to create a tapestry of stories and ideas. Connect with us on this journey of expression and discovery. For inquiries or collaborations, reach out to us at <b className='hover:tracking-wide transition-all duration-300 hover:text-slate-500 cursor-pointer'>info@neonblogs.com</b> or call <b className='hover:tracking-wide transition-all duration-300 hover:text-slate-500 cursor-pointer'>(555) 123-4567</b>. Follow our socials for updates and inspirations. Join NEON BLOGS — where every story finds its glow.</p>
        </div>
        <div className='flex w-[100%] items-center justify-center text-center text-[#101010] font-sans h-[30px] bg-purple-500' >NeonBlogs © {year}</div>
    </Fragment>
  )
}

export default Footer