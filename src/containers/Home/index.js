import React from 'react';  
import './styles.css'; // Import local CSS for the Home component  
import Footer from '../../components/templates/Footer';  
import Betslip from '../../components/betslip';
import LeftBar from '../../components/leftbar';
import MainContent from '../../components/content';

const Home = () => {  
    return (  
        <div className="main__body__area">  
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xxl-10 col-xl-9 col-lg-9">
                        <div className="left__site__section">
                            <div className="tab-content" id="myTabContentmain">
                                <div className="popular__events__body">
                                    <div className="container-fluid p-0">
                                        <div className="row g-0">
                                            <div className="col-xxl-2 col-xl-3 col-lg-3">
                                                <LeftBar/>
                                            </div>
                                            <div className="col-xxl-10 col-xl-9 col-lg-9">
                                                <MainContent />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-3">
                        <Betslip />
                    </div>
                </div>
            </div>
            <Footer />
        </div>  
    );  
}  

export default Home;