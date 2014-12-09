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
        		paddleColor: "rgb(0,0,0)",
        		ballX: 300,
        		ballY: 300,
        		ballRadius: 10,
        		ballColor: "rgb(0,0,0)",
        		bricksPerRow: 0,
        		bricksHeight: 20,
        		bricksWidth: 0,
        		bricksLayout: [
        			[2,2,2,2,2,3,2,2],
				    [2,2,3,2,2,2,3,2],
				    [2,2,2,2,2,3,2,2],
				    [2,2,3,2,2,2,2,2]
        		],
        		bricksTypes: [
        			{
        				color: 'orange'
        			},{
        				color: 'rgb(100,200,100)'
        			},{
        				color: 'rgba(50,100,50,.5)'
        			}
        		],
        		lives: 3
        	};
        	var opts = $.extend( {}, defaults, options );

            var canvas = this[0];
            var $canvas = $(canvas);
            var context = canvas.getContext('2d');
            var cursorCorrection = $canvas.position().left;
            var score = 0;
            var startTime;
            var elapsedTime;
            var gameLoop;
            var gameResult;
            var ballDeltaX = 0;
			var ballDeltaY =0;
			var ballX = 0;
    		var ballY = 0;
    		var paddleX;
    		var paddleMove = false;
    		var	paddleDeltaX = 0;
    		var paddleSpeed = 10;
    		var cursorX;
			var cursorY;
			var bricksToDo;
			var backgroundImage = new Image();
			backgroundImage.src = "img/breakout_background.jpg";

            function init(){
            	opts.bricksPerRow = opts.bricksLayout[0].length;
            	opts.bricksWidth = canvas.width/opts.bricksPerRow;

            	ballX = opts.ballX;
            	ballY = opts.ballY;
            	paddleX = opts.paddleX- (opts.paddleWidth/2);
            	paddleDeltaX = opts.paddleDeltaX;

            	backgroundImage.src = "img/breakout_background.jpg";
            	drawBackground();
            	drawPaddle();
				drawBall();
				createBricks();

				showOverlay();

				document.onmousemove = function(e){
					cursorX = e.pageX - cursorCorrection;
					cursorY = e.pageY;
				};
            }

            function drawPaddle () {
            	switch (opts.paddleType) {
            		case "rectangle":
            			context.fillStyle = opts.paddleColor;
            			context.fillRect(paddleX ,opts.paddleY,opts.paddleWidth,opts.paddleHeight);
            			context.font = "12px Verdana";
            			context.fillStyle = "red";
						context.fillText("Lotte", paddleX + opts.paddleWidth - 30 ,opts.paddleY + 10);
            			break;
            		default:
            			//default code
            	}
            }

            function movePaddle() {
            	if (paddleMove) {
            		var paddleCorrection = opts.paddleWidth/2;
            		if (cursorX > paddleX) {
            			paddleDeltaX = (cursorX - paddleCorrection - paddleX)/5;
            		} else if (cursorX < paddleX) {
            			paddleDeltaX = (cursorX - paddleCorrection - paddleX)/5;
            		} else {
            			paddleDeltaX = 0;
            		}

            		if (paddleX + paddleDeltaX < 0 || paddleX + paddleDeltaX + opts.paddleWidth >canvas.width){
				        paddleDeltaX = 0; 
				    }

				    paddleX = paddleX + paddleDeltaX;
            	}
            }

            function drawBall() {
            	context.fillStyle = opts.ballColor;
            	context.beginPath();
            	context.arc(ballX,ballY,opts.ballRadius,0,Math.PI*2,true);
            	context.fill(); 
            }

            function moveBall(){
            	if (ballY + ballDeltaY - opts.ballRadius < 0 || collisionYWithBricks()){
			        ballDeltaY = -ballDeltaY;
			    }

			    if ((ballX + ballDeltaX - opts.ballRadius < 0) || (ballX + ballDeltaX + opts.ballRadius > canvas.width) || collisionXWithBricks()){  
			        ballDeltaX = -ballDeltaX;
			    }

			    if (ballY + ballDeltaY + opts.ballRadius > canvas.height){
			    	opts.lives--;
			        if (!opts.lives) {
			        	endGame();
			        } else {
			        	reStartGame();
			        	$canvas.trigger('lostLive',[{
							lives: opts.lives 
						}]);
			        }
			    }

			    if (ballY + ballDeltaY + opts.ballRadius >= opts.paddleY + opts.paddleHeight/2 && ballY + ballDeltaY + opts.ballRadius <= opts.paddleY + opts.paddleHeight/2 + ballDeltaY + 1){
				    // and it is positioned between the two ends of the paddle (is on top)
				    if (ballX + ballDeltaX >= paddleX && ballX + ballDeltaX <= paddleX + opts.paddleWidth){
				        ballDeltaY = -ballDeltaY;
				        var quoficient = (ballX + ballDeltaX - paddleX - (opts.paddleWidth/2))/25;
				        ballDeltaX = ballDeltaX + quoficient;
				    }
				}

				// prevents ball from going to much in an angle
				ballDeltaX = ballDeltaX > Math.abs(ballDeltaY)+1 ? Math.abs(ballDeltaY)+1 : (ballDeltaX < -Math.abs(ballDeltaY)-1 ? -Math.abs(ballDeltaY)-1 : ballDeltaX);

			    // Move the ball
			    ballX = ballX + ballDeltaX;
			    ballY = ballY + ballDeltaY;
			}

            function createBricks(){
            	bricksToDo = 0;
    			for (var i=0; i < opts.bricksLayout.length; i++) {
        			for (var j=0; j < opts.bricksLayout[i].length; j++) {
        				var brick = opts.bricksLayout[i][j];
            			drawBrick(j,i,brick);
            			if (brick === 3){
            				bricksToDo++;
            			}
        			}
    			}
			}

			function drawBrick(x,y,type) {
				if (type > 0) {
					context.fillStyle = opts.bricksTypes[type-1].color;
					context.fillRect(x*opts.bricksWidth,y*opts.bricksHeight,opts.bricksWidth,opts.bricksHeight);
				} else {
					//context.clearRect(x*opts.bricksWidth,y*opts.bricksHeight,opts.bricksWidth,opts.bricksHeight);
				}
			}

			function brickHit (i,j) {
				var brick = opts.bricksLayout[i][j] --;

				if (brick === 3) {
					score ++;
					opts.bricksLayout[i][j] = 0;
					$canvas.trigger('score',[{
						score: score
					}]);
					if (score === 5) {
						wonGame();
					} 
					

				}
				ballDeltaY = ballDeltaY - 0.1;
			}

			function collisionXWithBricks(){
			    var bumpedX = false;    
			    for (var i=0; i < opts.bricksLayout.length; i++) {
			        for (var j=0; j < opts.bricksLayout[i].length; j++) {
			            if (opts.bricksLayout[i][j]){ // if brick is still visible
			                var brickX = j * opts.bricksWidth;
			                var brickY = i * opts.bricksHeight;
			                if (
			                    // barely touching from left
			                    ((ballX + ballDeltaX + opts.ballRadius >= brickX) &&
			                    (ballX + opts.ballRadius <= brickX)) ||
			                    // barely touching from right
			                    ((ballX + ballDeltaX - opts.ballRadius <= brickX + opts.bricksWidth)&&
			                    (ballX - opts.ballRadius >= brickX + opts.bricksWidth))
			                    ){      
			                    if ((ballY + ballDeltaY -opts.ballRadius <= brickY + opts.bricksHeight) &&
			                        (ballY + ballDeltaY + opts.ballRadius >= brickY)){                                                    
			                        // weaken brick and increase score
			                        brickHit(i,j);
			 
			                        bumpedX = true;
			                    }
			                }
			            }
			        }
			    }
			    return bumpedX;
			}               
			 
			function collisionYWithBricks(){
			    var bumpedY = false;
			    for (var i=0; i < opts.bricksLayout.length; i++) {
			        for (var j=0; j < opts.bricksLayout[i].length; j++) {
			            if (opts.bricksLayout[i][j]){ // if brick is still visible
			                var brickX = j * opts.bricksWidth;
			                var brickY = i * opts.bricksHeight;
			       			if (
			                    // barely touching from below
			                    ((ballY + ballDeltaY - opts.ballRadius <= brickY + opts.bricksHeight) && 
			                    (ballY - opts.ballRadius >= brickY + opts.bricksHeight)) ||
			                    // barely touching from above
			                    ((ballY + ballDeltaY + opts.ballRadius >= brickY) &&
			                    (ballY + opts.ballRadius <= brickY ))){
			                    if (ballX + ballDeltaX + opts.ballRadius >= brickX && 
			                        ballX + ballDeltaX - opts.ballRadius <= brickX + opts.bricksWidth){                                      
			                        // weaken brick and increase score
			                        brickHit(i,j); 
			                        bumpedY = true;
			                    }                       
			                }
			            }
			        }
			    }
			    return bumpedY;
			}

			function drawLives() {
				/*var y =canvas.height-20;
				for (var i = opts.lives - 1; i >= 0; i--) {
					context.fillRect(canvas.width/2+ (20*i),y,10,10);
				}*/
			}

			function drawBackground () {
				context.clearRect(0,0,canvas.width,canvas.height);
				context.drawImage(backgroundImage,0,0);
			}

			function showOverlay() {
				context.fillStyle = "rgba(0,0,0,0.5)";
				context.fillRect(0,0,canvas.width,canvas.height);
			}
 
			function animate() {
				drawBackground();

				createBricks();
				
				moveBall();
				movePaddle();
				drawPaddle();
				drawBall();

				drawLives();

				$canvas.trigger('timeUpdate', [{
					elapsedTime: new Date() - startTime
				}]);
			}

			function startGame() {
				ballDeltaY = -4;
    			ballDeltaX = -2;
    			paddleMove = false;
    			paddleDeltaX = 0;
    			startTime = new Date();

		       	gameLoop = setInterval(animate,20);

		       	$(canvas).mousedown(function (e){
		       		paddleMove= true;
		       	});
		       	$(document).mouseup(function(e){
		       		paddleMove= false;
		       	});
			}

			function reStartGame () {
				ballX = canvas.width/2;
        		ballY = (canvas.height/3)*2;
				ballDeltaY = 0;
    			ballDeltaX = 0;
    			setTimeout(function () {
    				ballDeltaY = -4;
    				ballDeltaX = -2;
    			}, 1000);
			}

			function endGame() {
				elapsedTime = new Date() - startTime;
				clearInterval(gameLoop);
				$(canvas).trigger('gameOver',[]);
				showOverlay();
			}

			function wonGame() {
				elapsedTime = (new Date()) - startTime;
				clearInterval(gameLoop);
				$(canvas).trigger('won',[{
					elapsedTime: elapsedTime
				}]);
				showOverlay();
			}

            init();

            return $.extend({
		       	startGame: function() {
		       		startGame();
		       	},
		       	getElapsedTime: function () {
		       		return (new Date()) - startTime;
		       	}
		    });
        }
    });
})( jQuery );