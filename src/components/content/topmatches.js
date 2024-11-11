import React from 'react';  
import { getCountryCode } from '../../utils/otherUtils';
import { useSelector, useDispatch } from 'react-redux'; 

import OwlCarousel from 'react-owl-carousel'; 
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';

let options = {  		
    year: 'numeric',   // numeric year  
    month: 'long',     // long name of month  
    day: 'numeric',    // numeric day of the month  
    hour: 'numeric',   // numeric hour  
    minute: 'numeric', // numeric minutes  
    timeZoneName: 'short' // short name of the time zone  
}; 

const owl = {
    loop: true,
    margin: 16,
    smartSpeed: 2500,
    autoplayTimeout: 3000,
    autoplay: false,
    nav: false,
    dots: false,
    responsiveClass: true,
    navText: [
      '<i className="fa-solid fa-angle-left"></i>',
      '<i className="fa-solid fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      767: {
        items: 2,
      },
      991: {
        items: 2,
      },
      1199: {
        items: 2,
      },
      1243: {
        items: 3,
      },
      1399: {
        items: 3,
      },
    },
};
const Match = React.memo(({ data }) => {    
    const {home_name, away_name, home_image_id, away_image_id, id, league_name, time_str, time, ss, is_fav, passed_second, data: odds, updated_at} = data;

    let hwin = -1, draw = -1, awin = -1,hid, did, aid;
    if(odds!= null && odds.main != undefined) {
        if(odds.main.sp.full_time_result != undefined) {
          hwin = odds.main.sp.full_time_result.odds[0].odds;
          hid = odds.main.sp.full_time_result.odds[0].id;
          draw = odds.main.sp.full_time_result.odds[1].odds;
          did = odds.main.sp.full_time_result.odds[1].id;
          awin = odds.main.sp.full_time_result.odds[2].odds;
          aid = odds.main.sp.full_time_result.odds[2].id;
        }   
    }
    let dateObj = new Date(time_str);  
	// Format the date to the local timezone  
	let formattedDate = dateObj.toLocaleString('en-US', options);  
    let countryCodes = getCountryCode();
    let home_flag = countryCodes[home_name] != undefined ? `<div class='flag flag-${countryCodes[home_name]}'></div>` : `<img src="/assets/img/logo/favicon.png" alt="flag">`;
    let away_flag = countryCodes[away_name] != undefined ? `<div class='flag flag-${countryCodes[away_name]}'></div>` : `<img src="/assets/img/logo/favicon.png" alt="flag">`;
    return (
        <div class="match__fixing__items">
            <div class="match__head">
                <div class="match__head__left">
                    <span class="icons">
                        <i class="icon-football"></i>
                    </span>
                    <span>
                        {league_name}
                    </span>
                </div>
                <span class="today">
                    {formattedDate}
                </span>
            </div>
            <div class="match__vs">
                <div class="match__vs__left">
                    <span style="white-space: nowrap;">
                        {home_name}
                    </span>
                    ${home_flag}
                </div>
                <span class="vs">
                    vs
                </span>
                <div class="match__vs__left">
                    {away_flag}
                    <span style="white-space: nowrap;">
                        {away_name}
                    </span>
                </div>
            </div>
            <div class="match__result">
                <span class="matchborder"></span>
                <span class="match__text">
                    Match Reult
                </span>
            </div>
            <ul class="match__point">
                <li class='bet-btn' groupNo="${d.id}" id='idt-${d.id}-${hid}' mid="${d.id}" n="Fulltime Result" t="${d.home_name}" o="${hwin}" d3="${d.home_name} vs ${d.away_name}">
                    <span>1</span>
                    <span class='homewin1'>{hwin}</span>
                </li>
                <li class='bet-btn' groupNo="${d.id}" id='idt-${d.id}-${did}' mid="${d.id}" n="Fulltime Result" t="Draw" o="${draw}" d3="${d.home_name} vs ${d.away_name}">
                    <span>x</span>
                    <span class='draw1'>{draw}</span>
                </li>
                <li class='bet-btn' groupNo="${d.id}" id='idt-${d.id}-${aid}' mid="${d.id}" n="Fulltime Result" t="${d.away_name}" o="${awin}" d3="${d.home_name} vs ${d.away_name}">
                    <span>2</span>
                    <span class='awaywin1'>{awin}</span>
                </li>
            </ul>
        </div>
    );
}); 

const TopMatch = () => {  
    const currentPrematch = useSelector(state => state.match.currentPrematch); 

    return (  
        <OwlCarousel className="match__fixing__wrap left__right__space owl-theme owl-carousel" {...owl} style={{paddingBottom:"24px"}}>   
            {currentPrematch?.tops != null && currentPrematch?.tops.map((item, idx) => (  
                <Match key={idx} data={item}/>  
            ))}
        </OwlCarousel>
    );  
}  

export default TopMatch;