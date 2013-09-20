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


var popcorn;
var screenshot_div;

document.addEventListener( "DOMContentLoaded", function() {


	popcorn = Popcorn("#dancevideo_01");
	// var popcorn = Popcorn("#dancevideo_01");

	var vid_div = document.getElementById("dancevideo_01");

	screenshot_div = document.getElementById("screenshot");
	// alert(test)
	// vid_div.addEventListener("click", popcorn.play());
	
	screenshot_div.addEventListener("click", whatClicked, false);
	// vid_div.addEventListener("click", whatClicked, false);


	// popcorn.autoplay(true);
	popcorn.footnote({
		start: CUEPOINTS[0],
		end: CUEPOINTS[1],
		target: "footnote",
		text: "Interactive Design"
	});
}, false );


function whatClicked(evt) {

	document.getElementById("screenshot").style.display = "none";
    // alert(evt.target.id);
    // alert(popcorn);
    popcorn.play();
}

// test.addEventListener("click", whatClicked, false);