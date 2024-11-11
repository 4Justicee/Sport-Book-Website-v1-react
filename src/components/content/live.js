import React from 'react';  
import ContentTitle from './title';
import ContentHeader from './contentheader';
import RealContent from './content';
const LiveContent = (props) => {  
    return (                      
        <div className="live__heightlight mb__30">
            <ContentTitle title="Live Highlights"/>
            <ContentHeader type="live"/>
            <RealContent type="live"/>
        </div> 
    );  
}  

export default LiveContent;