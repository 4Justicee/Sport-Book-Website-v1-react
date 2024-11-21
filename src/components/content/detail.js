import React, { useState } from 'react';  

import { useSelector, useDispatch } from 'react-redux'; 
import { sport_names, corner_image } from '../../utils/otherUtils';

const DetailContent = () => {  
    const [viewMode, setViewMode] = useState('All')
    const modes = ["All", "Main", "Asian_Lines", "Goals", "Half", "Minutes", "Others", "Specials"]

    const id = useSelector(state => state.match.detail_id);
    const type = useSelector(state => state.match.detail_type);
    const liveData = useSelector(state => state.match.liveData);
    const prematchData = useSelector(state => state.match.prematchData);
    const data = (type =="live") ? liveData.data : prematchData.data;
    let detailData = null;
    data.forEach((element, idx) => {
        if(element.id == id) {
            detailData = element;
        }
    });
    let title = '';
    let team1_str = "";
    let team2_str = "";
    let team1_scores = "";
    let team2_scores = "";
    let formattedDate = "";

    const bettings = ["main", "asian_lines", "goals", "half","minutes", "others", "specials"];
    //
    if(detailData != null) {
        const sports_name = sport_names[detailData.sport_id];
        let corner_home = 0, corner_away = 0;
        let ycard_home=0, ycard_away = 0;
        let rcard_home=0, rcard_away = 0;
        let goal_home=0, goal_away=0;

        const scores = detailData.scores;
        const passed_second = detailData.passed_second;
        const home_image = detailData.home_image_id;
	    const away_image = detailData.away_image_id;
        const matchTime = detailData.time_str;

	    const pass_time_str = Math.floor(passed_second / 60) + "' " + passed_second % 60;
        const dateObj = new Date(matchTime);  
	    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };  
        formattedDate = (type == "live") ? `Live | ${pass_time_str}`: dateObj.toLocaleString('en-US', options);  

        title =  `${sports_name} \/ ${detailData.league_name} \/ ${detailData.home_name} vs ${detailData.away_name}`;
        for(let i = 0; i < scores;i++) {
            if(scores[i].name == "ICorner") {
                corner_home = scores[i].score1;
                corner_away = scores[i].score2;
            }
            if(scores[i].name == "IYellowCard") {
                ycard_home = scores[i].score1;
                ycard_away = scores[i].score2;
            }
            if(scores[i].name == "IRedCard") {
                rcard_home = scores[i].score1;
                rcard_away = scores[i].score2;
            }
            if(scores[i].name == "IGoal") {
                goal_home = scores[i].score1;
                goal_away = scores[i].score2;
            }
        }

        team1_str = (home_image == 0) ? <><i className='icon-star'></i>{detailData.home_name}</>:<><img src={`https://assets.b365api.com/images/team/s/${home_image}.png`}/>{detailData.home_name}</>;
        team2_str = (away_image == 0) ? <><i className='icon-star'></i>{detailData.away_name}</>:<><img src={`https://assets.b365api.com/images/team/s/${away_image}.png`}/>${detailData.away_name}</>;
        team1_scores = <><div style={{minWidth:"12px"}} className='corner-home'>{corner_home}</div>
                            <div style={{minWidth:"12px"}} className='ycard-home'>{ycard_home}</div>
                            <div style={{minWidth:"12px"}} className='rcard-home'>{rcard_home}</div>
                            <div style={{minWidth:"14px"}} className='goal-home'>{goal_home}</div></>

        team2_scores = <><div style={{minWidth:"12px"}} className='corner-home'>{corner_away}</div>
                            <div style={{minWidth:"12px"}} className='ycard-home'>{ycard_away}</div>
                            <div style={{minWidth:"12px"}} className='rcard-home'>{rcard_away}</div>
                            <div style={{minWidth:"14px"}} className='goal-home'>{goal_away}</div></>

    }
    console.log(detailData)
    return (  
        detailData != null && <div id="detail_view_body" className="main__body__wrap left__right__space mt__30">
            <div className="live__heightlight mb__30">
                <div className="section__title" style={{display:"flex", justifyContent:"space-between"}}>
                    <h5>
                    {title}
                    </h5>
                    <img className='hand returnFromDetail' src="/assets/img/logo/return.png" width='24' style={{filter: "invert(1) brightness(0.6) !important"}}/>
                </div>	
            </div>
            <div className='b__bottom detail-head-item'>
				<div style={{color:"#09ff8d", fontWeight:"bold"}}>{formattedDate}</div>
				{type == "live" && <div className='flex-center'>
					<img style={{width:"12px"}} className="icon-dac43ecd499d0fefdaaa" alt="corner-flag" src={corner_image}></img>
					<div style={{width:"12px",backgroundColor:"#ffff00", height:"14px"}}></div>
					<div style={{width:"12px",backgroundColor:"#ff0000", height:"14px"}}></div>
					<i className='icon-football'></i>
				</div>}
			</div>
            <div className='b__bottom detail-head-item'>
				<div style={{display:"flex", gap:"5px"}}>{team1_str}</div>
				{type == "live" && <div className='flex-center'>{team1_scores}</div>}
			</div>
			<div className='b__bottom detail-head-item'>
				<div style={{display:"flex", gap:"5px"}}>{team2_str}</div>
				{type == "live" && <div className='flex-center'>{team2_scores}</div>}
			</div>
            {type == "prematch" && <div className="heightlight__tab nexttogo__tab">
                <div className="nav pt-20" id="nav-detail-odd" role="tablist">
                {
                    modes.map((item, idx)=>(
                        <button key={idx} className={`nav-link prematch-detail-nav ${viewMode == item?'active':''}`} data-bs-toggle="tab" data-bs-target="#minutes-odd-view-tab" type="button" role="tab" aria-selected="false" onClick={()=>setViewMode(item)}>
                            <span>
                                {item}
                            </span>
					    </button>
                    ))
                }
                </div>
            </div>}
            <div className="height__table" style={{marginTop:"1.5rem"}}>
				<div className="tab-content sidebar-livematch">
					<div className="accordion">
						{
                            
                        }
					</div>
				</div>
			</div>
        </div>
    );  
}  

export default DetailContent;