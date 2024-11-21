import React, { useEffect } from 'react';  
import ReactPaginate from 'react-paginate';  

import { useSelector, useDispatch } from 'react-redux'; 
import { get1X2, getMatchGoals, getHandicaps } from '../../utils/oddUtils';
import { formatSeconds } from '../../utils/dateUtils';
import { getStarOff, getStarOn } from '../../utils/otherUtils';
import { toast } from 'react-toastify';
import { updateCurrentBets, setDetailInfo } from '../../store/matchSlice';
import { sendMessage } from '../../store/socket';

const options = {   
    month: '2-digit',   
    day: '2-digit',   
    hour: '2-digit',   
    minute: '2-digit'
};  
  

const Match = React.memo(({ data, type }) => {
    const dispatch = useDispatch();
    const currentBets = useSelector(state => state.match.currentBets);
    const bet_ids = currentBets.map((item)=>item.match_id+"-"+item.bet_id);

    const {home_name, away_name, home_image_id, away_image_id, id, league_name, time_str, time, ss, is_fav, passed_second, data: odds, updated_at} = data;

    let hwin = -1, draw = -1, awin = -1, overodd = -1, goal = -1, underodd = -1; 
    let hid, did, aid, oid, uid, id1, id2;
    let hodd1 = -1, hodd2 = -1, handi1 = -1, handi2 = -1;
    let scores = "";
    let matchTime = "";
    if(type == 'prematch') {
        if(odds!= null && odds.main != undefined) {
            if(odds.main.sp.full_time_result != undefined) {
              hwin = odds.main.sp.full_time_result.odds[0].odds;
              hid = odds.main.sp.full_time_result.odds[0].id;
              draw = odds.main.sp.full_time_result.odds[1].odds;
              did = odds.main.sp.full_time_result.odds[1].id;
              awin = odds.main.sp.full_time_result.odds[2].odds;
              aid = odds.main.sp.full_time_result.odds[2].id;
            }
        
            if(odds.main.sp.goals_over_under != undefined) {
              overodd = odds.main.sp.goals_over_under.odds[0].odds;
              oid = odds.main.sp.goals_over_under.odds[0].id;
              underodd = odds.main.sp.goals_over_under.odds[1].odds;
              uid = odds.main.sp.goals_over_under.odds[1].id;
              goal = odds.main.sp.goals_over_under.odds[0].name;
            } 
        
            if(odds.main.sp.asian_handicap != undefined) {
              hodd1 = odds.main.sp.asian_handicap.odds[0].odds;
              id1 = odds.main.sp.asian_handicap.odds[0].id;
              hodd2 = odds.main.sp.asian_handicap.odds[1].odds;
              id2 = odds.main.sp.asian_handicap.odds[1].id;
        
              handi1 = odds.main.sp.asian_handicap.odds[0].handicap;
              handi2 = odds.main.sp.asian_handicap.odds[1].handicap;
            }
        }
    }
    else {
        const o1x2 = get1X2(odds, data.home_name, data.away_name);
        const go = getMatchGoals(odds);
        const handis = getHandicaps(odds, data.home_name, data.away_name);
        const elapse = updated_at - time < 0 ? 0 : updated_at - time;
        matchTime = formatSeconds(elapse);

        hwin = o1x2.hwin; draw = o1x2.draw; awin = o1x2.awin; hid = o1x2.hid; did = o1x2.did; aid = o1x2.aid;
        goal = go.goal; overodd = go.overodd; underodd = go.underodd; oid = go.oid; uid = go.uid;
        hodd1 = handis.h_odd; hodd2 = handis.a_odd; handi1 = handis.h_hand; handi2 = handis.a_hand; id1 = handis.id1; id2 = handis.id2;        
        
        scores = (ss == null) ? "0-0" : data['ss'];
    }

    const starElem = (is_fav == 0) ? <img className='star-off hand inplay_likestar' src={getStarOff()} width='24' d1="l"/>:<img className="hand inplay_removestar" src={getStarOn()} width='22'/>;
    const utcDate = new Date(time_str);  
    const localTimeString = utcDate.toLocaleString(undefined, options);

    const detailView = (match_id) => {
        dispatch(setDetailInfo({
            match_id,
            type,
            detail: 'on' ,
            page: 'detail'          
        }));
    }

    const clickBetButton = (match, team_name, market_name, match_id, bet_id, odd, d1)=>{
        if(odd == -1) {
            toast.error('Can not place bet on this match!'); 
            return;
        }

        dispatch(updateCurrentBets({
            type,
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
        <div className="table__items b__bottom" >
            <div className="t__items">
                <div className="t__items__left t__items__left__nextogo">
                    <div className="t__items__icon">
                        <i className="icon-tennis"></i>
                    </div>
                    <div className="content">
                        <h6 className=''>
                            {home_name}
                        </h6>
                        <span className="text">
                            {away_name}
                        </span>
                        {type == "live" && <p>
                            <a href="#0">
                                Live
                            </a>
                            <span className='time-view' style={{marginLeft:"4px"}}>
                                {matchTime}
                            </span>
                        </p>}
                    </div>
                </div>
            </div>
            {type == "live" &&<div className="cart__point">
              <span className='scores'>
                {scores}                 
                </span>
            </div>}
            <div className='start__box'>{starElem}</div>
            <div className="mart__point__two mart__pint__nextgo">
                <div className="mart__point__left">
                    <a href="#box" className={`point__box homewin bet-btn ${bet_ids.includes(id+"-"+hid) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, home_name, 'Fulltime Result', id, hid, hwin, "")} >
                    {hwin == -1 ? <i className="icon-lock"></i>: <><span className="point__1">1</span><span>{hwin}</span></>}                                
                    </a>
                    <a href="#box" className={`point__box draw bet-btn ${bet_ids.includes(id+"-"+did) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, "Draw", 'Fulltime Result', id, did, draw, "")} >
                        {draw == -1 ? <i className="icon-lock"></i>: <><span className="point__1">X</span><span>{draw}</span></>}
                    </a>
                    <a href="#box" className={`point__box awaywin bet-btn ${bet_ids.includes(id+"-"+aid) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, away_name, 'Fulltime Result', id, aid, awin, "")} >
                        {awin == -1 ? <i className="icon-lock"></i>: <><span className="point__1">2</span><span>{awin}</span></>}                  
                    </a>
                    <a href="#box" className={`point__box goalover bet-btn ${bet_ids.includes(id+"-"+oid) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, '', 'Match Goals', id, oid, overodd, "Over")} >
                        {goal == -1 ? <i className="icon-lock"></i>:<><span className="point__1">{goal}&nbsp;Over</span><span>{overodd}</span></>}                  
                    </a>
                    <a href="#box" className={`point__box goalunder bet-btn ${bet_ids.includes(id+"-"+uid) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, '', 'Match Goals', id, uid, underodd, "Under")} >
                        {goal == -1 ? <i className="icon-lock"></i>: <><span className="point__1">{goal}&nbsp;Under</span><span>{underodd}</span></>}                  
                    </a>
                    <a href="#box" className={`point__box hodd1 bet-btn ${bet_ids.includes(id+"-"+id1) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, home_name, 'Asian Handicap', id, id1, hodd1, handi1)}>
                        {hodd1 == -1 ? <i className="icon-lock"></i>: <><span className="point__1">{handi1}</span><span>{hodd1}</span></>}                  
                    </a>
                    <a href="#box" className={`point__box hodd2 bet-btn ${bet_ids.includes(id+"-"+id2) ? 'selected' : ''}`} onClick={()=>clickBetButton(`${home_name} vs ${away_name}`, away_name, 'Asian Handicap', id, id2, hodd2, handi2)}>
                        {hodd2 == -1 ? <i className="icon-lock"></i>: <><span className="point__1">{handi2}</span><span>{hodd2}</span></>}                  
                    </a>            
                </div>
                
                <div className="mart__point__right prematch_detail_view_btn hand" onClick={()=>detailView(id)}>                    
                    <a href="#min" className="point__box-text point__box__nextto">
                        {type == "prematch" &&<span className='timestr'>{localTimeString}</span> }
                        <span className='icon'><i className="fas fa-angle-right"></i></span>
                    </a>
                </div>
            </div>
        </div>);  
}); 

const RealContent = ({type}) => {      
    const token = useSelector(state => state.match.token)
    const liveData = useSelector(state => state.match.liveData);
    const prematchData = useSelector(state => state.match.prematchData); 
    const page = useSelector(state => state.match.page); 
    const lastLSport = useSelector(state => state.match.lastLSport); 
    const lastPSport = useSelector(state => state.match.lastPSport); 

    const data = type == "live" ? liveData.data: prematchData.data;
    const count = type == "live" ? liveData.count: prematchData.count;
    const [pageCount, setPageCount] = React.useState(0);  

    useEffect(()=>{
        const page = Math.ceil(count / 10);
        setPageCount(page)
    },[count])


    const handlePageClick = (data) => {  
        sendMessage({
            token: token,
            page:'sport', 
            live:type=='live'?'on':'off', 
            lsport:type=='live'?lastLSport:0, 
            prematch:type=='prematch'?'on':'off', 
            psport:type=='prematch'?lastPSport:0, 
            detail_id:0, 
            data1:data.selected+1,
            data2:""
        });
    };  

    return (  
        <div className="height__table">
            <div className="tab-content" id="nav-tabContentheight"> 
                <div className="tab-pane fade text-white show active">
                    <div className="main__table">
                        <div className="table__wrap">                                       
                        {data != null && data.map((item, idx) => (  
                        <Match key={idx} data={item} type={type}/>  
                        ))}    
                        </div>
                    </div>
                </div>
                {page != "home" && <div style={{marginTop:"1rem"}}>  
                    {/* Display your data */}  
                    <ReactPaginate  
                        previousLabel={'Previous'}  
                        nextLabel={'Next'}  
                        breakLabel={'...'}  
                        pageCount={pageCount}  
                        marginPagesDisplayed={2}  
                        pageRangeDisplayed={5}  
                        onPageChange={handlePageClick}  
                        containerClassName={'pagination'}  
                        activeClassName={'active'}  
                    />  
                </div> }
            </div>
        </div>   
    );  
}  

export default RealContent;