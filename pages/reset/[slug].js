import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import style2 from '@/styles/About.module.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAlert } from 'react-alert';
import {useDispatch , useSelector} from "react-redux";
import { getBlog, getBlogs } from '@/src/actions/blogActions';
import { CLEAR_ERRORS, COMMENT_BLOG_RESET, DELETE_BLOG_RESET, DEL_COMMENT_BLOG_RESET, UPVOTE_BLOG_RESET } from '@/src/constants/blogConstants';
import { upVote , comment as cmnt , deleteComment , deleteBlog} from '@/src/actions/blogActions';

const inter = Inter({ subsets: ['latin'] })
const slug = () => {
    const router = useRouter();
    const { slug } = router.query;
    const dispatch = useDispatch();
    const alertObj = useAlert();
    function isEmpty(value) {
        return (value == null || (typeof value === "string" && value.trim().length === 0));
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(isEmpty(pass)){
            alertObj.error("Please Enter Password !");
        }
        if(isEmpty(pass)){
            alertObj.error("Please Enter Confirm Password !");
        }
        if(pass != cpass){
            alertObj.error("Passwords are different !");
        }
        if(pass == cpass){
            // dispatch();
        }
    }
    const [pass,setPass] = useState();
    const [cpass,setCPass] = useState();
    const handlePchange = (e)=>{
        setPass(e.target.value);
    }
    const handleCPchange = (e)=>{
        setCPass(e.target.value);
    }
    const userState = useSelector((state)=>{state.user});
    useEffect(()=>{
        if(userState){
            if(!userState.loading){
                if(userState.isAuthenticated){
                    router.replace('/');
                }
                if(userState.error){
                    alertObj.error(userState.error);
                    dispatch({CLEAR_ERRORS});
                }
            }
        }
    },[userState]);
    return (<>
        <div className='flex items-center justify-center h-fit'>
            <div className='mt-[100px] flex flex-col h-fit items-center justify-center'>
                <h1 style={{alignSelf:"center"}} className='text-8xl text-center font-semibold font-mono mb-[50px]'>Reset Password</h1>
                <form style={{height:"calc(100% - 100px)"}} className='relative flex flex-col w-[100%] px-[20px] py-[20px] gap-[10px] min-h-[400px]'>
                    <label for="message" className="block mb-2 text-sm font-medium text-white ">Password <i className='text-red-600'>*</i></label>
                    <input type='text' onChange={handlePchange} className="block p-2.5 w-full text-sm text-white bg-transparent border border-gray-600 placeholder-gray-400 outline-none"/>
                    <label for="message" className="block mb-2 text-sm font-medium text-white ">Confirm Password <i className='text-red-600'>*</i></label>
                    <input type='text'  onChange={handleCPchange} className="block p-2.5 w-full text-sm text-white bg-transparent border border-gray-600 placeholder-gray-400 outline-none"/>
                    <button type='submit' className='transition-colors duration-300 bottom-[0px] border border-gray-700 right-[0px] hover:bg-purple-500 hover:text-black px-[20px] py-[10px]' onClick={handleSubmit}>Reset</button>
                </form>
            </div>
        </div>
    </>)
};
 
export default slug;