// store.js  

import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';  
import matchReducer from './matchSlice';  

const store= configureStore({  
  reducer: {  
    match: matchReducer,  
  },  
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), 
}); 

export default store; 
// src/index.js or where you set up the WebSocket  

