const topSports = [1, 3, 13, 91, 92, 18, 16]; //Top sports
let searchKey = "";
let pageNumber = 1;

toastr.options = {  
	"positionClass": "toast-bottom-left", // Position in the bottom-left corner  
	"timeOut": "5000", // Duration to display the toast  
	"closeButton": true, // Enable close button  
	"progressBar": true // Enable progress bar  
};  

const sport_names={
    1:"Soccer", 
    13:"Tennis",
    78:"Handball",
    2: "Horse Racing",
    17:"Ice Hockey",
    12:"American footbal",
    83: "Futsal",
    92: "Table Tennis",
    8: "Rugby Union",
    36: "Australian Rules",
    9 :"Boxing",
    90: "Floorball",
    110: "Water Polo",
    151: "E-Sports",
    148: "Surfing",
    18:"Basketball",
    91:"Volleyball",
    16:"Baseball",
    4: "Greyhounds",
    14:"Snooker",
    3:"Cricket",
    15:"Darts",
    94:"Badminton",
    19: "Rugby League",
    66:"Bowls",
    75:"Gaelic Sports",
    95:"Beach Volleyball",
    107: "Squash",
    162: "MMA"
}

const cornerImage = `<img style='width:12px' src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjlweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgOSAxMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8dGl0bGU+NURBNjNGRDEtQUE4Qi00OTYyLUJENzAtMTQzNDQwRDk2MTJFQDF4PC90aXRsZT4NCiAgICA8ZyBpZD0iTGl2ZS1TY29yZWJvYXJkcyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxnIGlkPSIwNi41X2RhcmtNb2RlX21vYmlsZV9ETVNCIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUxLjAwMDAwMCwgLTE0NS4wMDAwMDApIj4NCiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0xNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEwMC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMTQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1MS4wMDAwMDAsIDM1LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDEwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTUiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEwIj48L3JlY3Q+DQogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRkZGRkZGIiB4PSIwIiB5PSIwIiB3aWR0aD0iOS4wMDMwMzA1NSIgaGVpZ2h0PSI2LjY2NjY2NjY3Ij48L3JlY3Q+DQogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLUNvcHktOSIgZmlsbD0iIzMzNEU2QSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi4zNDA5MDksIDIuMDgzMzMzKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC02LjM0MDkwOSwgLTIuMDgzMzMzKSAiIHg9IjQuNSIgeT0iMC44MzMzMzMzMzMiIHdpZHRoPSIzLjY4MTgxODE4IiBoZWlnaHQ9IjIuNSI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTEwIiBmaWxsPSIjMzM0RTZBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyLjY1OTA5MSwgNC41ODMzMzMpIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTIuNjU5MDkxLCAtNC41ODMzMzMpICIgeD0iMC44MTgxODE4MTgiIHk9IjMuMzMzMzMzMzMiIHdpZHRoPSIzLjY4MTgxODE4IiBoZWlnaHQ9IjIuNSI+PC9yZWN0Pg0KICAgICAgICAgICAgICAgICAgICA8L2c+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+DQo=" class="icon-dac43ecd499d0fefdaaa" alt="corner-flag">`;

let prematchDetailMode = 'all';

