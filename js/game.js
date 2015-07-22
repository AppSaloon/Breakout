(function($) {
    $.marap = {};
    var contestantName = $('input[name="name"]').val();

    ga('send', 'event', 'breakout-game', 'load-game', contestantName);

    var game = $('#canvas').breakout({
        name:contestantName,
        backgroundImage : $('#backgroundImage')[0],
        ballImage : $('#ballImage')[0],
        livesImage : $("#livesImage")[0],
        spoonImage : $('#spoonImage')[0],
        popsImage : $('#popsImage')[0]
    });

    $('#startButton').click(function(){
    	ga('send', 'event', 'breakout-game', 'start-game');
        $(this).closest('.overlay').fadeOut(200);
        setTimeout(function () {
            game.startGame();
        },400);
    });

    $('#canvas').on('gameOver',function (e,result){
        $('#gameOverOverlay').show();
        ga('send', 'event', 'breakout-game', 'game-over');
    });

    $('#canvas').on('lostLive',function (e,result){
        ga('send', 'event', 'breakout-game', 'lost-live');
    });

    $('#canvas').on('score',function (e,result){
        ga('send', 'event', 'breakout-game', 'score-game');
        $('#score span').text(result.score);
    });

    var $time = $('#time span');

    $('#canvas').on('won',function (e,result){
    	ga('send', 'event', 'breakout-game', 'won-game');
        $.marap=result;
        var a = "kellogsActie";
        $('#wonOverlay').show();
        $('#finalScore').html(result.elapsedTime.clock);
        $time.html(result.elapsedTime.clock);
        $('input[name="clicks"]').val(0);
        $('input[name="time"]').val(result.time);
        var hash = CryptoJS.SHA512(a);
        var key128Bits = CryptoJS.SHA512(0+"/"+$.marap.time + hash);
        $('input[name="token"]').val(key128Bits.toString());
        ga('send', 'event', 'breakout-game', 'score', 'time', result.time);
    });
    
    $('#sendScoreButton').click(function(){
        $('.play-button').click();
        ga('send', 'event', 'breakout-game', 'send-score');
    });

    
    $('#canvas').on('timeUpdate',function (e,result){
        $time.html(result.elapsedTime.clock);
    });

    $('#canvas').on('hitBrick',function (e){
        ga('send', 'event', 'breakout-game', 'hitBrick');
    });

    $('.restartGame').click(function (e) {
        e.preventDefault();
        game.restart();
        $('#score span').text(0);
        $(e.target).closest('.overlay').hide();
        ga('send', 'event', 'breakout-game', 'restart-game');
    });
})( jQuery );