/*
	--windowsOnload.js-- is used to render some common elements for every page.
	@function init() - initiate every page	
	@many of these classes are belong to Boothstrap lib 
*/

function init(){
	
	var navi = document.getElementById("myNav");	
	navi.className = "navbar navbar-inverse navbar-fixed-top";
	navi.innerHTML = 
		"<div class='container'>" +
			"<div class='nav_header'>" +
				"<a class='navbar-brand' href='/'>Giang Phan</a>" +
			"</div>" +
				"<ul class='nav navbar-nav'>" +					
					"<li id='home' onclick='document.title'><a href='/'>Home</a></li>" +
					"<li id='about' onclick='document.title'><a href='/about'>About</a></li>" +
					"<li id='others' class='dropdown'>" +
						"<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Others" +
						"<span class='caret'></span></a>" +
						"<ul class='dropdown-menu'>" +
							"<li><a href='#'>page 1</a></li>" +
							"<li><a href='#'>page 2</a></li>" +
						"</ul>" +
					"</li>" +
				"</ul>" + 
		"</div>";	
	var title = document.title;
	if (title == 'Giang Phan'){
		document.getElementById('home').setAttribute("class", "active");
	}
	if(title == 'About'){
		document.getElementById('about').setAttribute("class", "active");
	}
}

//initialize the 3 popup css class names - create more if needed
var popSpecArray=['popSml','popMid','popLge'];
//Set your 3 basic sizes and other options for the class names above - create more if needed
var popSml = 'width=400,height=300,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=20,top=20';
var popMid = 'width=800,height=1000,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=0,top=0';
var popLge = 'width=1000,height=750,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=1,left=20,top=20';


/*--Handle popup Windows--resume...
	@if((this.className).indexOf(popSpecArray[x]) > -1) --
		(this.className).indexOf(popSpecArray[x]) = -1 when popSpecArray[x] is different than this.className
		example: taking in popMid className, and indexOf start 0 on popSpecArray[0] 
		'popMid'.indexOf('popSml') -- comparing all the letter in 'popMid' with 'popSml' and yield -1 because they are different
		until indexOf('popMid') then the functions will yield 1.
		if in a string str = 'I am going' then str.indexOf('a') = 3, and str.indexOf('a1') = -1
	@popWinName = Math.floor(Math.random()*10000001); -- I can give it anyname, but this can randomly give out a name
	@eval(popWinSpecs); -- help execute the specification, and only work properly with array value.
*/
function popWinHandler(){
	var x=0;
	var popWinSpecs;
	while(x < popSpecArray.length){
		if((this.className).indexOf(popSpecArray[x]) > -1){
			popWinSpecs = popSpecArray[x];
			var popWinUrl = this.href;
		}
		x++;
	}
	
	//Create a "unique" name for the window using a random number
	var popWinName = Math.floor(Math.random()*10000001);
	window.open(popWinUrl, popWinName, eval(popWinSpecs));
	return false;
}


function getPopClasElems(){
	var clasElems = document.getElementsByClassName('popMid');
	for(i in clasElems){
		var x=0;
		while(x < popSpecArray.length){
			if((clasElems[i].className).indexOf(popSpecArray[x]) > -1){
				clasElems[i].onclick = popWinHandler;
			}
			x++;
		}
	}
}



function start(){
	init();
	getPopClasElems();
}
window.onload = start();