$(document).ready(function(){  

$("#main_contents").delegate("#show_all_live","click", function(e) {
	const b = $(this).hasClass("showAll");
	if(b == false) {
		$(`#main_contents .table__items`).css("display","flex");
		$(this).addClass("showAll");
		$(this).html(`<span>Show less</span><span class="icons"><i class="fas fa-chevron-up"></i></span>`);
	}
	else {
		$(this).removeClass("showAll")
		$("#main_contents .table__items:nth-child(n+7)").css("display","none");  
		$(this).html(`<span>Show more</span><span class="icons"><i class="fas fa-chevron-down"></i></span>`);
	}
	//$(this).css("display", "none");
})

$("#main_contents").delegate(".inplay_removestar","click", function(e) {	
	const tid = $(this).attr("tid");
	$(this).attr("src",starOffCode);
	$(this).removeClass("inplay_removestar").addClass("inplay_likestar");
	$(this).addClass("star-off");

	$.ajax({  
		url: '/api/remove_fav',  
		type: 'POST',  
		data: {
			tid,
			type: 'inplay',
		},  
		success: function(response) {  
			// Use the callback to pass the data to the DataTable  
			toastr.info("Removed successfully.");
		},  
		error: function(jqXHR, textStatus, errorThrown) {  
		}  
	});  
});

$("#main_contents").delegate(".inplay_likestar","click", function(e) {	
	const tid = $(this).attr("tid");
	const data = $(this).attr("data");
	const d1 = $(this).attr("d1");

	$(this).attr("src",starOnCode);
	$(this).removeClass("inplay_likestar").addClass("inplay_removestar");
	$(this).removeClass("star-off");

	$.ajax({  
		url: '/api/register_fav',  
		type: 'POST',  
		data: {
			tid,
			type: d1 == "l" ? 'inplay' : 'upcoming',
			token,
			data,
			d1,
		},  
		success: function(response) {  
			// Use the callback to pass the data to the DataTable  
			toastr.info("Registered successfully.");
		},  
		error: function(jqXHR, textStatus, errorThrown) {  
		}  
	});  
});

$("#main_contents").delegate(".inplay_detail_view_btn","click", function(e) {	
	const id = $(this).attr("tid");
	const from = $(this).attr("from");
	sessionStorage.setItem('goback', from);

	const d = JSON.parse(from == "home" ? sessionStorage.getItem('live_data') : sessionStorage.getItem('sport_live_data'));
	const data = (from == "home") ? d.data : d;

	let o = null;
	for(i = 0; i < data.length; i++) {
		if(data[i].id == id) {
			o = data[i];
			break;
		}
	}
	if(o == null) {
		toastr.error("Invalid match");
		return;
	}

	const sid = o.sport_id;
	const sports_name = sport_names[sid];
	const title = `${sports_name} \/ ${o.league_name} \/ ${o.home_name} vs ${o.away_name}`;
	const date = new Date(o.time_str);  
	const home_image = o.home_image_id;
	const away_image = o.away_image_id;
	const scores = o.scores;
	const names = o.names;
	const passed_second = o.passed_second;
	const pass_time_str = Math.floor(passed_second / 60) + "' " + passed_second % 60;
	if(Object.keys(o.data).length == 0){
		return;
	}

	
	$("#main_contents>div").fadeOut();//css("display","none");

	let order = true;
	if(o.home_name != names.names1) {
		order = false;
	}
	let corner_home = 0, corner_away = 0;
	let ycard_home=0, ycard_away = 0;
	let rcard_home=0, rcard_away = 0;
	let goal_home=0, goal_away=0;
	for(let i = 0; i < scores;i++) {
		if(scores[i].name == "ICorner") {
			corner_home = order ? scores[i].score1 : scores[i].score2;
			corner_away = order ? scores[i].score2 : scores[i].score1;
		}
		if(scores[i].name == "IYellowCard") {
			ycard_home = order ? scores[i].score1 : scores[i].score2;
			ycard_away = order ? scores[i].score2 : scores[i].score1;
		}
		if(scores[i].name == "IRedCard") {
			rcard_home = order ? scores[i].score1 : scores[i].score2;
			rcard_away = order ? scores[i].score2 : scores[i].score1;
		}
		if(scores[i].name == "IGoal") {
			goal_home = order ? scores[i].score1 : scores[i].score2;
			goal_away = order ? scores[i].score2 : scores[i].score1;
		}
	}

	const team1_str = (home_image == 0) ? `<i class='icon-star'></i>${o.home_name}`:`<img src='https://assets.b365api.com/images/team/s/${home_image}.png'/>${o.home_name}`;
	const team2_str = (away_image == 0) ? `<i class='icon-star'></i>${o.away_name}`:`<img src='https://assets.b365api.com/images/team/s/${away_image}.png'/>${o.away_name}`;
	const team1_scores = `<div style='min-width:12px' class='corner-home'>${corner_home}</div><div style='min-width:12px' class='ycard-home'>${ycard_home}</div><div style='min-width:12px' class='rcard-home'>${rcard_home}</div><div style='min-width:14px' class='goal-home'>${goal_home}</div>`;
	const team2_scores = `<div style='min-width:12px' class='corner-away'>${corner_away}</div><div style='min-width:12px' class='ycard-away'>${ycard_away}</div><div style='min-width:12px' class='rcard-away'>${rcard_away}</div><div style='min-width:14px' class='goal-away'>${goal_away}</div>`;

	let accordionElems = '';
	for(let i = 0; i < o.data.length; i++) {
		const item = o.data[i];
		const odds = item.odds;

		let bettingItem = '';
		if(odds.length == 3) {
			for(let j = 0; j < odds.length; j++) {
				const n = odds[j].name;
				const h = odds[j].header;
				const v = odds[j].odds;
				const oid = odds[j].id;
				const t = h == undefined ? n : n+", "+h;
				bettingItem += `<div class="col-md-4 col-sm-4">
					<div style='display:flex; justify-content:space-between; padding: 10px' class='bet-btn' id='idl-${id}-${oid}-l' groupNo="${i}" mid="${id}" t="${item.name}" d1="${n}" d2="${h}" o="${v}" d3="${o.home_name} vs ${o.away_name}">
						<span>${v == "NaN" ? '<i class="icon-lock"></i>':t}</span>
						<span>${v == "NaN" ? '<i class="icon-lock"></i>':v}</span>
					</div>
				</div>`;
			}			
		}
		else {
			for(let j = 0; j < odds.length; j++) {
				const n = odds[j].name;
				const h = odds[j].header;
				const v = odds[j].odds;
				const t = h == undefined ? n : n+", "+h;
				const oid = odds[j].id;
				let n1 = "";
				if(odds.length == 2) {
					n1 = j == 0 ? o.home_name : o.away_name;
				}
				bettingItem += `<div class="col-md-6 col-sm-6">
					<div style='display:flex; justify-content:space-between; padding: 10px' class='bet-btn' id='idl-${id}-${oid}-l' groupNo="${i}" t="${item.name}" mid="${id}" n="${n1}" d1="${n}" d2="${h}" o="${v}" d3="${o.home_name} vs ${o.away_name}">
						<span>${v == "NaN" ? '<i class="icon-lock"></i>':t}</span>
						<span>${v == "NaN" ? '<i class="icon-lock"></i>':v}</span>
					</div>
				</div>`;
			}
		}

		accordionElems += `<div class="accordion-item">
			<h2 class="accordion-header" id="headingOne${i}">
				<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#odd-${id}-${i}" aria-expanded="true" aria-controls="odd-${id}-${i}">
				<span class="d-flex align-items-center gap-2 left-chokoboko">
					<span class="mt-1"><i class="icon-football"></i></span>
					<span class="score text-white">
						${item.name}
					</span>
				</span>
				<span class="d-flex align-items-center gap-1 icon-rightfs10">
					<i class="fa-solid fa-chevron-down"></i>
				</span>
				</button>
			</h2>
			<div id="odd-${id}-${i}" class="accordion-collapse collapse show" aria-labelledby="headingOne${i}">
				<div class="accordion-body">
					<div class="row g-0">
                        ${bettingItem}
					</div>
				</div>
			</div>
		</div>`;
	}
	// Options for formatting  
	const options = {  
		weekday: 'long',  
		year: 'numeric',  
		month: 'long',  
		day: 'numeric',  
		hour: '2-digit',  
		minute: '2-digit',  
		hour12: false,  
	};  

	// Convert to local time and format  
	const localeDateString = `Live | ${pass_time_str}`//date.toLocaleString('en-US', options);  
	
	
	$("#detail_view_body").append(`
		<div class="live__heightlight mb__30">
			<div class="section__title" style="display:flex; justify-content:space-between">
				<h5>
					${title}
				</h5>
				<img class='hand returnFromDetail' src="/assets/img/logo/return.png" width='24' style="filter: invert(1) brightness(0.6) !important;"/>
			</div>
			<div class='b__bottom' style='margin-left:2rem; padding:10px 0px; justify-content:space-between; display:flex'>
				<div style='color:#09ff8d; font-weight:bold'>${localeDateString}</div>
				<div style='display:flex;gap:1rem;align-items:center;'>
					${cornerImage}
					<div style='width:12px;background-color:#ffff00; height:14px'></div>
					<div style='width:12px;background-color:#ff0000; height:14px'></div>
					<i class='icon-football'></i>
				</div>
			</div>
			<div class='b__bottom' style='margin-left:2rem; padding:10px 0px; justify-content:space-between; display:flex'>
				<div style='display:flex; gap:5px'>${team1_str}</div>
				<div style='display:flex;gap:1rem;align-items:center;'>${team1_scores}</div>
			</div>
			<div class='b__bottom' style='margin-left:2rem;padding:10px 0px; justify-content:space-between; display:flex'>
				<div style='display:flex; gap:5px'>${team2_str}</div>
				<div style='display:flex;gap:1rem;align-items:center;'>${team2_scores}</div>
			</div>			
			<div class="height__table" style='margin-top:1.5rem'>
				<div class="tab-content sidebar-livematch">
					<div class="accordion">
						${accordionElems}
					</div>
				</div>
			</div>
		</div>`);
	$("#detail_view_body").attr("gid", id);
	$("#detail_view_body").fadeIn();//.css("display", "block");

});

$("#main_contents").on("click", ".returnFromDetail", function(e) {
	const backPage = sessionStorage.getItem("goback");
	if(backPage == "home") {
		$("#topMatches").fadeIn();
		$("#highLightMatches").fadeIn();
	}
	else {
		$("#content_view_body").fadeIn();
	}
	$("#detail_view_body").removeAttr("gid");
	$("#detail_view_body").empty();
	$("#detail_view_body").fadeOut();
});

$("#main_contents").delegate(".prematch_detail_view_btn","click", function(e) {
	//$("#main_contents>div").fadeOut();
	sessionStorage.setItem('goback', "home")

	const id = $(this).attr("tid");	
	processPrematchDetail(id, 1);	
});

$("#main_contents").delegate(".sprematch_detail_view_btn","click", function(e) {
	
	sessionStorage.setItem('goback', "sport")

	const id = $(this).attr("tid");	
	processPrematchDetail(id, 1);	
});

$("#main_contents").on("click", "#all-odds-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();


	prematchDetailMode = 'all';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#main-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();

	prematchDetailMode = 'main';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#asian-lines-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();
	
	prematchDetailMode = 'asian_lines';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#goals-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();
	prematchDetailMode = 'goals';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#half-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();
	prematchDetailMode = 'half';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#minutes-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();
	prematchDetailMode = 'minutes';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#others-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();
	prematchDetailMode = 'others';
	processPrematchDetail(id);
});

$("#main_contents").on("click", "#specials-odd-view", function(e) {
	const id = $(this).attr("did");
	//$("#main_contents>div").fadeOut();
	prematchDetailMode = 'specials';
	processPrematchDetail(id);
});

function removeBetsByIdFromPanel(id) {
	var elems = $('#single_bets_view [elem]');  
	for(let i = 0; i < elems.length; i++) {
		const elem = elems[i];
		if($(elem).attr("elem") == id) {
			$(elem).closest('.multiple__items').remove(); // Set 'a1' value 
			break;
		}
	}

	elems = $('#multiple_bets_view [elem]');  
	for(let i = 0; i < elems.length; i++) {
		const elem = elems[i];
		if($(elem).attr("elem") == id) {
			$(elem).closest('.multiple__items').remove(); // Set 'a1' value 
			break;
		}
	}

	var currentBets = $('#single_bets_view .multiple__items');
	if(currentBets.length == 0) {
		$("#single_bets_view").html(`<div class='empty empty-box-1'>There are no bets on your ticket</div>
	<div class='empty empty-box-2'>Click the odds to add a bet</div>`);
	}

	var cb = $('#multiple_bets_view .multiple__items');
	if(cb.length == 0) {
		$("#multiple_bets_view").html(`<div class='empty empty-box-1'>There are no bets on your ticket</div>
	<div class='empty empty-box-2'>Click the odds to add a bet</div>`);
	}
}

$("#main_contents").delegate(".bet-btn", "click", function(e){
	const nGroup = $(this).attr("groupNo");
	const locked = $(this).find(".icon-lock");
	
	if(locked.length != 0) {
		return;
	}
	
	const mid = $(this).attr("mid")
	const t = $(this).attr("t")
	const n = $(this).attr("n")
	const d1 = $(this).attr("d1")
	const d2 = $(this).attr("d2")
	const d3 = $(this).attr("d3")
	const o = $(this).attr("o")
	const id = $(this).attr("id")
	

	if($(this).hasClass("selected")) {
		$(this).removeClass("selected");
		removeBetsByIdFromPanel(id);
		return;
	}
	const divGroup = $(`div[groupNo="${nGroup}"]`)
	const aGroup = $(`a[groupNo="${nGroup}"]`);
	const liGroup = $(`li[groupNo="${nGroup}"]`);

	for(let i = 0; i < divGroup.length; i++) {
		const id = divGroup[i].id;
		removeBetsByIdFromPanel(id);
	}

	for(let i = 0; i < aGroup.length; i++) {
		const id = aGroup[i].id;
		removeBetsByIdFromPanel(id);
	}

	for(let i = 0; i < liGroup.length; i++) {
		const id = liGroup[i].id;
		removeBetsByIdFromPanel(id);
	}

	divGroup.removeClass("selected") //need to modify
	aGroup.removeClass("selected")	//need to modify
	liGroup.removeClass("selected")	//need to modify

	$(this).addClass("selected");

	const needEmpty = $("#single_bets_view").find(".empty").length == 2;
	if(needEmpty) {
		//$("#single_bets_view").empty();
		$("#single_bets_view").html(`
			<div class="total__odds">
				<div class="total__head">
					<h6 class="odd">
						Total Stake
					</h6>
					<span id='total_stake'>
						0
					</span>
				</div>
				<div class="total__head">
					<h6 class="odd">
						Total Win
					</h6>
					<span id='total_win'>
						0
					</span>
				</div>
				<div class="total__head">
					<h6 class="odd">
						Total Payout
					</h6>
					<span id='total_payout'>
						0
					</span>
				</div>                                            
			</div>                                        
			<a href="#0" class="cmn--btn2 btn-bet">
				<span>Bet</span>
			</a>`);
		$("#multiple_bets_view").html(`
			<div class="total__odds">
				<div class="total__head">
					<h6 class="odd">
						Total Odd
					</h6>
					<span id='total_odd'>
						0
					</span>
				</div>
				<div class="wrapper" style="margin-top:1rem; margin-bottom:1rem">
					<div class="result" style="display:flex;padding:0">
						<input type="text" id='minput-stake' placeholder="stake" style="background:#000; color:#eee; flex:1;width:50%; padding:8px 10px;outline:none"/>
						<input type="text" id='minput-win' placeholder="win" style="background:#000; color:#eee; flex:1;width:50%; padding:8px 10px;outline:none"/>
					</div>
				</div>
				<div class="total__head">
					<h6 class="odd">
						Total Stake
					</h6>
					<span id='mtotal_stake'>
						0
					</span>
				</div>
				<div class="total__head">
					<h6 class="odd">
						Total Win
					</h6>
					<span id='mtotal_win'>
						0
					</span>
				</div>
				<div class="total__head">
					<h6 class="odd">
						Total Payout
					</h6>
					<span id='mtotal_payout'>
						0
					</span>
				</div>                                            
			</div>                                        
			<a href="#" class="cmn--btn2 btn-bet">
				<span>Bet</span>
			</a>`);
	}
	let infoStr = ``;
	function appendToString(item, infoStr) {  
		if (item !== "undefined" && item !== undefined) {  
			if (infoStr.length > 0) {  
				infoStr += "-";  
			}  
			infoStr += item;  
		}  
		return infoStr;
	}  
	
	infoStr = appendToString(n, infoStr);  
	infoStr = appendToString(d1, infoStr);  
	infoStr = appendToString(d2, infoStr);  

	$("#single_bets_view").prepend(`
		<div class="multiple__items">
			<div class="multiple__head">
				<div class="multiple__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						${d3}
					</span>
				</div>
				<a href="#0" class="cros remove-bet-item" elem="${id}">
					<i class="icon-cross"></i>
				</a>
			</div>
			<div class="multiple__point">
				<span class="pbox">
					${o}
				</span>
				<span class="rightname">
					<span class="fc">
						${infoStr}
					</span>
					<span class="point">
						${t}
					</span>
				</span>
			</div>
			<div class="wrapper" style="margin-top:1rem">
				<div class="result" style="display:flex;padding:0">
					<input type="text" class='input-stake' placeholder="stake" odd="${o}" style="background:#000; color:#eee; flex:1;width:50%; padding:8px 10px;outline:none"/>
					<input type="text" class='input-win' placeholder="win" odd="${o}" style="background:#000; color:#eee; flex:1;width:50%; padding:8px 10px;outline:none"/>
				</div>
			</div>
		</div>
	`);
	
	$("#multiple_bets_view").prepend(`
		<div class="multiple__items">
			<div class="multiple__head">
				<div class="multiple__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						${d3}
					</span>
				</div>
				<a href="#0" class="cros remove-bet-item" elem="${id}">
					<i class="icon-cross"></i>
				</a>
			</div>
			<div class="multiple__point">
				<span class="pbox m_odd">
					${o}
				</span>
				<span class="rightname">
					<span class="fc">
						${infoStr}
					</span>
					<span class="point">
						${t}
					</span>
				</span>
			</div>
		</div>
	`);

	calcTotalOdd();
});

function processPrematchDetail(id, first = 0) {
	//only request current information
	const goback = sessionStorage.getItem("goback");
	const d = JSON.parse(goback == "home" ? sessionStorage.getItem('home_prematch_data') : sessionStorage.getItem('sport_prematch_data'));
	const data = (goback == "home") ? d.data : d;
	let o = null;
	for(i = 0; i < data.length; i++) {
		if(data[i].id == id) {
			o = data[i];
			break;
		}
	}
	if(o == null || o.data == null) {
		toastr.error("Invalid match");
		return;
	}

	first == 1 && $("#main_contents>div").fadeOut();

	const sid = o.sport_id;
	const sports_name = sport_names[sid];
	const title = `${sports_name} \/ ${o.league_name} \/ ${o.home_name} vs ${o.away_name}`;
	const home_image = o.home_image_id;
	const away_image = o.away_image_id;
	const matchTime = o.time_str;
	const team1_str = (home_image == 0) ? `<i class='icon-star'></i>${o.home_name}`:`<img src='https://assets.b365api.com/images/team/s/${home_image}.png'/>${o.home_name}`;
	const team2_str = (away_image == 0) ? `<i class='icon-star'></i>${o.away_name}`:`<img src='https://assets.b365api.com/images/team/s/${away_image}.png'/>${o.away_name}`;
	const bettings = ["main", "asian_lines", "goals", "half","minutes", "others", "specials"];

	
	let accordionElems = '';
	let modeSelect = [];
	const func = (keys, odd_data, home_name, away_name, id, i, item) => {
		for(let j = 0; j < keys.length; j++) {
			const key = keys[j];
			const bet_name = odd_data[key].name;
			const odds = odd_data[key].odds;
			if(odds.length == 0)
				continue;
			let bettingItem = '';
			if(odds.length == 3) {
				for(let k = 0; k < odds.length; k++) {
					const odd = odds[k].odds;
					const header = odds[k].header;
					const name = odds[k].name;
					const oid = odds[k].id;
					const handi = odds[k].handicap;
					const n = name == undefined ? handi : name;
					const t = header == undefined ? n : n+", "+header;

					bettingItem += `<div class="col-md-4 col-sm-4">
						<div style='display:flex; justify-content:space-between; padding: 10px' class='bet-btn' id='idr-${id}-${oid}' groupNo="${i}-${j}" mid="${id}" t="${bet_name}" d1="${header}" d2="${name}" o="${odd}" d3="${home_name} vs ${away_name}">
							<span>${odd == "NaN" ? '<i class="icon-lock"></i>':t}</span>
							<span>${odd == "NaN" ? '<i class="icon-lock"></i>':odd}</span>
						</div>
					</div>`;
				}
			}
			else {
				for(let k = 0; k < odds.length; k++) {
					const odd = odds[k].odds;
					const header = odds[k].header;
					const name = odds[k].name;
					const oid = odds[k].id;
					const handi = odds[k].handicap;
					const n = name == undefined ? handi : name;
					const t = header == undefined ? n : n+", "+header;

					let n1 = "";
					if(odds.length == 2) {
						n1 = j == 0 ? o.home_name : o.away_name;
					}
					bettingItem += `<div class="col-md-6 col-sm-6">
						<div style='display:flex; justify-content:space-between; padding: 10px' class='bet-btn' id='idr-${id}-${oid}' groupNo="${i}-${j}" t="${bet_name}" mid="${id}" n="${n1}" d1="${n}" d2="${header}" o="${odd}" d3="${home_name} vs ${away_name}">
							<span>${odd == "NaN" ? '<i class="icon-lock"></i>':t}</span>
							<span>${odd == "NaN" ? '<i class="icon-lock"></i>':odd}</span>
						</div>
					</div>`;
				}
			}

			accordionElems += `<div class="accordion-item">
				<h2 class="accordion-header" id="headingOne${i}-${j}">
					<button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#odd-${id}-${i}-${j}" aria-expanded="true" aria-controls="odd-${id}-${i}-${j}">
					<span class="d-flex align-items-center gap-2 left-chokoboko">
						<span class="mt-1"><i class="icon-football"></i></span>
						<span class="score text-white">
							${bet_name}-${item.toUpperCase()}
						</span>
					</span>
					<span class="d-flex align-items-center gap-1 icon-rightfs10">
						<i class="fa-solid fa-chevron-down"></i>
					</span>
					</button>
				</h2>
				<div id="odd-${id}-${i}-${j}" class="accordion-collapse collapse show" aria-labelledby="headingOne${i}-${j}">
					<div class="accordion-body">
						<div class="row g-0">
							${bettingItem}
						</div>
					</div>
				</div>
			</div>`;
		}
	}	
	
	if(prematchDetailMode == 'all') {
		modeSelect = modeSelect.concat(bettings);
	}
	else {
		modeSelect = [prematchDetailMode];
	}

	for(let i = 0; i < modeSelect.length; i++) {
		const item = modeSelect[i];
		if(o.data[item] == undefined)
			continue;
		const odd_data = o.data[item].sp;
		if(Array.isArray(o.data[item])) {
			for(let j = 0; j < o.data[item].length; j++) {
				const sp = o.data[item][j].sp;
				const keys = Object.keys(sp);		
				func(keys, sp, o.home_name, o.away_name, id, i, item);	
			}
		}
		else {
			const keys = Object.keys(odd_data);		
			func(keys, odd_data, o.home_name, o.away_name, id, i, item);
		}				
	}
	
	// Convert it to a Date object  
	let dateObj = new Date(matchTime);  
	let options = {  
		weekday: 'long',   // long name of the day  
		year: 'numeric',   // numeric year  
		month: 'long',     // long name of month  
		day: 'numeric',    // numeric day of the month  
		hour: 'numeric',   // numeric hour  
		minute: 'numeric', // numeric minutes  
		timeZoneName: 'short' // short name of the time zone  
	};  

	// Format the date to the local timezone  
	let formattedDate = dateObj.toLocaleString('en-US', options);  
	$("#detail_view_body").empty();
	$("#detail_view_body").prepend(`                                                     
		<div class="live__heightlight mb__30">
			<div class="section__title" style="display:flex; justify-content:space-between">
				<h5>
					${title}
				</h5>
				<img class='hand returnFromDetail' src="/assets/img/logo/return.png" width='24' style="filter: invert(1) brightness(0.6) !important;"/>
			</div>			
			<div class='b__bottom' style='margin-left:2rem; padding:10px 0px; justify-content:space-between; display:flex'>
				<div style='color:#09ff8d; font-weight:bold'>${formattedDate}</div>				
			</div>
			<div class='b__bottom' style='margin-left:2rem; padding:10px 0px; display:flex'>
				<div style='display:flex; gap:5px'>${team1_str}</div>
			</div>
			<div class='b__bottom' style='margin-left:2rem;padding:10px 0px; display:flex'>
				<div style='display:flex; gap:5px'>${team2_str}</div>
			</div>
			<div class="heightlight__tab nexttogo__tab">
				<div class="nav pt-20" id="nav-detail-odd" role="tablist">
					<button class="nav-link prematch-detail-nav ${prematchDetailMode == 'all'?'active':''}" id="all-odds-view" data-bs-toggle="tab" data-bs-target="#all-odds-view-tab" type="button" role="tab" aria-selected="true" did="${id}">					
						<span>
							All
						</span>
					</button>
					<button class="nav-link prematch-detail-nav ${prematchDetailMode == 'main'?'active':''}" id="main-odd-view" data-bs-toggle="tab" data-bs-target="#main-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Main
						</span>
					</button>
					<button class="nav-link prematch-detail-nav  ${prematchDetailMode == 'asian_lines'?'active':''}" id="asian-lines-odd-view" data-bs-toggle="tab" data-bs-target="#asian-lines-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Asian Lines
						</span>
					</button>
					<button class="nav-link prematch-detail-nav  ${prematchDetailMode == 'goals'?'active':''}" id="goals-odd-view" data-bs-toggle="tab" data-bs-target="#goals-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Goals
						</span>
					</button>
					<button class="nav-link prematch-detail-nav  ${prematchDetailMode == 'half'?'active':''}" id="half-odd-view" data-bs-toggle="tab" data-bs-target="#half-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Half
						</span>
					</button>
					<button class="nav-link prematch-detail-nav  ${prematchDetailMode == 'minutes'?'active':''}" id="minutes-odd-view" data-bs-toggle="tab" data-bs-target="#minutes-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Minutes
						</span>
					</button>
					<button class="nav-link prematch-detail-nav  ${prematchDetailMode == 'others'?'active':''}" id="others-odd-view" data-bs-toggle="tab" data-bs-target="#others-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Others
						</span>
					</button>
					<button class="nav-link prematch-detail-nav  ${prematchDetailMode == 'specials'?'active':''}" id="specials-odd-view" data-bs-toggle="tab" data-bs-target="#specials-odd-view-tab" type="button" role="tab" aria-selected="false" did="${id}">
						<span>
							Specials
						</span>
					</button>
				</div>
			</div>
			<div class="height__table" style='margin-top:1.5rem'>
				<div class="tab-content sidebar-livematch">
					<div class="accordion">
						${accordionElems}
					</div>
				</div>
			</div>
		</div>`);
	$("#detail_view_body").attr("gid", id);
	$("#detail_view_body").fadeIn();//.css("display", "block");
}	

function calcTotalOdd() {
	const m_odd = $("#multiple_bets_view .m_odd");
	let totalOdd = 1;
	for(let i = 0; i < m_odd.length; i++) {
		let odd = Number(m_odd[i].innerHTML.trim());
		odd = isNaN(odd) ? 1: odd;
		totalOdd *= odd;
	}
	$("#total_odd").html(totalOdd.toFixed(2));
}

function calcTotalBets() {
	const stakes = $(".input-stake");
	const wins = $(".input-win");
	let totalStake = 0, totalWin = 0, totalPayout = 0;
	for(let i = 0; i < stakes.length; i++) {
		const v = Number(stakes[i].value);
		totalStake += v;
	}
	for(let i = 0; i < wins.length; i++) {
		const v = Number(wins[i].value);
		totalWin += v;
	}
	totalStake = isNaN(totalStake) ? 0 : totalStake;
	totalWin = isNaN(totalWin) ? 0 : totalWin;
	totalPayout = totalStake + totalWin;
	$("#total_stake").html(totalStake.toFixed(3))
	$("#total_win").html(totalWin.toFixed(3))
	$("#total_payout").html(totalPayout.toFixed(3))
}

function calcMTotalBet() {
	let stake = (Number)($("#minput-stake").val());
	let win = (Number)($("#minput-win").val());
	let odd = (Number)($("#total_odd").html()) - 1;
	win = odd * stake;
	$('#minput-win').val(win.toFixed(3)); // Set 'a1' value 
	$("#mtotal_stake").html(stake.toFixed(3))
	$("#mtotal_win").html(win.toFixed(3))
	$("#mtotal_payout").html((stake+win).toFixed(3))
}

$("#single_bets_view").on("input",".input-stake", function(e) {
	const o = Number($(this).attr("odd")) - 1;
	const v = Number($(this).val());
	let win = (o * v).toFixed(3);
	win = isNaN(win) ? 0 : win;
	$(this).closest('div').find('.input-win').val(win); // Set 'a1' value 

	calcTotalBets();
});

$("#multiple_bets_view").on("input","#minput-stake", function(e) {
	const o = Number($("#total_odd").html()) - 1;
	const v = Number($(this).val());
	let win = (o * v).toFixed(3);
	win = isNaN(win) ? 0 : win;
	$('#minput-win').val(win); // Set 'a1' value 

	calcMTotalBet();
});

$("#single_bets_view").on("input",".input-win", function(e) {
	const o = Number($(this).attr("odd")) - 1;
	const v = Number($(this).val());
	let win = (v / o).toFixed(3);
	win = isNaN(win) ? 0 : win;
	$(this).closest('div').find('.input-stake').val(win); // Set 'a1' value 

	calcTotalBets();
});

$("#multiple_bets_view").on("input","#minput-win", function(e) {
	const o = Number($("#total_odd").html()) - 1;
	const v = Number($(this).val());
	let win = (v / o).toFixed(3);
	win = isNaN(win) ? 0 : win;
	$('#minput-stake').val(win); // Set 'a1' value 

	calcMTotalBet();
});

$("#single_bets_view").on("click",".btn-bet", function(e) {
	const elems = $("#single_bets_view .remove-bet-item");
	const result = [];
	for(let i = 0; i < elems.length; i++) {
		const iid = $(elems[i]).attr("elem");
		const item = $(elems[i]).closest('.multiple__items'); 
		const stakeItem = item.find(".input-stake");
		const stake = Number(stakeItem.val());
		const odd = Number(stakeItem.attr("odd"));
		if(isNaN(stake) || stake == 0 || isNaN(odd) || odd == 0) {
			toastr.error("Stake input error.");
			return;
		}
		
		result.push({
			bid: iid,
			stake,
			odd
		})
	}
	showConfirmAlert("Do you want to place bet", ()=>{
		$.ajax({  
			url: '/api/place_single_bet',  
			type: 'POST',  
			data: {
				data: JSON.stringify(result),
				token
			},  
			success: function(response) {  
				// Use the callback to pass the data to the DataTable  
				if(response.status == 0) {
					toastr.error("Internal server error.");	
					return;
				}
				if(response.status == -1) {
					toastr.error("Odd mismatch error. Rebet and try again");	
					return;
				}
				if(response.status == -2) {
					toastr.error("Duplicated request.");	
					return;
				}
				toastr.info("Betting placed successfully.");
			},  
			error: function(jqXHR, textStatus, errorThrown) {  
			}  
		});  
	});
});

$("#multiple_bets_view").on("click",".btn-bet", function(e) {
	const elems = $("#multiple_bets_view .remove-bet-item");
	const result = [];
	const stake = Number($("#minput-stake").val());
	const odd = Number($("#total_odd").html());
	for(let i = 0; i < elems.length; i++) {
		const iid = $(elems[i]).attr("elem");
		result.push(iid)
	}
	const data = {
		ids: result,
		stake,
		odd,
	}
	if(elems.length <= 1) {
		toastr.error("Please click single tab and place bet there.");
		return;
	}
	if(isNaN(stake)|| stake == 0) {
		toastr.error("Please input stake.");
		return;
	}
	showConfirmAlert("Do you want to place bet", ()=>{
		$.ajax({  
			url: '/api/place_multiple_bet',  
			type: 'POST',  
			data: {
				data: JSON.stringify(data),
				token
			},  
			success: function(response) {  
				// Use the callback to pass the data to the DataTable  
				if(response.status == 0) {
					toastr.error("Internal server error.");	
					return;
				}
				if(response.status == -1) {
					toastr.error("Odd mismatch error. Rebet and try again");	
					return;
				}
				if(response.status == -2) {
					toastr.error("Duplicated request.");	
					return;
				}
				toastr.info("Betting placed successfully.");
			},  
			error: function(jqXHR, textStatus, errorThrown) {  
			}  
		});  
	});
});

$("#single_bets_view").on("click",".remove-bet-item", function(e) {	
	var items = $(this).closest('.multiple__items');  
	var elem_id = $(this).attr("elem")
	items.remove();

	$('li.selected#'+elem_id).removeClass();
	$("#"+elem_id).removeClass("selected")	

	const multis = $("#multiple_bets_view .remove-bet-item");
	for(let i = 0; i < multis.length; i++) {
		const multi = multis[i];
		const eid = $(multi).attr("elem");
		if(eid == elem_id) {
			$(multi).closest('.multiple__items').remove();
			break;
		}
	}

	calcTotalBets();
	calcTotalOdd();
	calcMTotalBet();

	var currentBets = $('#single_bets_view .multiple__items');
	if(currentBets.length == 0) {
		$("#single_bets_view").html(`<div class='empty empty-box-1'>There are no bets on your ticket</div>
	<div class='empty empty-box-2'>Click the odds to add a bet</div>`);
	}
	var cb = $('#multiple_bets_view .multiple__items');
	if(cb.length == 0) {
		$("#multiple_bets_view").html(`<div class='empty empty-box-1'>There are no bets on your ticket</div>
	<div class='empty empty-box-2'>Click the odds to add a bet</div>`);
	}
});

$("#multiple_bets_view").on("click",".remove-bet-item", function(e) {	
	var items = $(this).closest('.multiple__items');  
	var elem_id = $(this).attr("elem")

	items.remove();
	$("#"+elem_id).removeClass("selected")

	const multis = $("#single_bets_view .remove-bet-item");
	for(let i = 0; i < multis.length; i++) {
		const multi = multis[i];
		const eid = $(multi).attr("elem");
		if(eid == elem_id) {
			$(multi).closest('.multiple__items').remove();
			break;
		}
	}

	calcTotalBets();
	calcTotalOdd();
	calcMTotalBet();

	var currentBets = $('#single_bets_view .multiple__items');
	if(currentBets.length == 0) {
		$("#single_bets_view").html(`<div class='empty empty-box-1'>There are no bets on your ticket</div>
	<div class='empty empty-box-2'>Click the odds to add a bet</div>`);
	}
	var cb = $('#multiple_bets_view .multiple__items');
	if(cb.length == 0) {
		$("#multiple_bets_view").html(`<div class='empty empty-box-1'>There are no bets on your ticket</div>
	<div class='empty empty-box-2'>Click the odds to add a bet</div>`);
	}
});

$("#accordion_prematch").on("click", ".select-sport", function(e) {
	$(".select-sport").removeClass("selected");
	$(this).addClass("selected");
	const id = $(this).attr('id').substr(4);

	sessionStorage.setItem("current_prematch_sport", id);
	$("#searchView").empty();
	$("#paging").empty();

	sportsSocket.send(JSON.stringify({
		token: token,
		page:'sport', 
		live:'off', 
		prematch:'on', 
		psport:id, 
		detail_id:0, 
		data1:pageNumber,
		data2:searchKey
	}));
})

$("#accordion_live").on("click", ".select-sport", function(e) {
	$(".select-sport").removeClass("selected");
	$(this).addClass("selected");
	const id = $(this).attr('id').substr(4);
	$("#searchView").empty();
	$("#paging").empty();
	
	sessionStorage.setItem("current_live_sport", id);

	sportsSocket.send(JSON.stringify({
		token: token,
		page:'sport', 
		live:'on', 
		lsport:id, 
		prematch:'off', 
		detail_id:0, 
		data1:pageNumber,
		data2:searchKey
	}));
})


$("#lightlighttab").click(function (e) {
  const psport = sessionStorage.getItem("current_prematch_sport");  

  sportsSocket.send(JSON.stringify({
    token: token,
    page:'home', 
    live:'on', 
    lsport:1, 
    prematch:'on', 
    psport:psport, 
    detail_id:0, 
    data1:"",
    data2:""
  }));

  sessionStorage.setItem("current_live_sport", 1);
});

$("#lightlighttab2tennis").click(function (e) {
  const psport = sessionStorage.getItem("current_prematch_sport");  
  
  sportsSocket.send(JSON.stringify({
    token: token,
    page:'home', 
    live:'on', 
    lsport:13, 
    prematch:'on', 
    psport:psport, 
    detail_id:0, 
    data1:"",
    data2:""
  }));

  sessionStorage.setItem("current_live_sport", 13);
});

$("#lightlighttab3basket").click(function (e) {
	const psport = sessionStorage.getItem("current_prematch_sport");  
  
	sportsSocket.send(JSON.stringify({
	  token: token,
	  page:'home', 
	  live:'on', 
	  lsport:18, 
	  prematch:'on', 
	  psport:psport, 
	  detail_id:0, 
	  data1:"",
	  data2:""
	}));

	sessionStorage.setItem("current_live_sport", 18);
});

$("#lightlighttabvolly").click(function (e) {
	const psport = sessionStorage.getItem("current_prematch_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:91, 
		prematch:'on', 
		psport:psport, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_live_sport", 91);
});

$("#lightlighttab5cricket").click(function (e) {
	const psport = sessionStorage.getItem("current_prematch_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:3, 
		prematch:'on', 
		psport:psport, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_live_sport", 3);
});

$("#lightlighttab6ttenis").click(function (e) {
	const psport = sessionStorage.getItem("current_prematch_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:92, 
		prematch:'on', 
		psport:psport, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_live_sport", 92);
});

$("#lightlight7baseball").click(function (e) {
	const psport = sessionStorage.getItem("current_prematch_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:16, 
		prematch:'on', 
		psport:psport, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_live_sport", 16);
});

$("#nextgofootball").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:1, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 1);
});

$("#nextgotennis").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:13, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 13);
});

