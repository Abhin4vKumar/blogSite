import {
    ALL_BLOG_FAIL,
    ALL_BLOG_REQUEST,
    ALL_BLOG_SUCCESS,
    MY_BLOG_FAIL,
    MY_BLOG_REQUEST,
    MY_BLOG_SUCCESS,
    NEW_BLOG_FAIL,
    NEW_BLOG_REQUEST,
    NEW_BLOG_SUCCESS,
    UPDATE_BLOG_FAIL,
    UPDATE_BLOG_REQUEST,
    UPDATE_BLOG_SUCCESS,
    DELETE_BLOG_REQUEST,
    DELETE_BLOG_FAIL,
    DELETE_BLOG_SUCCESS,
    UPVOTE_BLOG_REQUEST,
    UPVOTE_BLOG_FAIL,
    COMMENT_BLOG_REQUEST,
    COMMENT_BLOG_SUCCESS,
    COMMENT_BLOG_FAIL,
    DEL_COMMENT_BLOG_REQUEST,
    DEL_COMMENT_BLOG_SUCCESS,
    DEL_COMMENT_BLOG_FAIL,
    UPVOTE_BLOG_SUCCESS,
    BLOG_DETAILS_FAIL,
    BLOG_DETAILS_REQUEST,
    BLOG_DETAILS_SUCCESS
} from "@/src/constants/blogConstants";

import { baseURL , postOptions } from "../constants/configConstants";

export const getBlogs = (keyword = "",currentPage = 1)=> async(dispatch)=>{
    try{
        dispatch({type: ALL_BLOG_REQUEST});
        let link = `/api/v1/allblogs?keyword=${keyword}&page=${currentPage}`;

        const res = await fetch(baseURL+link);
        const data = await res.json();

        if(data.success){
            dispatch({type: ALL_BLOG_SUCCESS, payload:data});
        }else{
            dispatch({type: ALL_BLOG_FAIL , payload : data});
        }
    }catch(error){
        dispatch({
            type:ALL_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getMyBlogs = () => async(dispatch) =>{
    try{
        dispatch({type:MY_BLOG_REQUEST});
        let link = `/api/v1/myblogs`;
        const res = await fetch(baseURL + link);
        const data = await res.json();

        if(data.success){
            dispatch({type: MY_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type: MY_BLOG_FAIL , payload:data});
        }
    }catch (error){
        dispatch({type: MY_BLOG_FAIL , payload: error.response.data.message});
    }
}

export const newBlog = (blogData) => async(dispatch)=>{
    try{
        dispatch({
            type:NEW_BLOG_REQUEST
        });
        let link = '/api/v1/blog/new';
        const res = await fetch(baseURL + link , {...postOptions , body:JSON.stringify(blogData)});
        const data = await res.json();
        if(data.success){
            dispatch({type:NEW_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type:NEW_BLOG_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:NEW_BLOG_FAIL , payload:error.response.data.message});
    }
}

export const getBlog = (id) => async(dispatch)=>{
    try{
        dispatch({type:BLOG_DETAILS_REQUEST});
        let link = `/api/v1/blog/${id}`;
        const res = await fetch(baseURL + link);
        const data = await res.json();
        if(data.success){
            dispatch({type:BLOG_DETAILS_SUCCESS , payload:data});
        }else{
            dispatch({type:BLOG_DETAILS_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:BLOG_DETAILS_FAIL , payload:error.response.data.message});
    }
}


export const updateBlog = (id,blogData) => async(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_BLOG_REQUEST
        });
        let link = `/api/v1/blog/update/${id}`;
        const res = await fetch(baseURL + link , {...postOptions , body:JSON.stringify(blogData)});
        const data = await res.json();
        if(data.success){
            dispatch({type:UPDATE_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type:UPDATE_BLOG_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:UPDATE_BLOG_FAIL , payload:error.response.data.message});
    }
}

export const deleteBlog = (id) => async(dispatch)=>{
    try{
        dispatch({
            type:DELETE_BLOG_REQUEST
        });
        let link = `/api/v1/blog/delete/${id}`;
        const res = await fetch(baseURL + link);
        const data = await res.json();
        if(data.success){
            dispatch({type:DELETE_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type:DELETE_BLOG_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:DELETE_BLOG_FAIL , payload:error.response.data.message});
    }
}


export const upVote = (id) => async(dispatch)=>{
    try{
        dispatch({
            type:UPVOTE_BLOG_REQUEST
        });
        let link = `/api/v1/blog/up/${id}`;
        const res = await fetch(baseURL + link);
        const data = await res.json();
        if(data.success){
            dispatch({type:UPVOTE_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type:UPVOTE_BLOG_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:UPVOTE_BLOG_FAIL , payload:error.response.data.message});
    }
}


export const comment = (id,blogData) => async(dispatch)=>{
    try{
        dispatch({
            type:COMMENT_BLOG_REQUEST
        });
        let link = `/api/v1/blog/comment/${id}`;
        const res = await fetch(baseURL + link , {...postOptions , body:JSON.stringify(blogData)});
        const data = await res.json();
        if(data.success){
            dispatch({type:COMMENT_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type:COMMENT_BLOG_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:COMMENT_BLOG_FAIL , payload:error.response.data.message});
    }
}

export const deleteComment = (id,cid)=> async(dispatch)=>{
    try{
        dispatch({
            type:DEL_COMMENT_BLOG_REQUEST
        });
        let link = `/api/v1/blog/comment/del/${id}/${cid}`;
        const res = await fetch(baseURL + link);
        const data = await res.json();
        if(data.success){
            dispatch({type:DEL_COMMENT_BLOG_SUCCESS , payload:data});
        }else{
            dispatch({type:DEL_COMMENT_BLOG_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:DEL_COMMENT_BLOG_FAIL , payload:error.response.data.message});
    }
}