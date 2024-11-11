import React from 'react';  

const Footer = () => {  
    return (  
        <ul className="footer__menu d-lg-none">
            <li>
                <a href="sportsbetting.html" className="d-grid justify-content-center">
                   <span><i className="fas fa-table-tennis"></i></span>
                    <span className="texta">Sports</span>
                </a>
            </li>
            <li>
                <a href="#0" className="d-grid justify-content-center" data-bs-toggle="modal" data-bs-target="#eventsp">
                   <span><i className="fa-solid fa-gift"></i></span>
                    <span className="texta">Events</span>
                </a>
            </li>
            <li className="header-bartwo d-lg-none">
                <span className="bars"><i className="fas fa-bars"></i></span>
                <span className="cros"> <i className="fa-solid fa-xmark"></i></span>
            </li> 
            <li>
                <a href="#0" className="d-grid justify-content-center" data-bs-toggle="modal" data-bs-target="#betsp">
                   <span> <i className="fas fa-ticket-alt"></i></span>
                    <span className="texta">My Bet</span>
                </a>
            </li>
            <li>
                <a href="dashboard.html" className="d-grid justify-content-center">
                   <span> <i className="far fa-user-circle"></i></span>
                    <span className="texta"> Account</span>
                </a>
            </li>
        </ul>
    );  
};  

export default Footer;