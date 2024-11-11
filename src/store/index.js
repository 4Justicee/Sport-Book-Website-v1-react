// store.js  
import { configureStore } from '@reduxjs/toolkit';  
import matchReducer from './matchSlice';  

const store= configureStore({  
  reducer: {  
    match: matchReducer,  
  },  
}); 

export default store; 
// src/index.js or where you set up the WebSocket  

