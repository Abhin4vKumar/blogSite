import React, { useState } from 'react'
import Link  from 'next/link'
import styles from '@/styles/navbar.module.css'

export default function Navbar(){
    const [bgButtonColor , setBgButtonColor] = useState('transparent');
    const [buttonColor , setButtonColor] = useState('white');
    const divStyle = {
        height:"100%",
        display: "flex",
        alignItems:"center",
        cursor:"pointer"
    }
    const navBarStyle = {
        display:"flex",
        color:"white",
        position:"fixed",
        fontFamily:"sans-serif",
        width:"100%",
        zIndex:'10',
        height:"60px",
        // background:"none",
        backgroundColor:"rgba(16,16,16,0.7)",
    };
    const ulStyle = {
        display:"flex",
        listStyle:"none",
        listStyleType:"none",
        alignItems:"center",
        gap:"10px",
        height:"100%"
    }
    const liStyle = {
        display :"block",
        padding:"10px 20px",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center",
        gap:"10px",
        transition:"0.3s ease",
        border:"none",
        borderBottom:"2px solid transparent",
    }
    const buttonStyle = {
        display:"block",
        background:"none",
        backgroundColor:bgButtonColor,
        border:"1px solid white",
        color:buttonColor,
        padding:"12px 20px",
        outline:"none",
        marginRight:"20px",
        transition:"0.3s ease",
        cursor:"pointer"
    }
    const navOptionsStyle = {
        position:"absolute",
        display:"flex",
        gap:"10px",
        top:"0",
        right:"0"
    }
    const handleMouseEnter = (e)=>{
        setBgButtonColor('red');
        // setButtonColor('black');
    }
    const handleMouseLeave = (e)=>{
        setBgButtonColor('transparent');
        setButtonColor('white');
    }
    
  return (
    <>
    <div className={styles.navBlurObj}></div>
    <nav className={styles.navbar} style={navBarStyle}>
        <div className='navLogo' style={{...divStyle,marginLeft:"20px"}}>
            <Link href={{pathname:"/",}} style={{fontSize:"2em"}}>BlogPost</Link>
        </div>
        <div className='navOptions' style={{...divStyle , ...navOptionsStyle}}>
            <div className='navButtons' style={divStyle}>
                <ul className={styles.ulNavItem} style={ulStyle}>
                    <li><Link style={liStyle} href={{pathname:"/",}}>Home</Link></li>
                    <li><Link style={liStyle} href={{pathname:"/about",}}>About</Link></li>
                    <li><Link style={liStyle} href={{pathname:"/blogs",}}>Blogs</Link></li>
                </ul>
            </div>
            <div className='navLogin' style={divStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Link href={`/login`}>
                    <button style={buttonStyle}>Login</button>
                </Link>
            </div>
        </div>
    </nav>
    </>
  )
}
