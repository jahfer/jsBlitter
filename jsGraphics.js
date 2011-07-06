var WW, WH,
	 screen = new Object,
	 framerate;

/* Call Main() on load --------------------------------*/
window.onload = function() { main(); };
function set_canvas_size(w, h) { 
	WW = w; WH = h; 
	scr = document.createElement('canvas');
	scr.width = WW;
	scr.height = WH;
	var sCtx = scr.getContext('2d');
	screen = {
		canvas : scr,
		ctx : sCtx,
		w : WW,
		h : WH
	}
	document.body.appendChild(screen.canvas);
}

function set_timer(f) {
	framerate = f;
}

/* Deal with key presses --------------------------------*/
var key = new Object;
var key_events = new Object;

key.lookup = {
	8  : 'KEY_BACKSPACE',
	9  : 'KEY_TAB',
	13 : 'KEY_ENTER',
	16 : 'KEY_SHIFT',
	17 : 'KEY_CTRL',
	18 : 'KEY_ALT',
	20 : 'KEY_CAPSLOCK',
   27 : 'KEY_ESC',
   32 : 'KEY_SPACE',
   33 : 'KEY_PAGEUP',
   34 : 'KEY_PAGEDOWN',
   35 : 'KEY_END',
   36 : 'KEY_HOME',
	37 : 'KEY_LEFT',
	38 : 'KEY_UP',
	39 : 'KEY_RIGHT',
	40 : 'KEY_DOWN',
	46 : 'KEY_DELETE',
	48 : 'KEY_0',
	49 : 'KEY_1',
	50 : 'KEY_2',
	51 : 'KEY_3',
	52 : 'KEY_4',
	53 : 'KEY_5',
	54 : 'KEY_6',
	55 : 'KEY_7',
	56 : 'KEY_8',
	57 : 'KEY_9',
};

// Key pressed
key.status = {};
// setInterval
key.timer = {};
// interval
key.int = {};
// on completion
key.oncom = {};

function install_keyboard() {
	document.onkeydown = function(e) {
	   var k = (event || window.event).keyCode;
		if(key_events[key.lookup[k]] && !key.status[k]) {
			key_events[key.lookup[k]]();
			if(key.int[key.lookup[k]])
				key.timer[k] = setInterval(key_events[key.lookup[k]], framerate);
		}		
		key.status[k] = 1;
		return false;
	};
	
	document.onkeyup = function(e) {
	   var k = (event || window.event).keyCode;
		key.status[k] = 0;
		clearInterval(key.timer[k]);
		if(key.oncom[key.lookup[k]])
			key.oncom[key.lookup[k]]();
		return false;
	};
}

/* Callback Event Handler ---------------------------*/
function onCall(event, callback, interval, oncomplete) {
	if(event.substr(0,3) == 'KEY') {
		key_events[event] = callback;
		key.int[event] = interval || null;
		if(oncomplete != undefined)
			key.oncom[event] = oncomplete;
	}
}


/* Canvas Tools ------------------------------------*/
function create_canvas(w,h) {
	var cnv = document.createElement('canvas');
	cnv.width = w; cnv.height = h;
	var c = {
		ctx : cnv.getContext('2d'),
		canvas : cnv,
		w : cnv.width,
		h : cnv.height,
		clear : function() {
			this.ctx.clearRect(0, 0, this.w, this.h);
			screen.ctx.clearRect(0, 0, screen.w, screen.h);
		}
	}
	return c;
}

function load_image(source, ctx, x, y) {
	var img = new Image();
	img.src = source;	
	return img;
}

function blit(source, dest, x, y) {
	(source.canvas) ? 
		dest.ctx.drawImage(source.canvas, x, y) : 
		dest.ctx.drawImage(source, x, y);
}

function fill_canvas(dest, col) {
	dest.ctx.fillStyle = col;
	dest.ctx.fillRect(0, 0, dest.w, dest.h)
}