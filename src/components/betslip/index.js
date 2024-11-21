import React, { useState } from 'react';  
import { useSelector, useDispatch } from 'react-redux'; 
import { updateCurrentBets, placeBet, serverUrl, setCurrentStake } from '../../store/matchSlice';
import { toast } from 'react-toastify';

const Text2Number = (text)=>{
    const v = (Number)(text);
    return isNaN(v) ? 0 : v;
}

const BetItem = React.memo(({ data, type, handleStakeChange, handleWinChange }) => {
    const dispatch = useDispatch()

    const [stake, setStake] = useState(''); 
    const [win, setWin] = useState(''); 

    const match_name = data.match;
    const team_name = data.team_name;
    const market_name = data.market_name;
    const match_id = data.match_id;
    const odd = data.odd;
    const bet_id = data.bet_id;
    const d1 = data.d1;
    const d2 = data.d2;

    const removeBetItem = ()=> {
        dispatch(updateCurrentBets({
            bet_id,
            market_name,
            match_id,
            match: match_name,
            odd,
            d1,
            team_name
        }))
    }

    const handleInputStake = (event) => {       
        let val = Text2Number(event.target.value);
        handleStakeChange(val, stake);  
        setStake(val);

        dispatch(setCurrentStake({bet_id, match_id,stake:val}))

        let tmpWin = Text2Number(Math.round(val * odd * 1000) / 1000);
        if(handleWinChange) {
            handleWinChange(tmpWin, win);          
        }

        setWin(tmpWin);        
    } 

    const handleInputWin = (event) => {  
        let val = Text2Number(event.target.value);       
        handleWinChange(val, win);  
        setWin(val);

        let tmpStake = Text2Number(Math.round(val / odd * 1000) / 1000);
        if(handleStakeChange) {
            handleStakeChange(tmpStake, stake);
        }

        setStake(tmpStake);
        dispatch(setCurrentStake({bet_id, match_id,stake:tmpStake}))
    } 

    let infoStr = ``;
	const appendToString = (item, infoStr)=> {  
		if (item !== "undefined" && item !== undefined && item.trim().length != 0) {  
			if (infoStr.length > 0) {  
				infoStr += "  ";  
			}  
			infoStr += item;  
		}  
		return infoStr;
	}  
	
	infoStr = appendToString(team_name, infoStr);  
	infoStr = appendToString(d1, infoStr);  
	infoStr = appendToString(d2, infoStr);  

    return (
        <div className="multiple__items">
			<div className="multiple__head">
				<div className="multiple__left">
					<span className="icons">
						<i className="icon-football"></i>
					</span>
					<span>
						{match_name}
					</span>
				</div>
				<a href="#0" className="cros remove-bet-item" onClick={removeBetItem}>
					<i className="icon-cross"></i>
				</a>
			</div>
			<div className="multiple__point">
				<span className="pbox">
					{odd}
				</span>
				<span className="rightname">
					<span className="fc">
						{infoStr}
					</span>
					<span className="point">
						{market_name}
					</span>
				</span>
			</div>
			{type=='single' && <div className="wrapper" style={{marginTop:"1rem"}}>
				<div className="result" style={{display:"flex",padding:0}}>
					<input type="text" className='input-stake stake-edit' placeholder="stake" value={stake} onChange={handleInputStake}/>
					<input type="text" className='input-win stake-edit' placeholder="win" value={win} onChange={handleInputWin}/>
				</div>
			</div>}
		</div>
    )
}); 

const SingleBet = () => {
    const dispatch = useDispatch()
    const currentBets = useSelector(state => state.match.currentBets)
    const [totalStake, setTotalStake] = useState(0)
    const [totalWin, setTotalWin] = useState(0)
    const [totalPayout, setTotalPayout] = useState(0)

    const placeSingleBet = ()=> {
        if(currentBets.length == 0) {
            toast.error('Select odds first.'); 
            return;
        }
        if(totalStake == 0) {
            toast.error('Input stake.'); 
            return;
        }
        dispatch(placeBet({
            url: serverUrl + "/api/place_single_bet",
            betType:'single',
            totalStake,
            totalOdd: 0,
        }))
    }
    
    const handleStakeChange = (currentValue, previousValue) => {  
        setTotalStake(Math.round((totalStake + currentValue - previousValue)*100)/100);  
    };  

    const handleWinChange = (currentValue, previousValue) => {  
        setTotalWin(Math.round((totalWin + currentValue - previousValue)*100)/100);  
    }; 

    return (
        currentBets.length == 0 ? 
        <div className="multiple__components" style={{minHeight:"200px"}}>
            <div className='empty empty-box-1'>There are no bets on your ticket</div>
            <div className='empty empty-box-2'>Click the odds to add a bet</div>
        </div>:
        <div className="multiple__components" style={{minHeight:"200px"}}>
            {currentBets.map((item, idx) => (  
                <BetItem key={idx} data={item} type='single' handleStakeChange={handleStakeChange} handleWinChange={handleWinChange}/>  
            ))}
            <div className="total__odds">
                <div className="total__head">
                    <h6 className="odd">
                        Total Stake
                    </h6>
                    <span id='total_stake'>
                        {totalStake}
                    </span>
                </div>
                <div className="total__head">
                    <h6 className="odd">
                        Total Win
                    </h6>
                    <span id='total_win'>
                        {totalWin}
                    </span>
                </div>
                <div className="total__head">
                    <h6 className="odd">
                        Total Payout
                    </h6>
                    <span id='total_payout'>
                        {totalPayout}
                    </span>
                </div>                                            
            </div> 
            <a href="#0" className="cmn--btn2 btn-bet" onClick={placeSingleBet}>
                <span>Bet</span>
            </a>
        </div>
    )
}

