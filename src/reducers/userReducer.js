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
    EMAIL_REQUEST,
    VERIFY_REQUEST,
    EMAIL_SUCCESS,
    VERIFY_SUCCESS,
    EMAIL_FAIL,
    VERIFY_FAIL,
    CLEAR_STATE,
    VERIFY_RESET,
    EMAIL_RESET,
  } from "@/src/constants/userConstants";


  export const userReducer = (state ={user:{}} , action) =>{
    switch (action.type){
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                loading : true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user : action.payload,
            };
        case LOGOUT_SUCCESS:
            return {
                loading:false,
                user:null,
                isAuthenticated:false,
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload,
            };
        case LOGOUT_FAIL:
            return{
                ...state,
                error:null,
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

export const generalReducer = (state ={} , action) =>{
    switch (action.type){
        case EMAIL_REQUEST:
        case VERIFY_REQUEST:
            return{
                loading:true,
            }
        case EMAIL_SUCCESS:
            return{
                success:true,
                emailSent:true,
            }
        case VERIFY_SUCCESS:
            return{
                success:true,
                verified:true,
            }
        case EMAIL_FAIL:
            return{
                success:false,
                emailSent:false,
                error:action.payload
            }
        case VERIFY_FAIL:
            return{
                success:false,
                verified:false,
                error:action.payload
            }
        case VERIFY_RESET:
            return{
                ...state,
                verified:false,
            }
        case EMAIL_RESET:
            return{
                ...state,
                emailSent:false,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            };
        case CLEAR_STATE:
            return{};
        default:
            return state;
    }
};