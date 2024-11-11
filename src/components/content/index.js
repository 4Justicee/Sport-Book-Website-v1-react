import React from 'react';  

import LiveContent from './live';
import PrematchContent from './prematch';
import TopMatch from './topmatches';
import DetailContent from './detail';
import ContentFooter from '../templates/Footer/content';

const MainContent = () => {  
   

    return (  
        <div className="tab-pane text-white fade show active " id="main_contents" role="tabpanel" tabIndex="0">            
            <TopMatch/>   

            <div className="main__body__wrap left__right__space">
                <LiveContent/>
                <PrematchContent />                              
            </div>               

            <DetailContent />
            <ContentFooter />
            
        </div>     
    );  
}  

export default MainContent;