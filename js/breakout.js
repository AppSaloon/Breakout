(function( $ ){
    $.extend($.fn, {
        breakout: function(options){
        	var defaults = {
        		paddleType:"rectangle",
        		paddleX: 200,
        		paddleY: 460,
        		paddleWidth:100,
        		paddleHeight:15,
        		paddleDeltaX:0,
        		paddleDeltaY:0,
        		ballX: 300,
        		ballY: 300,
        		ballRadius: 10,
        		bricksPerRow: 0,
        		bricksHeight: 20,
        		bricksWidth: 0,
        		bricksLayout: [
        			[1,1,1,1,1,1,1,2],
				    [1,1,3,1,0,1,1,1],
				    [2,1,2,1,2,1,0,1],
				    [1,2,1,1,0,3,1,1]
        		],
        		bricksTypes: [
        			{
        				color: 'orange'
        			},{
        				color: 'rgb(100,200,100)'
        			},{
        				color: 'rgba(50,100,50,.5)'
        			}
        		]
        	};
        	var opts = $.extend( {}, defaults, options );

            var canvas = this[0];
            var context = canvas.getContext('2d');
            var score = 0;

            function init(){
            	opts.bricksPerRow = opts.bricksLayout[0].length;
            	opts.bricksWidth = canvas.width/opts.bricksPerRow;

            	drawPaddle();
				drawBall();
				createBricks();
            }

            function drawPaddle () {
            	switch (opts.paddleType) {
            		case "rectangle":
            			context.fillRect(opts.paddleX,opts.paddleY,opts.paddleWidth,opts.paddleHeight);
            			break;
            		default:
            			//default code
            	}
            }

            function drawBall() {
            	context.beginPath();
            	context.arc(opts.ballX,opts.ballY,opts.ballRadius,0,Math.PI*2,true);
            	context.fill(); 
            }

            function createBricks(){
    			for (var i=0; i < opts.bricksLayout.length; i++) {
        			for (var j=0; j < opts.bricksLayout[i].length; j++) {
            			drawBrick(j,i,opts.bricksLayout[i][j]);
        			}
    			}
			}

			function drawBrick(x,y,type) {
				if (type > 0) {
					context.fillStyle = opts.bricksTypes[type-1].color;
					context.fillRect(x*opts.bricksWidth,y*opts.bricksHeight,opts.bricksWidth,opts.bricksHeight);
				} else {
					context.clearRect(x*opts.bricksWidth,y*opts.bricksHeight,opts.bricksWidth,opts.bricksHeight);

				}
			}

			function animate() {
				drawPaddle();
				drawBall();
			}

            init();

            return $.extend({
		       	startGame: function() {
		       		console.log('test');
		       	}
		    });
        }
    });
})( jQuery );