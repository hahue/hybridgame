
// game ressources
var g_ressources= [  {name: "tileset-platformer",	type:"image",	src: "data/tiles/tileset-platformer.png"},
                     {name: "level02",               type: "tmx",	src: "data/tmx/test02.tmx"},
					 {name: "level01",               type: "tmx",	src: "data/tmx/test01.tmx"},                     
                     {name: "helmer",     		type:"image",	src: "data/sprite/helmer.png"}
                  ]; 

var isTouchSupported = 'ontouchstart' in window;
var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
      
		// init the video
		if (!me.video.init('jsapp', 320, 200, false, 1.0))
		{
			alert("Kein HTML5 Support!");
			return;
		}
		
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all ressources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all ressources to be loaded
		me.loader.preload(g_ressources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
		
		me.debug.renderHitBox = true;
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
      
		// add our player entity in the entity pool
		me.entityPool.add("myPlayer", PlayerEntity);
			
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,		"left");
		me.input.bindKey(me.input.KEY.RIGHT,	        "right");
		me.input.bindKey(me.input.KEY.X,		"jump", true);
                me.input.bindKey(me.input.KEY.M,                "right");
		me.input.bindKey(me.input.KEY.N,		"left");
 
		// start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
      	// load a level
		me.levelDirector.loadLevel("level02");
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	document.getElementById("left").addEventListener(startEvent,left,false);
	document.getElementById("left").addEventListener(endEvent,left_stop,false);

	document.getElementById("jump").addEventListener(startEvent,jump,false);
	document.getElementById("jump").addEventListener(endEvent,jump_stop,false);

	document.getElementById("right").addEventListener(startEvent,right,false);
	document.getElementById("right").addEventListener(endEvent,right_stop,false);

	jsApp.onload();
});

function left()
{
	me.input.triggerKeyEvent(me.input.KEY.LEFT, true);	
}

function left_stop() 
{
	me.input.triggerKeyEvent(me.input.KEY.LEFT, false);
}

function jump()
{
	me.input.triggerKeyEvent(me.input.KEY.X, true);	
}

function jump_stop() 
{
	me.input.triggerKeyEvent(me.input.KEY.X, false);
}

function right()
{
	me.input.triggerKeyEvent(me.input.KEY.RIGHT, true);	
}

function right_stop() 
{
	me.input.triggerKeyEvent(me.input.KEY.RIGHT, false);
}