$("#nextgobasketball").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:18, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 18);
});

$("#nextgovolleyball").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:91, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 91);
});

$("#nextgocricket").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:3, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 3);
});

$("#nextgottennis").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:92, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 92);
});

$("#nextgobaseball").click(function (e) {
	const lsport = sessionStorage.getItem("current_live_sport");  
  
	sportsSocket.send(JSON.stringify({
		token: token,
		page:'home', 
		live:'on', 
		lsport:lsport, 
		prematch:'on', 
		psport:16, 
		detail_id:0, 
		data1:"",
		data2:""
	}));

	sessionStorage.setItem("current_prematch_sport", 16);
});

$("#main-tab-home").click(function(e) {
	$(".main-nav-button").removeClass("active");
	$(this).addClass("active");

	const d = `<div class="match__fixing__wrap top__bottom__space left__right__space owl-theme owl-carousel" id="topMatches">
		<a href="#0" class="match__fixing__items">
			<div class="match__head">
				<div class="match__head__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						World Cup 2022
					</span>
				</div>
				<span class="today">
					Today / 22:00
				</span>
			</div>
			<div class="match__vs">
				<div class="match__vs__left">
					<span>
						Argentina
					</span>
					<span class="flag">
						<img src="assets/img/matchfixing/arjentina.png" alt="flag">
					</span>
				</div>
				<span class="vs">
					Vs
				</span>
				<div class="match__vs__left">
					<span class="flag">
						<img src="assets/img/matchfixing/france.png" alt="flag">
					</span>
					<span>
						France
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
				<li>
					<span>1</span>
					<span>8.55</span>
				</li>
				<li>
					<span>X</span>
					<span>6.50</span>
				</li>
				<li>
					<span>2</span>
					<span>3.20</span>
				</li>
			</ul>
		</a>
		<a href="#0" class="match__fixing__items">
			<div class="match__head">
				<div class="match__head__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						World Cup 2022
					</span>
				</div>
				<span class="today">
					Today / 2:00
				</span>
			</div>
			<div class="match__vs">
				<div class="match__vs__left">
					<span>
						Poland
					</span>
					<span class="flag">
						<img src="assets/img/matchfixing/poland.png" alt="flag">
					</span>
				</div>
				<span class="vs">
					Vs
				</span>
				<div class="match__vs__left">
					<span class="flag">
						<img src="assets/img/matchfixing/denmark.png" alt="flag">
					</span>
					<span>
						Denmark
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
				<li>
					<span>1</span>
					<span>3.55</span>
				</li>
				<li>
					<span>X</span>
					<span>4.50</span>
				</li>
				<li>
					<span>2</span>
					<span>2.20</span>
				</li>
			</ul>
		</a>
		<a href="#0" class="match__fixing__items">
			<div class="match__head">
				<div class="match__head__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						World Cup 2022
					</span>
				</div>
				<span class="today">
					Today / 22:00
				</span>
			</div>
			<div class="match__vs">
				<div class="match__vs__left">
					<span>
						Mexico
					</span>
					<span class="flag">
						<img src="assets/img/matchfixing/maxico.png" alt="flag">
					</span>
				</div>
				<span class="vs">
					Vs
				</span>
				<div class="match__vs__left">
					<span class="flag">
						<img src="assets/img/matchfixing/poland.png" alt="flag">
					</span>
					<span>
						Poland
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
				<li>
					<span>1</span>
					<span>8.55</span>
				</li>
				<li>
					<span>X</span>
					<span>9.50</span>
				</li>
				<li>
					<span>2</span>
					<span>5.20</span>
				</li>
			</ul>
		</a>
		<a href="#0" class="match__fixing__items">
			<div class="match__head">
				<div class="match__head__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						WEFA
					</span>
				</div>
				<span class="today">
					Tomorrow / 01:00
				</span>
			</div>
			<div class="match__vs">
				<div class="match__vs__left">
					<span>
						Farense
					</span>
					<span class="flag">
						<img src="assets/img/matchfixing/farense.png" alt="flag">
					</span>
				</div>
				<span class="vs">
					Vs
				</span>
				<div class="match__vs__left">
					<span class="flag">
						<img src="assets/img/matchfixing/tenerif.png" alt="flag">
					</span>
					<span>
						Tenerife
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
				<li>
					<span>1</span>
					<span>1.55</span>
				</li>
				<li>
					<span>X</span>
					<span>8.50</span>
				</li>
				<li>
					<span>2</span>
					<span>3.20</span>
				</li>
			</ul>
		</a>
		<a href="#0" class="match__fixing__items">
			<div class="match__head">
				<div class="match__head__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						EFL Trophy
					</span>
				</div>
				<span class="today">
					Tomorrow / 01:00
				</span>
			</div>
			<div class="match__vs">
				<div class="match__vs__left">
					<span>
						Tenerife
					</span>
					<span class="flag">
						<img src="assets/img/matchfixing/tenerif.png" alt="flag">
					</span>
				</div>
				<span class="vs">
					Vs
				</span>
				<div class="match__vs__left">
					<span class="flag">
						<img src="assets/img/matchfixing/oviedo.png" alt="flag">
					</span>
					<span>
						Real Oviedo
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
				<li>
					<span>1</span>
					<span>3.55</span>
				</li>
				<li>
					<span>X</span>
					<span>9.50</span>
				</li>
				<li>
					<span>2</span>
					<span>6.20</span>
				</li>
			</ul>
		</a>
		<a href="#0" class="match__fixing__items">
			<div class="match__head">
				<div class="match__head__left">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						World Cup 2022
					</span>
				</div>
				<span class="today">
					Today / 22:00
				</span>
			</div>
			<div class="match__vs">
				<div class="match__vs__left">
					<span>
						Australia
					</span>
					<span class="flag">
						<img src="assets/img/matchfixing/aus.png" alt="flag">
					</span>
				</div>
				<span class="vs">
					Vs
				</span>
				<div class="match__vs__left">
					<span class="flag">
						<img src="assets/img/matchfixing/tunisia.png" alt="flag">
					</span>
					<span>
						Tunisia
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
				<li>
					<span>1</span>
					<span>3.55</span>
				</li>
				<li>
					<span>X</span>
					<span>4.50</span>
				</li>
				<li>
					<span>2</span>
					<span>2.20</span>
				</li>
			</ul>
		</a>
		</div>
		<div class="main__body__wrap left__right__space">
		<!--Live__heightlight Here-->
		<div class="live__heightlight mb__30">
			<div class="section__title">
				<h4>
					Live Highlights
				</h4>
			</div>
			<div class="heightlight__tab">
				<div class="nav b__bottom" id="nav-tabheight" role="tablist">
					<button class="nav-link active" id="lightlighttab" data-bs-toggle="tab" data-bs-target="#height1" type="button" role="tab" aria-selected="true">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						Football
					</span>
					</button>
					<button class="nav-link " id="lightlighttab2tennis" data-bs-toggle="tab" data-bs-target="#height2tennis" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-tennis"></i>
						</span>
						<span>
							Tennis
						</span>
					</button>
					<button class="nav-link " id="lightlighttab3basket" data-bs-toggle="tab" data-bs-target="#basketbtab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-basketball"></i>
						</span>
						<span>
							Basketball
						</span>
					</button>
					<button class="nav-link " id="lightlighttabvolly" data-bs-toggle="tab" data-bs-target="#vollyballs" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-volly"></i>
						</span>
						<span>
							Volleyball
						</span>
					</button>
					<button class="nav-link " id="lightlighttab5cricket" data-bs-toggle="tab" data-bs-target="#crickettab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-cricket"></i>
						</span>
						<span>
							Cricket
						</span>
					</button>
					<button class="nav-link " id="lightlighttab6ttenis" data-bs-toggle="tab" data-bs-target="#tabletennis" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-ttennis"></i>
						</span>
						<span>
							Table Tennis
						</span>
					</button>
					<button class="nav-link " id="lightlight7baseball" data-bs-toggle="tab" data-bs-target="#tablebaseball" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-baseball"></i>
						</span>
						<span>
							Base Ball
						</span>
					</button>
				</div>
			</div>
			<div class="height__table">
				<div class="tab-content" id="nav-tabContentheight">
					<!--Football-->
					<div class="tab-pane fade text-white show active" id="height1" role="tabpanel" aria-labelledby="nav-home-tabpre" tabindex="0">
						<div class="main__table">
							<div class="table__wrap" id="live_data_view">                                                                                                                                                                
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="live__heightlight mb__30">
			<div class="section__title">
				<h4>
					Next To Go
				</h4>
			</div>
			<div class="heightlight__tab nexttogo__tab">
				<div class="nav pt-20" id="nav-tabheightnextgo" role="tablist">
					<button class="nav-link active" id="nextgofootball" data-bs-toggle="tab" data-bs-target="#nextgofootballtab" type="button" role="tab" aria-selected="true">
					<span class="icons">
						<i class="icon-football"></i>
					</span>
					<span>
						Football
					</span>
					</button>
					<button class="nav-link " id="nextgotennis" data-bs-toggle="tab" data-bs-target="#nextgotennistab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-tennis"></i>
						</span>
						<span>
							Tennis
						</span>
					</button>
					<button class="nav-link " id="nextgobasketball" data-bs-toggle="tab" data-bs-target="#nextgobasketballtab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-basketball"></i>
						</span>
						<span>
							Basketball
						</span>
					</button>
					<button class="nav-link " id="nextgovolleyball" data-bs-toggle="tab" data-bs-target="#nextgovolleyballtab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-volly"></i>
						</span>
						<span>
							Volleyball
						</span>
					</button>
					<button class="nav-link " id="nextgocricket" data-bs-toggle="tab" data-bs-target="#nextgocrickettab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-criket"></i>
						</span>
						<span>
							Cricket
						</span>
					</button>
					<button class="nav-link " id="nextgottennis" data-bs-toggle="tab" data-bs-target="#nextgottennistab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-ttennis"></i>
						</span>
						<span>
							Table Tennis
						</span>
					</button>
					<button class="nav-link " id="nextgobaseball" data-bs-toggle="tab" data-bs-target="#nextgobaseballtab" type="button" role="tab" aria-selected="false">
						<span class="icons">
							<i class="icon-baseball"></i>
						</span>
						<span>
							Base Ball
						</span>
					</button>
				</div>
			</div>
			<div class="height__table">
				<div class="tab-content" id="nav-tabContentheightnext">
					<div class="tab-pane fade text-white show active" id="nextgofootballtab" role="tabpanel" aria-labelledby="nav-home-tabpre" tabindex="0">
						<div class="main__table">
							<div class="table__wrap" id="prematch_data_view">
								
							</div>
						</div>
					</div>                                                                    
				</div>
			</div>
		</div>                                                      
		</div>`;	
})

