import React from 'react';  
import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { sendMessage } from '../../store/socket';
import { updateCurrentLive, updateCurrentPrematch } from '../../store/matchSlice';

const HeadButtons = React.memo(({ name, id, icon, type}) => {      
    const currentLive = useSelector(state => state.match.currentLive); 
    const currentPrematch = useSelector(state => state.match.currentPrematch); 
    const dispatch = useDispatch();
    const active=(type == 'live') ? currentLive == id : currentPrematch == id;

    const viewMatch = (id)=>{
        if(type == 'live') {
            dispatch(updateCurrentLive(id));
        }
        if(type == 'prematch') {
            dispatch(updateCurrentPrematch(id));
        }            
        console.log('need to implement send message');
    }
    

    return (
        <button className={`nav-link ${active==true ? 'active':''}`} id="lightlighttab" data-bs-toggle="tab" type="button" role="tab" aria-selected="true" onClick={()=>viewMatch(id)}>
            <span className="icons">
                <i className={`icon-${icon}`}></i>
            </span>
            <span>
                {name}
            </span>
        </button>);  
}); 

const ContentHeader = ({type}) => {  
    const topmatches = useSelector(state => state.match.topmatches); 
       
    return (  
        <div className="heightlight__tab">
            <div className="nav b__bottom" id="nav-tabheight" role="tablist">
                {topmatches.map((item, idx) => (  
                        <HeadButtons key={idx} name={item.name} id={item.id} icon={item.icon} type={type}/>  
                ))}                 
            </div>
        </div>    
    );  
}  

export default ContentHeader;