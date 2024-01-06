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
    const [items , setItems] = useState([]);
    const router = useRouter();
    const [count , setCount] = useState(0);
    const { slug } = router.query;
    const [blog , setBlog] = useState(null);
    const [loading , setLoading] = useState(true);
    const [comment , setComment] = useState("");
    const dispatch = useDispatch();
    const alertObj = useAlert();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch(cmnt(blog._id,{content:comment}));
    }
    const handleChange = (e)=>{
        setComment(e.target.value);
    }
    const handleUpVote = ()=>{
        dispatch(upVote(blog._id));
    }
    const handleDeleteBlog = ()=>{
        dispatch(deleteBlog(blog._id));
    }
    const handleDeleteComment = (e)=>{
        const data = e.target.getAttribute('data');
        dispatch(deleteComment(blog._id,data));
    }
    const commentState = useSelector((state)=>state.blogCommentStatus);
    const upVoteState = useSelector((state)=>state.blogVoteStatus);
    const blogChangeState = useSelector((state)=>state.blogChangeStatus);
    const blogState = useSelector((state)=>state.blogDetails);
    useEffect(()=>{
        if(slug){
            dispatch(getBlog(slug));
        }
    },[slug]);
    useEffect(()=>{
        try{
            if(!blogState.loading){
                if(blogState.blog){
                    if(blogState.blog.success){
                        setBlog(blogState.blog.blog);
                        setLoading(false);
                    }
                }
            }
        }catch(error){
            console.log(error);
        }
    },[blogState])
    useEffect(()=>{
        if(!commentState.loading){
            if(commentState.error){
                alertObj.error(commentState.error.message);
                dispatch({type:CLEAR_ERRORS});
            }if(commentState.success){
                if(commentState.commentAdded){
                    alertObj.info("Comment Added");
                    dispatch({type:COMMENT_BLOG_RESET});
                }else if(commentState.commentDeleted){
                    alertObj.info("Comment Deleted");
                    dispatch({type:DEL_COMMENT_BLOG_RESET});
                }
            }
        }
    },[commentState]);
    useEffect(()=>{
        if(!upVoteState.loading){
            if(upVoteState.error){
                alertObj.error(upVoteState.error.message);
                dispatch({type:CLEAR_ERRORS});
            }
            console.log(upVoteState);
            if(upVoteState.success){
                dispatch(getBlog(slug));
                alertObj.info("Operation Successful");
                dispatch({type:UPVOTE_BLOG_RESET});
            }
        }
    },[upVoteState]);
    useEffect(()=>{
        if(!blogChangeState.loading){
            if(blogChangeState.error){
                alertObj.error(blogChangeState.error.message);
                dispatch({type:CLEAR_ERRORS});
            }if(blogChangeState.success){
                if(blogChangeState.isDeleted){
                    alertObj.info("BLOG DELETED");
                    dispatch(getBlogs());
                    dispatch({type:DELETE_BLOG_RESET});
                    router.push("/blogs");
                }
            }
        }
    },[blogChangeState]);
    if(!loading){
        if(blogState.error){
            alertObj.error(blogState.error.message);
            dispatch({type:CLEAR_ERRORS});
            router.replace("/blogs");
        }
    }
    const fetchData = async()=>{
        try{
            dispatch(getBlog(slug));
            if(blogState.blog.success){
                setBlog(blogState.blog.blog);
                setItems(blogState.blog.blog.comments.slice(0,count+5));
                setCount((prev)=>{
                        return prev+5;
                    });
                setLoading(false);
            }
        }catch(error){
            console.log(error);
            router.reload();
        }
    }
    return (
        <>
        {loading ? <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}>Loading</div>:
        <>
            <Head>
                <title>{blog.name}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <div className="relative flex items-center justify-center w-[90vw] min-h-[90vh] gap-[20px] flex-col border border-gray-700 py-[50px]" >
                    <h1 className='text-5xl'>{blog.name}</h1>
                    <h3 className='text-slate-500' >By <Link href={"users/" + blog.user.userName}>{blog.user.userName}</Link></h3>
                    <p className={style2.para + " " + "text-justify"}>{blog.desc}</p>
                    <p className={style2.para + " " + "text-justify"}>{blog.content}</p>
                    <div className='absolute transition-colors duration-300 bottom-[0px] border-t border-l border-gray-700 right-[0px] hover:bg-purple-500 hover:text-black px-[20px] py-[20px] cursor-pointer flex items-center justify-center' onClick={handleDeleteBlog}><i className=''><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
</svg>

</i></div>
                    <div className='absolute transition-colors duration-300 bottom-[0px] border-t border-r border-gray-700 left-[0px] hover:bg-purple-500 hover:text-black px-[20px] py-[10px] cursor-pointer flex items-center justify-center gap-[5px]' onClick={handleUpVote}><i><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
</svg>
</i> : {blog.upVotes}</div>
                </div>
                <div className='flex py-[25px] pb-[5px] flex-col border border-gray-700 mt-[20px] h-fit w-[90vw]'>
                    <h1 className='text-3xl self-center'>Comments</h1>
                    <div className='flex flex-col w-[100%] px-[20px] py-[20px] gap-[10px] border-t border-gray-700 mt-[25px]'>
                    <InfiniteScroll style={{overflow:'unset'}}
                            dataLength={items.length}
                            next={fetchData}
                            hasMore={count<blog.comments.length}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }} className='mt-[20px]'>
                                <b className='font-mono'>{items.length == 0 ? "No Blogs right now :( " : "Yay! You have seen it all"}</b>
                                </p>
                            }>
                            {items.map((i, index) => (
                                <div className='flex flex-col w-[100%] px-[10px] gap-[10px] first:mt-[0px] mt-[15px] border-b pb-[10px] border-gray-700' key={index}>
                                    <h3 className='text-slate-500 flex gap-[10px]' >
                                        {i.user.userName}
                                        <i data={i._id} onClick={handleDeleteComment}  className='transform translate-y-[2.5px] hover:text-red-500 cursor-pointer'>
                                        <svg data={i._id} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
  <path data={i._id} fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
</svg>
                                        </i>
                                    </h3>
                                    <p className='break-words overflow-auto h-fit min-h-[20px]'>{i.content}</p>
                                </div>
                            ))}
                    </InfiniteScroll>
                    </div>
                </div>
                <div className='flex py-[25px] pb-[5px] flex-col border border-gray-700 mt-[20px] h-fit w-[90vw]'>
                <h1 className='text-3xl self-center'>Add Comment</h1>
                    <form className=' relative flex flex-col w-[100%] px-[20px] py-[20px] gap-[10px] border-t border-gray-700 mt-[25px]'>
                        <label for="message" class="block mb-2 text-sm font-medium text-white ">Your message</label>
                        <textarea id="message" onChange={handleChange} rows="4" class="block p-2.5 w-full text-sm text-white bg-transparent border border-gray-600 placeholder-gray-400 outline-none" placeholder="Write your thoughts here..."></textarea>
                        <button className='transition-colors duration-300 bottom-[0px] border border-gray-700 right-[0px] hover:bg-purple-500 hover:text-black px-[20px] py-[10px]' type='submit' onClick={handleSubmit}>submit</button>
                    </form>
                </div>
            </main>
        </>
        }
        </>
    )
};
 
export default slug;