$("#main-tab-live").click(function(e) {
	$(".main-nav-button").removeClass("active");
	$(this).addClass("active");
})

$("#main-tab-today").click(function(e) {
	$(".main-nav-button").removeClass("active");
	$(this).addClass("active");
})

$("#main-tab-league").click(function(e) {
	$(".main-nav-button").removeClass("active");
	$(this).addClass("active");
})

$("#main-tab-result").click(function(e) {
	$(".main-nav-button").removeClass("active");
	$(this).addClass("active");
})

$("#main-tab-history").click(function(e) {
	$(".main-nav-button").removeClass("active");
	$(this).addClass("active");
})

$("#remove_all_bets").click(function(e) {
	showConfirmAlert('Do you want to remove all betting in your ticket?', ()=>{
		$("#single_bets_view").empty();
		$("#multiple_bets_view").empty();

		$("#single_bets_view").append(`
			<div class='empty empty-box-1'>There are no bets on your ticket</div>
			<div class='empty empty-box-2'>Click the odds to add a bet</div>
		`);
		
		$("#multiple_bets_view").append(`
			<div class='empty empty-box-1'>There are no bets on your ticket</div>
			<div class='empty empty-box-2'>Click the odds to add a bet</div>
		`);
		$(".bet-btn").removeClass('selected')
	})
	
})
})

$(".fav_matches").click(function(e) {
	
})

function showConfirmAlert(title, callback) {
	Swal.fire({
		text: title,
		icon: "question",
		showCancelButton: !0,
		confirmButtonText: "Ok",
		cancelButtonText: "Cancel",
	}).then(function (t) {
		if (t.value) {
			callback();
		}
	});
}
  