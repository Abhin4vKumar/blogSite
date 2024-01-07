import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import {useDispatch , useSelector} from 'react-redux';
import { newBlog } from '@/src/actions/blogActions';
import { CLEAR_ERRORS, NEW_BLOG_RESET } from '@/src/constants/blogConstants';
import { useRouter } from 'next/router';

const New = () => {
  const [content , setContent] = useState();
  const [title , setTitle] = useState();
  const [description , setDescription] = useState();
  const alertObj = useAlert();
  const dispatch = useDispatch();
  const router = useRouter();
  const {isAuthenticated , user} = useSelector((state)=>state.user);
  const {error , success , loading , blog} = useSelector((state)=>state.newBlog);
  if(!loading){
    if(error){
      alertObj.error(error.message);
      dispatch({type:CLEAR_ERRORS});
    }
  }
  useEffect(()=>{
    if(!isAuthenticated){
        router.replace("/");
    }
    if(user.user){
      if(!user.user.verified){
        alertObj.error("Verify Account in order to POST a blog !");
        router.replace("/me");
      }
    }
  },[])
  useEffect(()=>{
    if(!loading){
      if(success){
        dispatch({type:NEW_BLOG_RESET});
        router.push(`/blog/${blog._id.toString()}`);
      }
    }
  },[blog])
  const handleChange = (e)=>{
    setContent(e.target.value);
  }
  const handleChangeTitle = (e)=>{
    setTitle(e.target.value);
  }
  const handleChangeDesc = (e)=>{
    setDescription(e.target.value);
  }
  function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(isEmpty(title)){
      alertObj.info("Please Enter Title !!");
      return;
    }
    if(isEmpty(description)){
      alertObj.info("Please Enter Description !!");
      return;
    }
    if(isEmpty(content)){
      alertObj.info("Please Enter Content !!");
      return;
    }
    dispatch(newBlog({name:title , desc:description , content}));
    
  }
  return (
    <>
      {loading?
        <div className='flex items-center justify-center'>Loading ...</div>
      :
        <>
          <div className='flex relative w-[100vw] h-[100vh] items-center justify-center'>
            <div className='flex relative w-[80%] mt-[60px] h-[80%] items-center flex-col justify-center border-2 border-gray-700'>
              <div className='flex items-center w-[100%] justify-center h-[20%] max-h-[100px]'>
                <h1 className='text-5xl'>Create New Blog !</h1>
              </div>
              <form style={{height:"calc(100% - 100px)"}} className='relative flex flex-col w-[100%] px-[20px] py-[20px] gap-[10px] border-t border-gray-700 min-h-[400px]'>
                <div className='flex flex-col relative w-[100%] h-fit'>
                <label for="message" className="block mb-2 text-sm font-medium text-white ">Title <i className='text-red-600'>*</i></label>
                <input type="text" id="message" onChange={handleChangeTitle} rows="4" className="block p-2.5 w-full text-sm text-white bg-transparent border border-gray-600 placeholder-gray-400 outline-none" placeholder="Write your thoughts here..." required/>
                </div>
                <div className='flex flex-col relative w-[100%] h-fit'>
                <label for="message" className="block mb-2 text-sm font-medium text-white ">Description <i className='text-red-600'>*</i></label>
                <input type="text" id="message" onChange={handleChangeDesc} rows="4" className="block p-2.5 w-full text-sm text-white bg-transparent border border-gray-600 placeholder-gray-400 outline-none" placeholder="Write your thoughts here..." required/>
                </div>
                <div className='flex flex-col relative w-[100%] h-[100%]'>
                <label for="message" className="block mb-2 text-sm font-medium text-white ">Content <i className='text-red-600'>*</i></label>
                <textarea id="message" onChange={handleChange} rows="4" className="h-[100%] block p-2.5 w-full text-sm text-white bg-transparent border border-gray-600 placeholder-gray-400 outline-none" placeholder="Write your thoughts here..." required></textarea>
                </div>
                <button className='transition-colors duration-300 bottom-[0px] border border-gray-700 right-[0px] hover:bg-purple-500 hover:text-black px-[20px] py-[10px]' type='submit' onClick={handleSubmit}>Post !</button>
              </form>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default New;