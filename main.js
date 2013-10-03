var jsApp = {

	// game ressources
	g_ressources : [ {
		name : "tileset-platformer" ,
		type : "image" ,
		src : "data/tiles/tileset-platformer.png"
	} , {
		name : "tileset2" ,
		type : "image" ,
		src : "data/tiles/tileset2.png"
	} , {
		name : "level02" ,
		type : "tmx" ,
		src : "data/tmx/test02.tmx"
	} , {
		name : "level01" ,
		type : "tmx" ,
		src : "data/tmx/level1.tmx"
	} , {
		name : "level03" ,
		type : "tmx" ,
		src : "data/tmx/test01.tmx"
	} , {
		name : "helmer" ,
		type : "image" ,
		src : "data/sprite/helmer.png"
	} , {
		name : "spinning_coin_gold" ,
		type : "image" ,
		src : "data/sprite/spinning_coin_gold.png"
	} , {
		name : "tileset3" ,
		type : "image" ,
		src : "data/tiles/tileset3.png"
	} , {
		name : "tileset4" ,
		type : "image" ,
		src : "data/tiles/tileset4.png"
	} , {
		name : "28205" ,
		type : "image" ,
		src : "data/tiles/28205.png"
	} ] ,

	/*
	 * ---
	 * 
	 * Initialize the jsApp
	 * 
	 * ---
	 */
	onload : function() {
		// init the video
		// if (!me.video.init('jsapp', window.innerWidth*0.8 ,
		// window.innerHeight*0.60, false, 1.0)) {
		if (!me.video.init('jsapp', screen.width * window.devicePixelRatio * 0.8, screen.width * window.devicePixelRatio * 0.5, false, 1.0)) {

			alert("Kein HTML5 Support!");
			return;
		}

		// initialize the "audio"
		me.audio.init("mp3,ogg");

		// set all ressources to be loaded
		me.loader.onload = this.loaded.bind(this);

		// set all ressources to be loaded
		me.loader.preload(this.g_ressources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);

		me.debug.renderHitBox = false;
		me.debug.renderCollisionMap = false;
		me.debug.renderDirty = false;
		me.debug.renderVelocity = false;
		me.debug.renderVelocity = false;
		me.sys.isMobile = true;

	} ,

	/*
	 * ---
	 * 
	 * callback when everything is loaded
	 * 
	 * ---
	 */
	loaded : function() {
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());

		// add our player entity in the entity pool
		me.entityPool.add("myPlayer", PlayerEntity);
		me.entityPool.add("CoinEntity", CoinEntity);

		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.X, "jump", true);
		me.input.bindKey(me.input.KEY.M, "right");
		me.input.bindKey(me.input.KEY.N, "left");

		// start the game
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff */
var PlayScreen = me.ScreenObject.extend({

	onResetEvent : function() {
		// stuff to reset on state change
		// load a level

		me.levelDirector.loadLevel("level01");
	} ,

	/*
	 * ---
	 * 
	 * action to perform when game is finished (state change)
	 * 
	 * ---
	 */
	onDestroyEvent : function() {

	}

});

// bootstrap :)
window.onReady(function() {
	var isTouchSupported = 'ontouchstart' in window;
	var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
	// var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
	var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

	var left = function() {
		me.input.triggerKeyEvent(me.input.KEY.LEFT, true);
	};

	var left_stop = function() {
		me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
	};

	var jump = function() {
		me.input.triggerKeyEvent(me.input.KEY.X, true);
	};

	var jump_stop = function() {
		me.input.triggerKeyEvent(me.input.KEY.X, false);
	};

	var right = function() {
		me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);
	};

	var right_stop = function() {
		me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
	};

	document.getElementById("left").addEventListener(startEvent, left, false);
	document.getElementById("left").addEventListener(endEvent, left_stop, false);

	document.getElementById("jump").addEventListener(startEvent, jump, false);
	document.getElementById("jump").addEventListener(endEvent, jump_stop, false);

	document.getElementById("right").addEventListener(startEvent, right, false);
	document.getElementById("right").addEventListener(endEvent, right_stop, false);

	jsApp.onload();
	// resize_canvas();

});

// function resize_canvas() {
// canvas = document.getElementById("jsapp");
//    
// if (canvas.width < window.innerWidth)
// {
// canvas.width = window.innerWidth;
// }
//
// if (canvas.height < window.innerHeight)
// {
// canvas.height = window.innerHeight/2;
// }
//
// alert("width="+window.innerHeight);
//    
// me.video.onresize(null);
//    
// }
