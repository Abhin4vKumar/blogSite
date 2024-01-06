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
    BLOG_DETAILS_SUCCESS,
    NEW_BLOG_RESET,
    COMMENT_BLOG_RESET,
    DEL_COMMENT_BLOG_RESET,
    UPDATE_BLOG_RESET,
    DELETE_BLOG_RESET,
    UPVOTE_BLOG_RESET
} from "@/src/constants/blogConstants";
import { CLEAR_ERRORS } from "../constants/userConstants";


export const blogsReducer = (state = {blogs:[]} , action)=>{
    switch(action.type){
        case ALL_BLOG_REQUEST:
            return{
                loading:true,
                blogs:[],
            };
        case ALL_BLOG_SUCCESS:
            return {
                loading: false,
                blogs: action.payload.blogs,
                blogsCount:action.payload.blogsCount,
                resultPerPage:action.payload.resultPerPage,
            };
        case ALL_BLOG_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};

export const myBlogsReducer = (state = {blogs:[]} , action)=>{
    switch(action.type){
        case MY_BLOG_REQUEST:
            return{
                loading:true,
                blogs:[],
            };
        case MY_BLOG_SUCCESS:
            return {
                loading: false,
                blogs: action.payload.blogs,
                blogsCount:action.payload.blogsCount,
                resultPerPage:action.payload.resultPerPage,
            };
        case MY_BLOG_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};

export const newBlogReducer = (state = {blog: {}} , action)=>{
    switch (action.type){
        case NEW_BLOG_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case NEW_BLOG_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                blog : action.payload.blog,
            }
        case NEW_BLOG_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            };
        case NEW_BLOG_RESET:
            return {
                ...state,
                success:false,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};

export const blogReducer = (state = {} , action) =>{
    switch (action.type){
        case DELETE_BLOG_REQUEST:
        case UPDATE_BLOG_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case DELETE_BLOG_SUCCESS:
            return{
                ...state,
                loading: false,
                success:true,
                isDeleted: action.payload,
            };
        case UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                success:true,
                isUpdated: action.payload,
            };
        case DELETE_BLOG_RESET:
        case UPDATE_BLOG_RESET:
            return {
                ...state,
                success:false,
            };
        case DELETE_BLOG_FAIL:
        case UPDATE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null,
            };
        default:
            return state;
    }
};

export const blogDetailsReducer = (state = {blog:{}},action) =>{
    switch(action.type){
        case BLOG_DETAILS_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case BLOG_DETAILS_SUCCESS:
            return{
                loading: false,
                blog:action.payload,
            };
        case BLOG_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};


export const blogCommentReducer = (state = {blogCommentStatus : {}},action) =>{
    switch(action.type){
        case COMMENT_BLOG_REQUEST:
        case DEL_COMMENT_BLOG_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case COMMENT_BLOG_SUCCESS:
            return {
                loading:false,
                success:true,
                commentAdded: true,
            };
        case DEL_COMMENT_BLOG_SUCCESS:
            return{
                loading:false,
                success:true,
                commentDeleted: true,
            };
        case COMMENT_BLOG_RESET:
        case DEL_COMMENT_BLOG_RESET:
            return {
                ...state,
                success:false,
            };
        case COMMENT_BLOG_FAIL:
        case DEL_COMMENT_BLOG_FAIL:
            return{
                loading:false,
                error:action.payload,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        default:
            return state;
    }
};

export const blogVoteReducer = (state = {upVoteStatus:{}},action)=>{
    switch(action.type){
        case UPVOTE_BLOG_REQUEST:
            return{
                loading:true,
                ...state,
            };
        case UPVOTE_BLOG_SUCCESS:
            return{
                loading:false,
                success:true,
                upVoteChanged : true,
            };
        case UPVOTE_BLOG_RESET:
            return {
                ...state,
                success:false,
            };
        case UPVOTE_BLOG_FAIL:
            return{
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                loading:false,
                error:null,
            }
        default:
            return state;
    }
};