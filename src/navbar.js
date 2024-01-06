import React, { useEffect, useRef, useState } from 'react'
import Link  from 'next/link'
import {useSelector} from "react-redux";


export default function Navbar(){
    const {loading , isAuthenticated , user} = useSelector((state) => (state.user));
    const appRef = useRef();
    const setNav = ()=>{
        try{
            if(appRef){
                appRef.current.style.setProperty(
                    '--tw-translate-y',
                    "-10px"
                )
                appRef.current.style.setProperty(
                    '--tw-translate-x',
                    "-50%"
                )
            }  
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        setNav();
    },[appRef]);
  return (
    <>
    <div ref={appRef} className={"block fixed bg-[rgba(16,16,16,0.9)] blur w-[200vw] h-[70px] transform z-10"}></div>
    <nav className={"flex text-white fixed font-sans w-[100%] z-10 h-[60px] bg-[rgba(16,16,16,0.7)] backdrop:blur-sm"}>
        <div className='navLogo ml-[20px] h-[100%] flex items-center cursor-pointer'>
            <Link href={{pathname:"/",}} className="text-3xl font-bold" >BlogPost</Link>
        </div>
        <div className='navOptions h-[100%] flex items-center cursor-pointer absolute gap-[10px] top-0 right-0'>
            <div className='navButtons h-[100%] flex items-center cursor-pointer'>
                <ul className={"flex list-none items-center gap-0 h-[100%]"}>
                    <li><Link className='flex px-[20px] h-[60px] text-center items-center justify-center gap-[10px] hover:bg-white hover:text-black transition-all duration-300 ease-linear border-b-2 border-transparent' href={{pathname:"/",}}>Home</Link></li>
                    <li><Link className='flex px-[20px] h-[60px] text-center items-center justify-center gap-[10px] hover:bg-white hover:text-black transition-all duration-300 ease-linear border-b-2 border-transparent' href={{pathname:"/about",}}>About</Link></li>
                    <li><Link className='flex px-[20px] h-[60px] text-center items-center justify-center gap-[10px] hover:bg-white hover:text-black transition-all duration-300 ease-linear border-b-2 border-transparent' href={{pathname:"/blogs",}}>Blogs</Link></li>
                    {isAuthenticated?
                    <li><Link className='flex px-[20px] h-[60px] text-center items-center justify-center gap-[10px] hover:bg-white hover:text-black transition-all duration-300 ease-linear border-b-2 border-transparent' href={{pathname:"/new",}}>Post</Link></li>
                    :<></>
                    }
                </ul>
            </div>
            <div className='navLogin h-[100%] flex items-center cursor-pointer'>
                {!isAuthenticated?
                    <Link href={`/login`}>
                    <button className="flex bg-transparent bg-none text-white px-[20px] items-center justify-center h-[60px] outline-none mr-[20px] transition-all duration-300 ease-linear cursor-pointer hover:bg-[#FFC300] hover:text-black">Login</button>
                </Link>
                :
                <Link href={`/me`}>
                    <button className="flex bg-transparent bg-none text-white px-[20px] items-center justify-center h-[60px] outline-none mr-[20px] transition-all duration-300 ease-linear cursor-pointer hover:bg-[#FFC300] hover:text-black">Me</button>
                </Link>}
            </div>
        </div>
    </nav>
    </>
  )
}
