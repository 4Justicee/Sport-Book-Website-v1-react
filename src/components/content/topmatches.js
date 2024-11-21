import React from 'react';  
import { getCountryCode } from '../../utils/otherUtils';
import { useSelector, useDispatch } from 'react-redux'; 

import OwlCarousel from 'react-owl-carousel'; 
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { updateCurrentBets } from '../../store/matchSlice';
import { toast } from 'react-toastify';

const options = {  		
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
    const dispatch = useDispatch();
    const currentBets = useSelector(state => state.match.currentBets);
    const bet_ids = currentBets.map((item)=>item.match_id+"-"+item.bet_id);

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
	let formattedDate = dateObj.toLocaleString('en-US', options);  
    let countryCodes = getCountryCode();
    let home_flag = (countryCodes[home_name] != undefined) ? <div className={`flag flag-${countryCodes[home_name]}`}></div> : <img src="/assets/img/logo/favicon.png" alt="flag"/>;
    let away_flag = (countryCodes[away_name] != undefined) ? <div className={`flag flag-${countryCodes[away_name]}`}></div> : <img src="/assets/img/logo/favicon.png" alt="flag"/>;
    
    const clickBetButton = (match, team_name, market_name, match_id, bet_id, odd, d1)=>{
        if(odd == -1) {
            toast.error('Can not place bet on this match!'); 
            return;
        }

        dispatch(updateCurrentBets({
            type:'prematch',
            match,
            team_name,
            market_name,
            match_id,
            bet_id,
            odd,
            d1
        }))
    }

    return (
        <div className="match__fixing__items">
            <div className="match__head">
                <div className="match__head__left">
                    <span className="icons">
                        <i className="icon-football"></i>
                    </span>
                    <span>
                        {league_name}
                    </span>
                </div>
                <span className="today">
                    {formattedDate}
                </span>
            </div>
            <div className="match__vs">
                <div className="match__vs__left">
                    <span style={{whiteSpace: "nowrap"}}>
                        {home_name}
                    </span>
                    {home_flag}
                </div>
                <span className="vs">
                    vs
                </span>
                <div className="match__vs__left">
                    {away_flag}
                    <span style={{whiteSpace: "nowrap"}}>
                        {away_name}
                    </span>
                </div>
            </div>
            <div className="match__result">
                <span className="matchborder"></span>
                <span className="match__text">
                    Match Result
                </span>
            </div>
            <ul className="match__point">
                <li className={`bet-btn ${bet_ids.includes(id+"-"+hid) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, home_name, 'Fulltime Result', id, hid, hwin, "")}>
                {hwin == -1 ? <><span className="point__1">1</span><i className="icon-lock"></i></>: <><span className="point__1">1</span><span>{hwin}</span></>}           
                </li>
                <li className={`bet-btn ${bet_ids.includes(id+"-"+did) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, "Draw", 'Fulltime Result', id, did, draw, "")} >
                {draw == -1 ? <><span className="point__1">X</span><i className="icon-lock"></i></>: <><span className="point__1">X</span><span>{draw}</span></>}
                </li>
                <li className={`bet-btn ${bet_ids.includes(id+"-"+aid) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, away_name, 'Fulltime Result', id, aid, awin, "")}>
                {awin == -1 ? <><span className="point__1">2</span><i className="icon-lock"></i></>: <><span className="point__1">2</span><span>{awin}</span></>}                  
                </li>
            </ul>
        </div>
    );
}); 

const TopMatch = () => {  
    const currentPrematch = useSelector(state => state.match.prematchData);
    
    return (  
        Object.keys(currentPrematch).length != 0 && <OwlCarousel className="match__fixing__wrap left__right__space owl-theme owl-carousel" {...owl} style={{paddingTop:"24px"}}>   
            {currentPrematch.tops != undefined && currentPrematch.tops.map((item, idx) => (  
                <Match key={idx} data={item}/>  
            ))}
        </OwlCarousel>
    );  
}  

export default TopMatch;