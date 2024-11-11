import React from 'react';  

const Betslip = () => {  
    return (  
        <div className="right__site__section display991">
            <div className="betslip__wrap">
                <h5 className="betslip__title">
                    Betslip&nbsp;&nbsp;<i className="fa fa-trash" style={{cursor:"pointer"}} id="remove_all_bets"></i>
                </h5>
                
                <div className="nav" id="nav-taboo" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Single</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Multiple</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab"  aria-selected="false"></button>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade text-white show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                        <div className="multiple__components" id="single_bets_view" style={{minHeight:"200px"}}>
                            <div className='empty empty-box-1'>There are no bets on your ticket</div>
                            <div className='empty empty-box-2'>Click the odds to add a bet</div>
                        </div>                                    
                    </div>
                    <div className="tab-pane fade text-white " id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                        <div className="multiple__components" id="multiple_bets_view" style={{minHeight:"200px"}}>
                            <div className='empty empty-box-1'>There are no bets on your ticket</div>
                            <div className='empty empty-box-2'>Click the odds to add a bet</div>
                        </div>
                    </div>                              
                </div>
            </div>
        </div>
    );  
}  

export default Betslip;