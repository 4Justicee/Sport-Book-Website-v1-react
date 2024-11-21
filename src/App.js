import React, { useEffect } from 'react';  
import { BrowserRouter as Router } from 'react-router-dom';  
import Header from './components/templates/Header';  
import RouterConfig from './routes'; // Notice the import name change for clarity  
import { ToastContainer } from 'react-toastify';  
import { useDispatch } from 'react-redux';  
import { setToken } from './store/matchSlice';

import 'react-toastify/dist/ReactToastify.css';  
function App() {  
  const dispatch = useDispatch();  
  useEffect(() => {  
    const queryString = window.location.search;  
    const urlParams = new URLSearchParams(queryString);  
    const token = urlParams.get('token');  
    
    if (token) {  
      dispatch(setToken(token));  
    }  
  }, [dispatch]);  

  return (  
    <Router>  
      <div className="App">  
      <ToastContainer />  
        <Header />  
        <RouterConfig /> {/* Using the Routes configuration here */}          
      </div>  
    </Router>  
  );  
}  

export default App;