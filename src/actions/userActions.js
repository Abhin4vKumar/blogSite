import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "@/src/constants/userConstants";
import Cookies from 'js-cookie';
import { baseURL , postOptions } from "../constants/configConstants";


export const login = (loginData)=> async(dispatch)=>{
    try{
        dispatch({type: LOGIN_REQUEST});
        let link = `/api/v1/login`;
        const res = await fetch(baseURL+link , {...postOptions , body:JSON.stringify(loginData)});
        const data = await res.json();

        if(data.success){
            Cookies.set('token' , data.token);
            dispatch({type: LOGIN_SUCCESS, payload:{user : data.user , success: data.success}});
        }else{
            dispatch({type: LOGIN_FAIL , payload : data});
        }
    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const logout = () => async(dispatch) =>{
    try{
        let link = `/api/v1/logout?token=${Cookies.get('token')}`;
        const res = await fetch(baseURL + link);
        const data = await res.json();
        if(data.success){
            Cookies.remove('token');
            dispatch({type: LOGOUT_SUCCESS , payload:data});
        }else{
            dispatch({type: LOGOUT_FAIL , payload:data});
        }
    }catch (error){
        dispatch({type: LOGOUT_FAIL , payload: error.response.data.message});
    }
}

export const register = (userData) => async(dispatch)=>{
    try{
        dispatch({
            type:REGISTER_USER_REQUEST
        });
        let link = '/api/v1/register';
        const res = await fetch(baseURL + link , {...postOptions , body:JSON.stringify(userData)});
        const data = await res.json();
        if(data.success){
            Cookies.set('token' , data.token);
            dispatch({type:REGISTER_USER_SUCCESS , payload:{user : data.user , success: data.success}});
        }else{
            dispatch({type:REGISTER_USER_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:REGISTER_USER_FAIL , payload:error.response.data.message});
    }
}

export const updateProfile = (userData) => async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        let link = ``;
        const res = await fetch(baseURL + link,{...postOptions , body:JSON.stringify(userData)});
        const data = await res.json();
        if(data.success){
            dispatch({type:UPDATE_PROFILE_SUCCESS , payload:data});
        }else{
            dispatch({type:UPDATE_PROFILE_FAIL , payload:data});
        }
    }catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL , payload:error.response.data.message});
    }
}