import React from 'react';  
import { Link } from 'react-router-dom';  
import './styles.css'; // Link to stylesheet for styling the header  

const Header = () => {  
    return (  
        <header className="main__tab__slide">
            <ul className="nav nav-tabs" id="myTabmain" role="tablist">
                <li className="nav-item" role="presentation">
                <button className="nav-link main-nav-button active" id="main-tab-home" type="button" role="tab"  aria-selected="true">
                    <span className="icons"><i className="icon-home"></i></span>
                    <span>Home</span>
                </button>
                </li>
                <li className="nav-item" role="presentation">
                <button className="nav-link main-nav-button " id="main-tab-live" type="button" role="tab"  aria-selected="false">
                    <span className="icons"><i className="icon-live"></i></span>
                    <span>Live</span>
                </button>
                </li>
                <li className="nav-item" role="presentation">
                <button className="nav-link main-nav-button " id="main-tab-today" type="button" role="tab"  aria-selected="false">
                    <span className="icons"><i className="icon-calender"></i></span>
                    <span>Today</span>
                </button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link main-nav-button " id="main-tab-league" type="button" role="tab"  aria-selected="false">
                    <span className="icons"><img src="/assets/img/sports/league.png" className="tab-png-item" width="20"/></span>
                    <span>League</span>
                    </button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link main-nav-button " id="main-tab-result" type="button" role="tab"  aria-selected="false">
                    <span className="icons"><img src="/assets/img/sports/result.png" className="tab-png-item" width="20"/></span>
                    <span>Match Result</span>
                    </button>
                </li>

                <li className="nav-item" role="presentation">
                    <button className="nav-link main-nav-button " id="main-tab-history" type="button" role="tab"  aria-selected="false">
                    <span className="icons"><img src="/assets/img/sports/history.png" className="tab-png-item" width="20"/></span>
                    <span>Betting History</span>
                    </button>
                </li>

                <li className="nav-item">
                    <div className="search-button">
                        <button className="nav-link" id="search">
                            <span className="icons"><i className="icon-search"></i></span>
                            <span>Search</span>
                        </button>
                        <div className="search-popup">
                        <div className="search-bg"></div>
                        <div className="search-form">
                            <form action="#">
                            <div className="form">
                                <input type="text" id="searchs" placeholder="Search Your Game" />
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </li>                             
            </ul>  
        </header>
    );  
};  

export default Header;