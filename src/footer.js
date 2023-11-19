import React, { Fragment } from 'react'

const Footer = () => {
    const footerStyleObj = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#101010',
        paddingLeft:'50px',
        paddingRight:'50px',
        color:'white',
        fontFamily:'sans-serif',
        width:'100%',
        height:'200px'
    }
    const copyrightSectionStyle={
        display:'flex',
        width:'100%',
        alignItems:'Center',
        justifyContent:'Center',
        textAlign:'Center',
        color:'#101010',
        fontFamily:'sans-serif',
        height:'30px',
        backgroundColor:'#FFC300'
    }
  return (
    <Fragment>
        <div style={footerStyleObj}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div style={copyrightSectionStyle}>BlogPost © Since 2023</div>
    </Fragment>
  )
}

export default Footer