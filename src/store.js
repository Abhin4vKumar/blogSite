import {createStore , combineReducers , applyMiddleware } from "redux";
import * as reduxthunk from "redux-thunk";
import {
    newBlogReducer,
    blogsReducer,
    blogReducer,
    myBlogsReducer,
    blogDetailsReducer,
    blogCommentReducer,
    blogVoteReducer
} from "@/src/reducers/blogReducer";

import {
    userReducer,
} from "@/src/reducers/userReducer";

import { composeWithDevTools } from "redux-devtools-extension";

import {persistStore , persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key:'main-root',
    storage,
}

const reducer = combineReducers({
    blogs:blogsReducer,
    blogDetails:blogDetailsReducer,
    user:userReducer,
    newBlog: newBlogReducer,
    blogChangeStatus:blogReducer,
    myBlogs: myBlogsReducer,
    blogCommentStatus : blogCommentReducer,
    blogVoteStatus : blogVoteReducer
})

const persistedReducer = persistReducer(persistConfig , reducer);

let initialState = {

};

const middleware = [reduxthunk.thunk];

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

const Persistor = persistStore(store);
export {Persistor};
export default store;