import React from 'react';  
import { BrowserRouter as Router } from 'react-router-dom';  
import Header from './components/templates/Header';  
import RouterConfig from './routes'; // Notice the import name change for clarity  
function App() {  
  return (  
    <Router>  
      <div className="App">  
        <Header />  
        <RouterConfig /> {/* Using the Routes configuration here */}          
      </div>  
    </Router>  
  );  
}  

export default App;