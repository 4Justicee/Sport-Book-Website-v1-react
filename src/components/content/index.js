import React from 'react';  
import { useSelector } from 'react-redux'; 

import LiveContent from './live';
import PrematchContent from './prematch';
import TopMatch from './topmatches';
import DetailContent from './detail';
import ContentFooter from '../templates/Footer/content';

const MainContent = () => {  
    const page = useSelector(state => state.match.page);
    const live = useSelector(state => state.match.live);
    const prematch = useSelector(state => state.match.prematch);
    const detail = useSelector(state => state.match.detail);

    return (  
        <div className="tab-pane text-white fade show active " id="main_contents" role="tabpanel" tabIndex="0">            
            {page == "home" && <TopMatch/> }

            {detail == 'off' && <div className="main__body__wrap left__right__space" style={{paddingTop:'24px'}}>
                {live == "on" && <LiveContent/>}
                {prematch == "on" && <PrematchContent />}
            </div>}

            {detail == 'on' && <DetailContent /> }
            <ContentFooter />
            
        </div>     
    );  
}  

export default MainContent;