const MutipleBet = () => {
    const dispatch = useDispatch()
    const currentBets = useSelector(state => state.match.currentBets)

    const [totalStake, setTotalStake] = useState(0)
    const [totalWin, setTotalWin] = useState(0)
    const [totalPayout, setTotalPayout] = useState(0)
    
    let total = 1;
    currentBets.forEach(element => {
        total *= element.odd;
    });
    total = Math.round(total * 1000) / 1000;
    
    const placeMultipleBet = ()=>{
        if(currentBets.length == 0) {
            toast.error('Select odds first.'); 
            return;
        }
        if(totalStake == 0) {
            toast.error('Input stake.'); 
            return;
        }
        dispatch(placeBet({
            url: serverUrl + "/api/place_multiple_bet",
            betType:'multiple',
            totalStake,
            totalOdd: total,
        }))
    }

    const handleStakeChange = (event) => {  
        let val = Text2Number(event.target.value);       
        setTotalStake(val);  

        let tmpWin = Text2Number(Math.round(val * total * 1000) / 1000);
        setTotalWin(tmpWin);        
    };  

    const handleWinChange = (event) => {  
        let val = Text2Number(event.target.value);       
        setTotalWin(val);  

        let tmpStake = Text2Number(Math.round(val / total * 1000) / 1000);
        setTotalStake(tmpStake);
    };

    return (
        currentBets.length == 0 ?
        <div className="multiple__components" style={{minHeight:"200px"}}>
            <div className='empty empty-box-1'>There are no bets on your ticket</div>
            <div className='empty empty-box-2'>Click the odds to add a bet</div>
        </div>:
        <div className="multiple__components" style={{minHeight:"200px"}}>
            {currentBets.map((item, idx) => (  
                <BetItem key={idx} data={item} type='multiple'/>  
            ))}
            <div className="total__odds">
                <div className="total__head">
                    <h6 className="odd">
                        Total Odd
                    </h6>
                    <span id='total_odd'>
                        {total}
                    </span>
                </div>
                <div className="wrapper" style={{marginTop:"1rem", marginBottom:"1rem"}}>
                    <div className="result" style={{display:"flex",padding:0}}>
                        <input type="text" id='minput-stake' className='stake-edit' placeholder="stake" value={totalStake} onChange={handleStakeChange}/>
                        <input type="text" id='minput-win' className='stake-edit' placeholder="win" value={totalWin}  onChange={handleWinChange}/>
                    </div>
                </div>
                <div className="total__head">
                    <h6 className="odd">
                        Total Stake
                    </h6>
                    <span id='mtotal_stake'>
                        {totalStake}
                    </span>
                </div>
                <div className="total__head">
                    <h6 className="odd">
                        Total Win
                    </h6>
                    <span id='mtotal_win'>
                        {totalWin}
                    </span>
                </div>
                <div className="total__head">
                    <h6 className="odd">
                        Total Payout
                    </h6>
                    <span id='mtotal_payout'>
                        {totalPayout}
                    </span>
                </div>                                            
            </div>                                        
            <a href="#" className="cmn--btn2 btn-bet" onClick={placeMultipleBet}>
                <span>Bet</span>
            </a>
        </div>        
    )
}

const Betslip = () => {      
    const dispatch = useDispatch()
    const [status, setStatus] = useState('single')       
    
    const singleTab = ()=>{
        setStatus('single')
    }
    const multiTab = () => {
        setStatus('multiple')
    }
    const removeAllBet = ()=> {
        dispatch(updateCurrentBets([]));
    }

    return (  
        <div className="right__site__section display991">
            <div className="betslip__wrap">
                <h5 className="betslip__title">
                    Betslip&nbsp;&nbsp;<i className="fa fa-trash hand" onClick={removeAllBet}></i>
                </h5>
                
                <div className="nav" id="nav-taboo" role="tablist">
                    <button className={`nav-link ${status=='single'?'active':''}`} onClick={singleTab}>Single</button>
                    <button className={`nav-link ${status=='multiple'?'active':''}`} onClick={multiTab}>Multiple</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab"  aria-selected="false"></button>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className={`tab-pane fade text-white ${status=='single'?'show active':''}`} id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                        <SingleBet />                              
                        
                    </div>
                    <div className={`tab-pane fade text-white ${status=='multiple'?'show active':''}`} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                        <MutipleBet/>
                    </div>                              
                </div>
            </div>
        </div>
    );  
}  

export default Betslip;