import React from 'react';  
import ContentTitle from './title';
import ContentHeader from './contentheader';
import RealContent from './content';
import { useSelector } from 'react-redux';

const LiveContent = (props) => {  
    const page = useSelector(state => state.match.page);
    return (                      
        <div className="live__heightlight mb__30">
            <ContentTitle title="Live Highlights"/>
            {page != "sport" && <ContentHeader type="live"/>}
            <RealContent type="live"/>
        </div> 
    );  
}  

export default LiveContent;