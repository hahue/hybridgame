
/* -----

	game entities
		
	------			*/

	/*************************/
	/*						 */
	/*		a player entity	 */
	/*						 */
	/*************************/
	var PlayerEntity = me.ObjectEntity.extend(
	{	
      
      /* -----

			constructor
			
		  ------			*/
		
		init:function (x, y, settings)
		{
			// call the constructor
			this.parent(x, y , settings);
			
			// set the default horizontal & vertical speed (accel vector)
			this.setVelocity(3, 20);
         
			// adjust the bounding box
			this.updateColRect(2,26, -1,0);
			
			// set the display to follow our position on both axis
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
			
		},
	
		/* -----

			update the player pos
			
		  ------			*/
		update : function ()
		{
				
			if (me.input.isKeyPressed('left'))
			{
				// flip the sprite on horizontal axis
				this.flipX(true);
				// update the entity velocity
				this.vel.x -= this.accel.x * me.timer.tick;
			}
			else if (me.input.isKeyPressed('right'))
			{
				// unflip the sprite
				this.flipX(false);
				// update the entity velocity
				this.vel.x += this.accel.x * me.timer.tick;
			}
			else
			{
				this.vel.x = 0;
			}
			if (me.input.isKeyPressed('jump'))
			{	
				if (!this.jumping && !this.falling) 
				{
					// set current vel to the maximum defined value
					// gravity will then do the rest
					this.vel.y = -this.maxVel.y * me.timer.tick;
					// set the jumping flag
					this.jumping = true;
				}
			}
			
			// check & update player movement
			this.updateMovement();
			
			// check for collision with sthg
			var res = me.game.collide(this);
                 
			// update animation
			if (this.vel.x!=0 || this.vel.y!=0)
			{
				// update objet animation
				this.parent(this);
				return true;
			}
			
			// else inform the engine we did not perform
			// any update (e.g. position, animation)
			return false;
		}

	});
	
	var CoinEntity = me.CollectableEntity.extend({
	    // extending the init function is not mandatory
	    // unless you need to add some extra initialization
	    init: function(x, y, settings) {
	        // call the parent constructor
	        this.parent(x, y, settings);
	    },
	 
	    // this function is called by the engine, when
	    // an object is touched by something (here collected)
	    onCollision: function() {
	        // do something when collected
	 
	        // make sure it cannot be collected "again"
	        this.collidable = false;
	        // remove it
	        me.game.remove(this);
	    }
	 
	});	