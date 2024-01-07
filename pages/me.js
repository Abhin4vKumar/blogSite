import { logout , loadUser} from '@/src/actions/userActions';
import React, { useEffect, useState } from 'react'
import {useDispatch , useSelector} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAlert } from 'react-alert';
import Blog from '@/src/blog';
import { getMyBlogs } from '@/src/actions/blogActions';
import { CLEAR_ERRORS } from '@/src/constants/blogConstants';
import { useRouter } from 'next/router';
import Link from 'next/link';

const New = () => {
    const [items,setItems] = useState([]);
    const [blogsCount,setBlogsCount] = useState(0);
    const [count , setCount] = useState(0);
    const dispatch = useDispatch();
    const alertObj = useAlert();
    const router = useRouter();
    const {loading , isAuthenticated , user} = useSelector((state)=>state.user);
    const [section , setSection] = useState(0);
    useEffect(()=>{
        fetchMoreData();
        if(!isAuthenticated && !loading){
            router.replace("/");
        }
        dispatch(loadUser());
      },[])
    useEffect(()=>{
        if(!isAuthenticated && !loading){
            router.replace("/");
        }
    },[isAuthenticated , loading , user]);
    const blogState = useSelector((state) => state.myBlogs);
    if(blogState.error){
        alertObj.error(blogState.error.message);
        dispatch({type:CLEAR_ERRORS});
    }
    const fetchMoreData = async () => {
        try{
            dispatch(getMyBlogs());
            setItems(blogState.blogs);
            setCount((prev)=>{return prev+5});
            setBlogsCount(blogState.blogs.length);
        }catch(error){
            // alertObj.error(error.message);
            dispatch(getMyBlogs());
        }
    };
    const handleLogout = ()=>{
        dispatch(logout());
    }
    const profileClick = ()=>{
        setSection(0);
    }
    const myBlogsClick = ()=>{
        setSection(1);
    }
  return (
    <>
    {loading || blogState.loading?<div className='w-[100vw] h-[100vh] flex items-center justify-center' >Loading ...</div>:
      <div className='flex relative w-[100vw] h-[100vh] items-center justify-center'>
        <div className='flex relative pt-[60px] h-[100%] w-[100%]'>
            <div className='bg-purple-700 flex flex-col items-center justify-center w-[200px] max-w-[20vw] h-[100%]'>
                <div className={'py-[20px] w-[100%] transition-all duration-300 cursor-pointer text-center hover:bg-slate-900' + " " + (section==0 ? "bg-zinc-900" : "")} onClick={profileClick} >Profile</div>
                <div className={'py-[20px] w-[100%] transition-all duration-300 cursor-pointer text-center hover:bg-slate-900' + " " + (section==1 ? "bg-zinc-900" : "")} onClick={myBlogsClick} >My Blogs</div>
                {isAuthenticated && !user.user.verified?

                    <Link className='py-[20px] bg-red-600 w-[100%] transition-all duration-300 cursor-pointer text-center hover:bg-slate-900' href={"/verify"}>Verify Email !</Link>
                :<></>
                }
                <Link className='py-[20px] w-[100%] transition-all duration-300 cursor-pointer text-center hover:bg-slate-900' href={"/logout"}>Logout</Link>
            </div>
            <div style={{width:"calc(100% - 200px)"}} className='flex items-center justify-center min-w-[80vw]'>
                {section == 1?
                    <div style={{height:"calc(100vh - 100px)"}} className='flex flex-col w-[80%] pb-[20px] px-[20px] mt-[60px]  overflow-auto' >
                        <h1 style={{alignSelf:"center"}} className='text-8xl font-semibold font-mono mb-[50px]'>My Blogs</h1>
                        
                        {items.map((i, index) => (
                        <Blog i={i} key={index}/>
                        ))}
                        <p style={{ textAlign: 'center' }} className='mt-[20px]'>
                            <b className='font-mono'>{blogsCount == 0 ? "No Blogs right now :( " : "Yay! You have seen it all"}</b>
                        </p>
                  </div>
                :
                    <div className='w-[80%] h-[80%] border-gray-700 border-2 flex flex-col items-center justify-center gap-10'>
                        <div>
                            <label className='text-2xl'>Name : </label>
                            <label className='text-2xl'>{user.user.name}</label>
                        </div>
                        <div>
                            <label className='text-2xl'>Username : </label>
                            <label className='text-2xl'>{user.user.userName}</label>
                        </div>
                        <div>
                            <label className='text-2xl'>E-mail : </label>
                            <label className='text-2xl'>{user.user.email}</label>
                        </div>
                        <div>
                            <label className='text-2xl'>Verification Status : </label>
                            <label className='text-2xl'>{user.user.verified ? "Verified" : "Pending"}</label>
                        </div>
                    </div>
                }
            </div>
        </div>
      </div>
    }
    </>
  )
}

export default New;