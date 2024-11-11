import React from 'react';  
import { Route, Routes } from 'react-router-dom';  
import Home from '../containers/Home';  
import Aboute from '../containers/About';  
import NotFoundPage from '../containers/404';  

const RouterConfig  = () => {  
    return (  
        <Routes>  
            <Route exact path="/" element={<Home />} />  
            <Route path="/about" element={<Aboute />} />  
            <Route path="*" element={<NotFoundPage />} />  {/* Fallback for no-matches */}  
        </Routes>  
    );  
}  

export default RouterConfig ;  