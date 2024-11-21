import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  
import axios from 'axios';  
import { toast } from 'react-toastify';

export const serverUrl = "http://127.0.0.1:9996"

const initialState = {  
  name: '',  
  email: '', 
  games: {},
  currentBets:[],
  messages:{},
  liveData:{},
  prematchData:{},
  token: null,
  currentLive: 1,   //use only for tab
  currentPrematch: 1,
  lastLSport :1,  //used for pagination
  lastPSport:1,
  page: 'home',
  live: 'on',
  prematch: 'on',
  detail:'off',
  detail_id: 0,
  detail_type: 'live',
  populars: [
    {name:'World Cup 2026', src:'/assets/img/leftmenu/cup.png'},
    {name:'UEFA Champions League', src:'/assets/img/logo/uefa.png'},
    {name:'England Premier League', src:'/assets/img/logo/primera.png'},
    {name:'Spain La Liga', src:'/assets/img/logo/laliga.png'},
    {name:'UEFA Europa League', src:'/assets/img/logo/uefa.png'},
  ],
  topmatches: [
    {name:"Football", id:1, icon:"football"},
    {name:"Tennis", id:3, icon:"tennis"},
    {name:"Basketball", id:13,icon:"basketball"},
    {name:"Volleyball", id:91, icon:"volly"},
    {name:"Cricket", id:92, icon:"cricket"},
    {name:"Table Tennis", id:18, icon:"ttennis"},
    {name:"Base Ball", id:16, icon:"baseball"},
  ]
};  

export const placeBet = createAsyncThunk('match/placeBet', async ({ url, totalStake, betType, totalOdd }, { getState, rejectWithValue }) => {  
  try {  
    const state = getState();
    const data = {
      data: state.match.currentBets,
      totalStake,
      totalOdd,
      token: state.match.token
    }
    for(let i =0; i < state.match.currentBets.length; i++) {
      if(betType == 'single') {
        if(state.match.currentBets[i].stake == null || state.match.currentBets[i].stake == undefined) {
          toast.error("Stake error.");
          return;    
        }
      }
    }
    if(totalStake == 0) {
      toast.error("Stake error.");
      return;    
    }

    const response = await axios.post(url, data);  // Changed to POST to handle sending data 
    if(response.data.status == -2) {
      toast.error("Duplicated Request.");
    } 
    if(response.data.status == -1) {
      toast.error("Odd mistmatch error.");
    }
    if(response.data.status == 1) {
      toast.info("Successfully place bet");
    }
    return response.data;  
  } catch (error) {  
    return rejectWithValue(error.response.data);  
  }  
}); 

export const matchSlice = createSlice({  
  name: 'match',  
  initialState,  
  reducers: {  
    updateCurrentBets: (state, action) => {        
      const newObj = [];
      let exist = 0;
      console.log(action.payload);
      if(action.payload.length == 0) {
        state.currentBets = [];
        return;
      }
      for(let i = 0; i < state.currentBets.length; i++) {
        if(state.currentBets[i].bet_id == action.payload.bet_id) {
          exist = 1;
          continue;
        }
        if(!(state.currentBets[i].match_id == action.payload.match_id && state.currentBets[i].market_name == action.payload.market_name)) {
          newObj.push(state.currentBets[i]);
        }
      }
      exist == 0 && newObj.push(action.payload);
      state.currentBets = JSON.parse(JSON.stringify(newObj));      
    },
    updateCurrentLive: (state, action) => {  
      state.currentLive = action.payload;  
    },
    updateCurrentPrematch: (state, action) => {  
      state.currentPrematch = action.payload;  
    },
    updateFromWebSocket: (state, action) => {  
      //state.messages = action.payload;
      const msg = action.payload;

      if(msg.type =='game_count') {
        // Check if newOdds contain different data from state.odds  
        if (JSON.stringify(state.games) !== JSON.stringify(msg)) {  
          return {  
            ...state,  
            games: msg  
          };  
        }  
      }
      else if(msg.type =='live') {
        if (JSON.stringify(state.liveData) !== JSON.stringify(msg)) {  
          return {  
            ...state,  
            liveData: msg  
          };  
        }  
      }
      else if(msg.type == 'prematch') {        
        if (JSON.stringify(state.prematchData) !== JSON.stringify(msg)) {  
          return {  
            ...state,  
            prematchData: msg  
          };  
        }  
      }      
    },
    setCurrentStake: (state, action) => {  
      const bet_id = action.payload.bet_id;  
      const match_id = action.payload.match_id;  
      const stake = action.payload.stake;  

      for(let i = 0; i < state.currentBets.length; i++) {
        if(state.currentBets[i].bet_id == bet_id && state.currentBets[i].match_id == match_id) {
          state.currentBets[i].stake = stake;
          break;
        }
      }
    },
    setToken: (state, action) => {  
      state.token = action.payload;  
    },  
    setPageInfo: (state, action) => {  
      state.page = action.payload.page;  
      state.live = action.payload.live;  
      state.prematch = action.payload.prematch;  

      state.detail = action.payload.detail;  
      state.detail_id = action.payload.detail_id;  
      state.detail_type = action.payload.detail_type;  
    },  
    setLastLSport: (state, action) => {  
      state.lastLSport = action.payload;  
    },
    setLastPSport: (state, action) => {  
      state.lastPSport = action.payload;  
    },
    setDetailInfo: (state, action) => {  
      state.detail_id = action.payload.match_id;  
      state.detail_type = action.payload.type;  
      state.detail = action.payload.detail;  
      state.page = action.payload.page;  
    },
  },  
  extraReducers: (builder) => {  
    // builder.addCase(fetchUserData.fulfilled, (state, action) => {  
    //   state.status = 'succeeded';  
    //   state.userData = action.payload;  
    // });  
  }  
});  

export const { updateFromWebSocket, updateCurrentLive, updateCurrentPrematch, updateCurrentBets, setToken, setCurrentStake, setPageInfo, setLastLSport, setLastPSport, setDetailInfo } = matchSlice.actions;  

export default matchSlice.reducer;