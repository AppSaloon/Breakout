(function( $ ){
    $.extend($.fn, {
        breakout: function(options){
        	var defaults = {
        		paddleType:"rectangle",
        		paddleX: 200,
        		paddleY: 430,
        		paddleWidth:246,
        		paddleHeight:53,
        		paddleDeltaX:0,
        		paddleDeltaY:0,
        		paddleColor: "rgb(0,0,0)",
        		ballX: 300,
        		ballY: 300,
        		ballRadius: 12,
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
			backgroundImage.onload = function () {
				init();
			};
			backgroundImage.src = "img/breakout_background.jpg";
			var ballImage = new Image();
			ballImage.src = 'img/bal.png';
			var livesImage = new Image();
			livesImage.src = 'img/levens_sprite.png';
			var spoonImage = new Image();
			spoonImage.src = 'img/spoon.png';

            function init(){
            	opts.bricksPerRow = opts.bricksLayout[0].length;
            	opts.bricksWidth = canvas.width/opts.bricksPerRow;

            	ballX = opts.ballX;
            	ballY = opts.ballY;
            	paddleX = opts.paddleX- (opts.paddleWidth/2);
            	paddleDeltaX = opts.paddleDeltaX;

            	drawBackground();
            	drawPaddle();
				drawBall();
				createBricks();
				drawName ();
				drawLives();

				showOverlay();

				document.onmousemove = function(e){
					cursorX = e.pageX - cursorCorrection;
					cursorY = e.pageY;
				};
            }

            function drawPaddle () {
            	switch (opts.paddleType) {
            		case "rectangle":
            			//context.fillStyle = opts.paddleColor;
            			//context.fillRect(paddleX ,opts.paddleY,opts.paddleWidth,opts.paddleHeight);
            			context.drawImage(spoonImage,paddleX,opts.paddleY);
            			context.font = "12px cocon";
            			context.fillStyle = "rgba(0,0,0,0.4)";
						context.fillText(opts.name, paddleX + opts.paddleWidth - 50 ,opts.paddleY + 30);
            			break;
            		default:
            			//default code
            	}
            }

            function drawName () {
            	context.font = 'normal 18pt cocon';
            	context.fillStyle ="#d40038";
            	context.fillText(opts.name, 165, 575);
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
            	//context.fillStyle = opts.ballColor;
            	//context.beginPath();
            	//context.arc(ballX,ballY,opts.ballRadius,0,Math.PI*2,true);
        		context.drawImage(ballImage, ballX-16, ballY-16);
            	//context.fill(); 
            }

            function moveBall(){
            	if (ballY + ballDeltaY - opts.ballRadius + 16 < 0 || collisionYWithBricks()){
			        ballDeltaY = -ballDeltaY;
			    }

			    if ((ballX + ballDeltaX - opts.ballRadius + 16 < 0) || (ballX + ballDeltaX + opts.ballRadius + 16 > canvas.width) || collisionXWithBricks()){  
			        ballDeltaX = -ballDeltaX;
			    }

			    if (ballY + ballDeltaY + opts.ballRadius -16 > canvas.height){
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

			    if (ballY + ballDeltaY + opts.ballRadius + 16 >= opts.paddleY + opts.paddleHeight/2 && ballY + ballDeltaY + opts.ballRadius + 16 <= opts.paddleY + opts.paddleHeight/2 + ballDeltaY + 1){
				    // and it is positioned between the two ends of the paddle (is on top)
				    if (ballX + ballDeltaX + 16 >= paddleX && ballX + ballDeltaX + 16 <= paddleX + opts.paddleWidth){
				        ballDeltaY = -ballDeltaY;
				        var quoficient = (ballX + ballDeltaX + 16 - paddleX - (opts.paddleWidth/2))/25;
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
			                    ((ballX + ballDeltaX + opts.ballRadius - 16 >= brickX) &&
			                    (ballX + opts.ballRadius - 16 <= brickX)) ||
			                    // barely touching from right
			                    ((ballX + ballDeltaX - opts.ballRadius + 16 <= brickX + opts.bricksWidth)&&
			                    (ballX - opts.ballRadius + 16 >= brickX + opts.bricksWidth))
			                    ){      
			                    if ((ballY + ballDeltaY -opts.ballRadius + 16 <= brickY + opts.bricksHeight) &&
			                        (ballY + ballDeltaY + opts.ballRadius - 16 >= brickY)){                                                    
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
			                    ((ballY + ballDeltaY - opts.ballRadius + 16 <= brickY + opts.bricksHeight) && 
			                    (ballY - opts.ballRadius + 16 >= brickY + opts.bricksHeight)) ||
			                    // barely touching from above
			                    ((ballY + ballDeltaY + opts.ballRadius - 16 >= brickY) &&
			                    (ballY + opts.ballRadiu -16 <= brickY ))){
			                    if (ballX + ballDeltaX + opts.ballRadius - 16 >= brickX && 
			                        ballX + ballDeltaX - opts.ballRadius +16 <= brickX + opts.bricksWidth){                                      
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
				var y =canvas.height-48;
				for (var i = 3 - 1; i >= 0; i--) {
					if (opts.lives > i) {
						context.drawImage(livesImage,0,0,44,38,canvas.width/2+100+ (44*i), y, 44,38);
					} else {
						context.drawImage(livesImage,48,0,40,38,canvas.width/2+100+ (44*i), y, 40,38);
					}
				}
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
				drawName ();

				$canvas.trigger('timeUpdate', [{
					elapsedTime: millisecondsToStr(new Date() - startTime)
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
				setTimeout(function() {
					showOverlay();
				}, 30);
			}

			function wonGame() {
				elapsedTime = (new Date()) - startTime;
				clearInterval(gameLoop);
				$(canvas).trigger('won',[{
					elapsedTime: millisecondsToStr(elapsedTime)
				}]);
				showOverlay();
				setTimeout(function() {
					showOverlay();
				}, 30);
			}

			function millisecondsToStr (ms) {
	            var secondRest = ms % 1000;
	            var totalSeconds = (ms - secondRest) / 1000;
				var seconds = totalSeconds % 60;

	            var milliseconds = Math.round( secondRest / 10);
	            var minutes = ~~(totalSeconds / 60);

	            return {
	            	minutes : minutes,
	                seconds : seconds,
	                milliseconds : milliseconds,
	                clock : (seconds === 0)? '<span class="seconds">0:00.</span>'+ milliseconds:'<span class="seconds">' + minutes + ':' + ('0' + seconds).slice(-2) + ".</span>" + milliseconds
	            };
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