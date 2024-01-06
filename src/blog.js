import React, { useState , useRef , useEffect} from 'react'
import Link  from 'next/link'

export default function Blog(props){
  
  return (
    <>
        <div className=' backdrop-saturate-200  transition-all duration-500 cursor-default relative min-h-[170px] min-w-[50vw] mt-[20px] border border-gray-700 px-[20px] py-[20px] backdrop:blur hover:scale-105 hover:z-[2]'>
            <div>
                <h3 className='font-sans text-center font-bold text-xl'>{props.i.name}</h3>
            </div>
            <p className='font-mono text-center mt-[10px]'>{props.i.desc.slice(0,70) + (props.i.desc.length >70 ? "..." : "")}</p>
            <Link className='absolute transition-colors duration-300 bottom-[0px] border-t border-l border-gray-700 right-[0px] hover:bg-purple-500 hover:text-black px-[20px] py-[10px]' href={"blog/"+props.i._id.toString()} >Read More</Link>
        </div>
    </>
  )
}
