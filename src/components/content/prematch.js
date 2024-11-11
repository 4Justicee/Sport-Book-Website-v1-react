import React from 'react';  
import ContentTitle from './title';
import ContentHeader from './contentheader';
import RealContent from './content';

const PrematchContent = () => {  
    return (  
        <div className="live__heightlight mb__30">
            <ContentTitle title="Next To Go"/>
            <ContentHeader type="prematch"/>
            <RealContent type="prematch"/>
        </div>     
    );  
}  

export default PrematchContent;