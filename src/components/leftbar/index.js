import React from 'react';  
import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { sendMessage } from '../../store/socket';
import { setPageInfo, setLastLSport, setLastPSport } from '../../store/matchSlice';

const PopularMatches = React.memo(({ name, src }) => {  
    return (
    <li className='hand'>
        <span><img src={src} alt="img" width="30" /></span>
        <span>{name}</span>
    </li>);  
});  

const Matches = React.memo(({ name, count, icon, png, sid, type }) => {  
    const token = useSelector(state => state.match.token)
    const dispatch = useDispatch()

    let elem = <i className={`icon-${icon}`}></i>;
    if(png == true) {
        elem = <img src={`/assets/img/sports/${icon}.png`} width='20' style={{filter:"invert(1) brightness(0.6) !important"}} />;
    }

    const loadSport = ()=>{
        dispatch(setPageInfo({
            page:'sport', 
            live:type=='live'?'on':'off', 
            prematch:type=='prematch'?'on':'off', 
            detail: "off",
            detail_id: 0,
            detail_type: "live",
        }))
        type == "live" ? dispatch(setLastLSport(sid)) : dispatch(setLastPSport(sid));
        
        sendMessage({
            token: token,
            page:'sport', 
            live:type=='live'?'on':'off', 
            lsport:type=='live'?sid:0, 
            prematch:type=='prematch'?'on':'off', 
            psport:type=='prematch'?sid:0, 
            detail_id:0, 
            data1:"1",
            data2:""
        });
    }
    
    return (
        <div className="accordion-item select-sport">
            <h2 className="accordion-header">
                <button className="accordion-button " type="button" onClick={()=>loadSport()}>
                    <span className="d-flex align-items-center gap-2 left-chokoboko">
                        <span className="mt-1">{elem}</span>
                        <span className="score text-white">{name}</span>
                    </span>
                    <span className="d-flex align-items-center gap-1 icon-rightfs10">{count}</span>
                </button>
            </h2>
        </div>);  
});  

const LeftBar = () => {  
    const games = useSelector(state => state.match.games); 
    const populars = useSelector(state => state.match.populars); 
    const [game, setGame] = useState('live');

    const showLive = ()=>{
        setGame('live')
    }

    const showPrematch = ()=>{
        setGame('prematch');
    }

    return (  
        <div className="popular__events__left display991 leftscroll-side">
            <div className="popular__events__head">
                <h5>
                    Popular events
                </h5>
                <ul>
                    {populars.map((item, idx) => (  
                        <PopularMatches key={idx} name={item.name} src={item.src} />  
                    ))} 
                </ul>
            </div>
            <div className="star__wrap" >
                <span className="hand"><img src="assets/img/leftmenu/start.png" alt="img"/></span>
                <span className="hand fav_matches">Favorites</span>
            </div>
            <div className="prematch__wrap">
                <div className="nav" id="nav-tabpre" role="tablist">
                    <button className={`nav-link ${game === 'live' ? 'active' : ''}`} onClick={showLive}>Live</button>
                    <button className={`nav-link ${game === 'prematch' ? 'active' : ''}`} onClick={showPrematch}>Prematch</button>
                </div>
                <div className="tab-content" id="nav-tabContentpre">
                    <div className={`tab-pane fade text-white ${game === 'live' ? 'show active' : ''}`}>
                        <div className="prematch__scopre this____parent__remove sidebar-livematch">
                            <div className="accordion" >
                            {games?.totalLive?.map((item, idx) => (  
                                <Matches key={idx} name={item.sport_name} count={item.total_count} icon={item.icon} png={item.png} sid={item.sport_id} type='live'/>  
                            ))} 
                            </div>
                        </div>
                    </div>
                    <div className={`tab-pane fade text-white ${game === 'prematch' ? 'show active' : ''}`}>
                        <div className="prematch__scopre this____parent__remove sidebar-livematch">
                            <div className="accordion">
                            {games?.totalPrematch?.map((item, idx) => (  
                                <Matches key={idx} name={item.sport_name} count={item.total_count} icon={item.icon} png={item.png} sid={item.sport_id} type='prematch'/>  
                            ))} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}  

export default LeftBar;