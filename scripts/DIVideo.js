var video;
var timer;

var currIndex = 0;

var bTitlesAnimating = false;

var SHEEN_TIME = 5000;
var SHEEN_XS = new Array(-250, 110);
var SHEEN_YS = new Array(-250, 110);

var TITLE_YS = new Array(433, 468, 502);
var D_TITLE_Y = 30;

var CUEPOINTS = new Array(.234, 8.408, 14.348, 21.655, 29.296, 30.330);
var D_CUE_TIME = .2;
var CUE_END_INDEX = 4;

$(function(){
	
	$('.titleText').css('opacity', 0);
	
	$('#btnSheen').css('opacity', 0);
	$('#legs').css('opacity', 0);
	//$('#btnSheen').css('mask', url(#btnMask));
	
	$("#clickBtn").click(function() {
		playVid();
	});
	
	$('#clickBtn').on('mouseover', animateSheen);
	
	video = $('#dancevideo').get(0);
	video.addEventListener("timeupdate", function() {timeUpdateCheck()}	, false);
	video.play();
	
	timer = $.timer(function() {animateSheen()});
	timer.set({time:SHEEN_TIME, autostart:true });
								
});


function timeUpdateCheck() {
	var vidTime = video.currentTime;
	
	if (vidTime >= CUEPOINTS[currIndex] - D_CUE_TIME) {
		video.currentTime = CUEPOINTS[currIndex];
		//$('#videoDiv').append('<div>'+currIndex+'</div>');
		video.pause();
		
		if (currIndex == CUE_END_INDEX) {
			bTitlesAnimating = true;
			animateTitleInteractive();			
			currIndex++;
			return;
		}
		
		if (currIndex == CUEPOINTS.length - 1) {
			// skip beginning if replaying
			currIndex = 1;
			video.currentTime = CUEPOINTS[0]+ D_CUE_TIME;;
			video.play();			
			//$('#sheenMask').css({'height':170});
			return;
		}else{
			currIndex++;
		}
		// enable mouse click
		enableClickToPlay();
	}
}

function animateTitleInteractive() {
	$('#titleInteractive').top = TITLE_YS[0];
	$('#titleInteractive').animate(
		{opacity:1,	top:TITLE_YS[0] - D_TITLE_Y},
		666,				
		'easeOutQuad',
		function(){
			animateTitleVideo();
			}
	);
}

function animateTitleVideo() {	
	$('#titleVideo').top = TITLE_YS[1];
	$('#titleVideo').animate(
		{opacity:1,	top:TITLE_YS[1] - D_TITLE_Y},
		555,				
		'easeOutQuad',
		function(){			
			animateTitleSocial();
			}
	);
}

function animateTitleSocial() {	
	$('#titleSocial').top = TITLE_YS[2];
	$('#titleSocial').animate(
		{opacity:1,	top:TITLE_YS[2] - D_TITLE_Y},
		444,				
		'easeOutQuad',
		function(){
			bTitlesAnimating = false;
			enableClickToPlay();
			}
	);
}

function animateTitlesDrop() {	
	$('#titleInteractive').animate(
		{opacity:0,	top:TITLE_YS[0] + D_TITLE_Y},
		444,				
		'easeOutQuad',
		function(){}
	);
	$('#titleVideo').animate(
		{opacity:0,	top:TITLE_YS[1] + D_TITLE_Y},
		444,				
		'easeOutQuad',
		function(){}
	);
	$('#titleSocial').animate(
		{opacity:0,	top:TITLE_YS[2] + D_TITLE_Y},
		444,				
		'easeOutQuad',
		function(){}
	);
}

function enableClickToPlay() {
		//$('#videoDiv').append('<div>'+currIndex+'</div>');
	if (currIndex <= CUE_END_INDEX) {
		$('#clickBtn').css('opacity', 1);
	}	
	timer.play();
}

function playVid() {	
	if (bTitlesAnimating) {
		return;
	}	
	//$('#videoDiv').append('<div>'+currIndex+'</div>');
	timer.stop();
	video.play();
	
	$('#clickBtn').css('opacity', 0);	
	
	if (currIndex > CUE_END_INDEX) {		
		$('#legs').css('opacity', 0);
		animateTitlesDrop();
	}	
}

function animateSheen() {
	timer.stop();
	
	//$('#videoDiv').append('<div>'+$("#clickBtn").css("opacity")+'</div>');
	
	if ($("#clickBtn").css("opacity") != 1) {		
		if (currIndex <= CUE_END_INDEX) {
			return;
		}else{
			$('#legs').css('opacity', 1);
			//$('#sheenMask').css({'height':130});
		}
	}
	
	$('#btnSheen').css('opacity', .8);
	//$('#btnSheen').css({'opacity':1, 'left':SHEEN_XS[0], 'top':SHEEN_YS[0]});	
	$('#btnSheen').animate(
		{left:SHEEN_XS[1], top:SHEEN_YS[1]},
		500,				
		'easeOutQuad',
		function(){
			$('#btnSheen').css({'opacity':0, 'left':SHEEN_XS[0], 'top':SHEEN_YS[0]});
			timer.play();
			}
	);
}
