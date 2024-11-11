import { createSlice } from '@reduxjs/toolkit';  

const initialState = {  
  name: '',  
  email: '', 
  games: {},
  currentBets:[],
  messages:{},
  liveData:{},
  prematchData:{},
  currentLive: 1,
  currentPrematch: 1,
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

export const matchSlice = createSlice({  
  name: 'match',  
  initialState,  
  reducers: {  
    updateCurrentBets: (state, action) => {  
      
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
          state.games = msg;  
        }  
      }
      else if(msg.type =='live') {
        if (JSON.stringify(state.liveData) !== JSON.stringify(msg)) {  
          state.liveData = msg;  
        }  
      }
      else if(msg.type == 'prematch') {
        if (JSON.stringify(state.prematchData) !== JSON.stringify(msg)) {  
          state.prematchData = msg;  
        }  
      }      
  },
  },  
});  

export const { updateFromWebSocket, updateCurrentLive, updateCurrentPrematch, updateCurrentBets } = matchSlice.actions;  

export default matchSlice.reducer;