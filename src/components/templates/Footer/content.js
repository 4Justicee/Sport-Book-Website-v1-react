import React from 'react';  
import SponsorCarousel from '../../carousel/sponsor';
import FooterBottom from './bottom';
import FooterInfo from './info';

const ContentFooter = () => {  
    return (  
        <footer className="footer__section main__footer__section media991__pb60 pt-60">
            <div className="container-fluid p-0">
                <FooterInfo />
                <SponsorCarousel/>
                <FooterBottom />
            </div>
        </footer>
    );  
};  

export default ContentFooter;