import {configureStore} from '@reduxjs/toolkit';
import appApi from './services/appApi';
import userSlice from './features/userSlice';

//presist our store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist'
import thunk from 'redux-thunk';

//reducer

const reducer = combineReducers({
    user : userSlice,
    [appApi.reducerPath] : appApi.reducer,
})

const presistConfig = {
    key : "root",
    storage,
    blackList : [appApi.reducerPath],
};

//persist our store
const persistedReducer = persistReducer(presistConfig, reducer)

const store = configureStore({
    reducer : persistedReducer,
    middleware : [thunk, appApi.middleware],
})

export default store;