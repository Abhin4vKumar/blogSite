import React, { useEffect, useState } from 'react'
import Navbar from '@/src/navbar'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Footer from '@/src/footer'
import InfiniteScroll from 'react-infinite-scroll-component';
import Blog from '@/src/blog';

const inter = Inter({ subsets: ['latin'] })

export default function Blogs(){
  const [items,setItems] = useState([]);
  const [blogsCount,setBlogsCount] = useState(0);
  const [count , setCount] = useState(0);
  useEffect(()=>{
    fetchMoreData();
  },[])
  const fetchMoreData = async () => {
    try{
      const response = await fetch("http://localhost:4000/api/v1/allblogs");
      const data = await response.json();
      const {success , blogs , blogsCount,resultPerPage} = data;
      if(success){
        setBlogsCount(blogsCount);
        setItems(blogs.slice(0,count+5));
        setCount((prev)=>{
          return prev+5;
        });
      }else{
        console.error(data.message);
      }
    }catch (error){
      console.error(error);
    }
  };
  return (
    <>
        <Head>
        <title>Blogs</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div style={{display:"flex",flexDirection:"column"}}>
          <h1 style={{alignSelf:"center"}} className='text-8xl font-semibold font-mono mb-[50px]'>Blogs</h1>
          <InfiniteScroll style={{overflow:'unset'}}
                  dataLength={items.length}
                  next={fetchMoreData}
                  hasMore={count<blogsCount}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }} className='mt-[20px]'>
                      <b className='font-mono'>{blogsCount == 0 ? "No Blogs right now :( " : "Yay! You have seen it all"}</b>
                    </p>
                  }>
                  {items.map((i, index) => (
                    <Blog i={i} key={index}/>
                  ))}
          </InfiniteScroll>
        </div>
      </main>
    </>
  )
}
