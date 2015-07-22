var CryptoJS=CryptoJS||function(e,t){var i={},n=i.lib={},a=function(){},r=n.Base={extend:function(e){a.prototype=this;var t=new a;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},o=n.WordArray=r.extend({init:function(e,i){e=this.words=e||[],this.sigBytes=i!=t?i:4*e.length},toString:function(e){return(e||l).stringify(this)},concat:function(e){var t=this.words,i=e.words,n=this.sigBytes;if(e=e.sigBytes,this.clamp(),n%4)for(var a=0;e>a;a++)t[n+a>>>2]|=(i[a>>>2]>>>24-8*(a%4)&255)<<24-8*((n+a)%4);else if(65535<i.length)for(a=0;e>a;a+=4)t[n+a>>>2]=i[a>>>2];else t.push.apply(t,i);return this.sigBytes+=e,this},clamp:function(){var t=this.words,i=this.sigBytes;t[i>>>2]&=4294967295<<32-8*(i%4),t.length=e.ceil(i/4)},clone:function(){var e=r.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var i=[],n=0;t>n;n+=4)i.push(4294967296*e.random()|0);return new o.init(i,t)}}),s=i.enc={},l=s.Hex={stringify:function(e){var t=e.words;e=e.sigBytes;for(var i=[],n=0;e>n;n++){var a=t[n>>>2]>>>24-8*(n%4)&255;i.push((a>>>4).toString(16)),i.push((15&a).toString(16))}return i.join("")},parse:function(e){for(var t=e.length,i=[],n=0;t>n;n+=2)i[n>>>3]|=parseInt(e.substr(n,2),16)<<24-4*(n%8);return new o.init(i,t/2)}},c=s.Latin1={stringify:function(e){var t=e.words;e=e.sigBytes;for(var i=[],n=0;e>n;n++)i.push(String.fromCharCode(t[n>>>2]>>>24-8*(n%4)&255));return i.join("")},parse:function(e){for(var t=e.length,i=[],n=0;t>n;n++)i[n>>>2]|=(255&e.charCodeAt(n))<<24-8*(n%4);return new o.init(i,t)}},h=s.Utf8={stringify:function(e){try{return decodeURIComponent(escape(c.stringify(e)))}catch(t){throw Error("Malformed UTF-8 data")}},parse:function(e){return c.parse(unescape(encodeURIComponent(e)))}},u=n.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new o.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=h.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var i=this._data,n=i.words,a=i.sigBytes,r=this.blockSize,s=a/(4*r),s=t?e.ceil(s):e.max((0|s)-this._minBufferSize,0);if(t=s*r,a=e.min(4*t,a),t){for(var l=0;t>l;l+=r)this._doProcessBlock(n,l);l=n.splice(0,t),i.sigBytes-=a}return new o.init(l,a)},clone:function(){var e=r.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});n.Hasher=u.extend({cfg:r.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,i){return new e.init(i).finalize(t)}},_createHmacHelper:function(e){return function(t,i){return new d.HMAC.init(e,i).finalize(t)}}});var d=i.algo={};return i}(Math);!function(e){var t=CryptoJS,i=t.lib,n=i.Base,a=i.WordArray,t=t.x64={};t.Word=n.extend({init:function(e,t){this.high=e,this.low=t}}),t.WordArray=n.extend({init:function(t,i){t=this.words=t||[],this.sigBytes=i!=e?i:8*t.length},toX32:function(){for(var e=this.words,t=e.length,i=[],n=0;t>n;n++){var r=e[n];i.push(r.high),i.push(r.low)}return a.create(i,this.sigBytes)},clone:function(){for(var e=n.clone.call(this),t=e.words=this.words.slice(0),i=t.length,a=0;i>a;a++)t[a]=t[a].clone();return e}})}(),function(){function e(){return a.create.apply(a,arguments)}for(var t=CryptoJS,i=t.lib.Hasher,n=t.x64,a=n.Word,r=n.WordArray,n=t.algo,o=[e(1116352408,3609767458),e(1899447441,602891725),e(3049323471,3964484399),e(3921009573,2173295548),e(961987163,4081628472),e(1508970993,3053834265),e(2453635748,2937671579),e(2870763221,3664609560),e(3624381080,2734883394),e(310598401,1164996542),e(607225278,1323610764),e(1426881987,3590304994),e(1925078388,4068182383),e(2162078206,991336113),e(2614888103,633803317),e(3248222580,3479774868),e(3835390401,2666613458),e(4022224774,944711139),e(264347078,2341262773),e(604807628,2007800933),e(770255983,1495990901),e(1249150122,1856431235),e(1555081692,3175218132),e(1996064986,2198950837),e(2554220882,3999719339),e(2821834349,766784016),e(2952996808,2566594879),e(3210313671,3203337956),e(3336571891,1034457026),e(3584528711,2466948901),e(113926993,3758326383),e(338241895,168717936),e(666307205,1188179964),e(773529912,1546045734),e(1294757372,1522805485),e(1396182291,2643833823),e(1695183700,2343527390),e(1986661051,1014477480),e(2177026350,1206759142),e(2456956037,344077627),e(2730485921,1290863460),e(2820302411,3158454273),e(3259730800,3505952657),e(3345764771,106217008),e(3516065817,3606008344),e(3600352804,1432725776),e(4094571909,1467031594),e(275423344,851169720),e(430227734,3100823752),e(506948616,1363258195),e(659060556,3750685593),e(883997877,3785050280),e(958139571,3318307427),e(1322822218,3812723403),e(1537002063,2003034995),e(1747873779,3602036899),e(1955562222,1575990012),e(2024104815,1125592928),e(2227730452,2716904306),e(2361852424,442776044),e(2428436474,593698344),e(2756734187,3733110249),e(3204031479,2999351573),e(3329325298,3815920427),e(3391569614,3928383900),e(3515267271,566280711),e(3940187606,3454069534),e(4118630271,4000239992),e(116418474,1914138554),e(174292421,2731055270),e(289380356,3203993006),e(460393269,320620315),e(685471733,587496836),e(852142971,1086792851),e(1017036298,365543100),e(1126000580,2618297676),e(1288033470,3409855158),e(1501505948,4234509866),e(1607167915,987167468),e(1816402316,1246189591)],s=[],l=0;80>l;l++)s[l]=e();n=n.SHA512=i.extend({_doReset:function(){this._hash=new r.init([new a.init(1779033703,4089235720),new a.init(3144134277,2227873595),new a.init(1013904242,4271175723),new a.init(2773480762,1595750129),new a.init(1359893119,2917565137),new a.init(2600822924,725511199),new a.init(528734635,4215389547),new a.init(1541459225,327033209)])},_doProcessBlock:function(e,t){for(var i=this._hash.words,n=i[0],a=i[1],r=i[2],l=i[3],c=i[4],h=i[5],u=i[6],i=i[7],d=n.high,g=n.low,f=a.high,p=a.low,m=r.high,v=r.low,b=l.high,w=l.low,y=c.high,k=c.low,_=h.high,B=h.low,I=u.high,S=u.low,x=i.high,R=i.low,H=d,W=g,T=f,L=p,A=m,C=v,D=b,M=w,z=y,X=k,Y=_,O=B,P=I,j=S,J=x,U=R,Q=0;80>Q;Q++){var E=s[Q];if(16>Q)var F=E.high=0|e[t+2*Q],G=E.low=0|e[t+2*Q+1];else{var F=s[Q-15],G=F.high,$=F.low,F=(G>>>1|$<<31)^(G>>>8|$<<24)^G>>>7,$=($>>>1|G<<31)^($>>>8|G<<24)^($>>>7|G<<25),q=s[Q-2],G=q.high,K=q.low,q=(G>>>19|K<<13)^(G<<3|K>>>29)^G>>>6,K=(K>>>19|G<<13)^(K<<3|G>>>29)^(K>>>6|G<<26),G=s[Q-7],N=G.high,V=s[Q-16],Z=V.high,V=V.low,G=$+G.low,F=F+N+($>>>0>G>>>0?1:0),G=G+K,F=F+q+(K>>>0>G>>>0?1:0),G=G+V,F=F+Z+(V>>>0>G>>>0?1:0);E.high=F,E.low=G}var N=z&Y^~z&P,V=X&O^~X&j,E=H&T^H&A^T&A,et=W&L^W&C^L&C,$=(H>>>28|W<<4)^(H<<30|W>>>2)^(H<<25|W>>>7),q=(W>>>28|H<<4)^(W<<30|H>>>2)^(W<<25|H>>>7),K=o[Q],tt=K.high,it=K.low,K=U+((X>>>14|z<<18)^(X>>>18|z<<14)^(X<<23|z>>>9)),Z=J+((z>>>14|X<<18)^(z>>>18|X<<14)^(z<<23|X>>>9))+(U>>>0>K>>>0?1:0),K=K+V,Z=Z+N+(V>>>0>K>>>0?1:0),K=K+it,Z=Z+tt+(it>>>0>K>>>0?1:0),K=K+G,Z=Z+F+(G>>>0>K>>>0?1:0),G=q+et,E=$+E+(q>>>0>G>>>0?1:0),J=P,U=j,P=Y,j=O,Y=z,O=X,X=M+K|0,z=D+Z+(M>>>0>X>>>0?1:0)|0,D=A,M=C,A=T,C=L,T=H,L=W,W=K+G|0,H=Z+E+(K>>>0>W>>>0?1:0)|0}g=n.low=g+W,n.high=d+H+(W>>>0>g>>>0?1:0),p=a.low=p+L,a.high=f+T+(L>>>0>p>>>0?1:0),v=r.low=v+C,r.high=m+A+(C>>>0>v>>>0?1:0),w=l.low=w+M,l.high=b+D+(M>>>0>w>>>0?1:0),k=c.low=k+X,c.high=y+z+(X>>>0>k>>>0?1:0),B=h.low=B+O,h.high=_+Y+(O>>>0>B>>>0?1:0),S=u.low=S+j,u.high=I+P+(j>>>0>S>>>0?1:0),R=i.low=R+U,i.high=x+J+(U>>>0>R>>>0?1:0)},_doFinalize:function(){var e=this._data,t=e.words,i=8*this._nDataBytes,n=8*e.sigBytes;return t[n>>>5]|=128<<24-n%32,t[(n+128>>>10<<5)+30]=Math.floor(i/4294967296),t[(n+128>>>10<<5)+31]=i,e.sigBytes=4*t.length,this._process(),this._hash.toX32()},clone:function(){var e=i.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:32}),t.SHA512=i._createHelper(n),t.HmacSHA512=i._createHmacHelper(n)}(),jQuery.extend(jQuery.fn,{breakout:function(e){function t(){i(),A.bricksPerRow=A.bricksLayout[0].length,A.bricksWidth=(C.width-20)/A.bricksPerRow,P=A.ballX,j=A.ballY,x=A.paddleX-A.paddleWidth/2,U=A.paddleDeltaX,f(),n(),o(),l(),a(),g(),p(),q?C.addEventListener("touchmove",function(e){e.preventDefault(),R=e.touches[0].pageX-z,H=e.touches[0].pageY},!1):document.onmousemove=function(e){R=e.pageX-z,H=e.pageY}}function i(){for(var e=0;e<A.bricksTypes.length;e++)for(var t=0;t<A.bricksTypes[e].length;t++)A.bricksTypes[e][t]=_(1,4)}function n(){switch(A.paddleType){case"rectangle":M.drawImage(G,x,A.paddleY),M.font="12px cocon",M.textAlign="right",M.fillStyle="rgba(0,0,0,0.4)",M.fillText(A.name,x+A.paddleWidth-8,A.paddleY+30)}}function a(){M.font="normal 18pt cocon",M.textAlign="left",M.fillStyle="#d40038",M.fillText(A.name+":",165,575)}function r(){if(J){var e=A.paddleWidth/2;U=R>x?(R-e-x)/5:x>R?(R-e-x)/5:0,(0>x+U||x+U+A.paddleWidth>C.width)&&(U=0),x+=U}}function o(){M.drawImage(E,P-16,j-16)}function s(){if((j+O-A.ballRadius+16<0||d())&&(O=-O),(P+Y-A.ballRadius+16<0||P+Y+A.ballRadius+16>C.width||u())&&(Y=-Y),j+O+A.ballRadius-16>C.height&&(A.lives--,A.lives?(b(),D.trigger("lostLive",[{lives:A.lives}])):w()),j+O+A.ballRadius+16>=A.paddleY+A.paddleHeight/2&&j+O+A.ballRadius+16<=A.paddleY+A.paddleHeight/2+O+1&&P+Y+16>=x&&P+Y+16<=x+A.paddleWidth){O=-O;var e=(P+Y+16-x-A.paddleWidth/2)/35;Y+=e}Y=Y>Math.abs(O)+1?Math.abs(O)+1:Y<-Math.abs(O)-1?-Math.abs(O)-1:Y,P+=Y,j+=O}function l(){W=0;for(var e=0;e<A.bricksLayout.length;e++)for(var t=0;t<A.bricksLayout[e].length;t++){var i=A.bricksLayout[e][t];c(t,e,i),3===i&&W++}}function c(e,t,i){if(i>0&&3>i){var n;switch(A.bricksTypes[t][e]){case 1:n=0;break;case 2:n=80;break;case 3:n=160;break;case 4:n=240}M.drawImage($,n,0,80,72,e*A.bricksWidth+10,55*t,A.bricksWidth,80/A.bricksWidth*72)}else 3==i&&M.drawImage($,320,0,80,72,e*((C.width-40)/10)+10,55*t,80,72)}function h(e,t){T(C).trigger("hitBrick",[]);var i=A.bricksLayout[e][t]--;3===i&&(X++,A.bricksLayout[e][t]=0,D.trigger("score",[{score:X}]),5===X&&y()),O-=.1}function u(){for(var e=!1,t=0;t<A.bricksLayout.length;t++)for(var i=0;i<A.bricksLayout[t].length;i++)if(A.bricksLayout[t][i]){var n=i*A.bricksWidth,a=t*A.bricksHeight;(P+Y+A.ballRadius-16>=n&&P+A.ballRadius-16<=n||P+Y-A.ballRadius+16<=n+A.bricksWidth&&P-A.ballRadius+16>=n+A.bricksWidth)&&j+O-A.ballRadius+16<=a+A.bricksHeight&&j+O+A.ballRadius-16>=a&&(h(t,i),e=!0)}return e}function d(){for(var e=!1,t=0;t<A.bricksLayout.length;t++)for(var i=0;i<A.bricksLayout[t].length;i++)if(A.bricksLayout[t][i]){var n=i*A.bricksWidth,a=t*A.bricksHeight;(j+O-A.ballRadius+16<=a+A.bricksHeight&&j-A.ballRadius+16>=a+A.bricksHeight||j+O+A.ballRadius-16>=a&&j+A.ballRadiu-16<=a)&&P+Y+A.ballRadius-16>=n&&P+Y-A.ballRadius+16<=n+A.bricksWidth&&(h(t,i),e=!0)}return e}function g(){for(var e=C.height-48,t=2;t>=0;t--)A.lives>t?M.drawImage(F,0,0,44,38,C.width/2+100+44*t,e,44,38):M.drawImage(F,48,0,40,38,C.width/2+100+44*t,e,40,38)}function f(){M.clearRect(0,0,C.width,C.height),M.drawImage(Q,0,0)}function p(){M.fillStyle="rgba(0,0,0,0.5)",M.fillRect(0,0,C.width,C.height)}function m(){f(),l(),s(),r(),n(),o(),g(),a(),D.trigger("timeUpdate",[{elapsedTime:k(new Date-B)}])}function v(){O=-4,Y=_(-2,2),J=!0,U=0,f(),l(),n(),o(),g(),a(),setTimeout(function(){B=new Date,S=setInterval(m,20)},500)}function b(){P=C.width/2,j=C.height/3*2,O=0,Y=0,setTimeout(function(){O=-4,Y=_(-2,2)},1e3)}function w(){I=new Date-B,clearInterval(S),T(C).trigger("gameOver",[]),p(),setTimeout(function(){p()},30)}function y(){I=new Date-B,clearInterval(S),T(C).trigger("won",[{elapsedTime:k(I),time:I}]),p(),setTimeout(function(){p()},30)}function k(e){var t=e%1e3,i=(e-t)/1e3,n=i%60,a=Math.round(t/10),r=~~(i/60);return{minutes:r,seconds:n,milliseconds:a,clock:0===n?'<span class="seconds">0:00.</span>'+a:'<span class="seconds">'+r+":"+("0"+n).slice(-2)+".</span>"+a}}function _(e,t){return Math.floor(Math.random()*(t-e+1))+e}var B,I,S,x,R,H,W,T=jQuery,L={paddleType:"rectangle",paddleX:200,paddleY:430,paddleWidth:246,paddleHeight:53,paddleDeltaX:0,paddleDeltaY:0,paddleColor:"rgb(0,0,0)",ballX:400,ballY:340,ballRadius:12,ballColor:"rgb(0,0,0)",bricksPerRow:10,bricksHeight:55,bricksWidth:0,bricksLayout:[[1,1,1,1,1,1,3,1,1,1],[1,1,3,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,3,1,1],[1,1,1,3,1,1,1,1,1,1],[1,1,3,1,1,1,1,1,1,1]],bricksTypes:[[1,1,1,1,1,1,3,1,1,1],[1,1,3,1,1,1,1,1,1,1],[1,1,1,1,1,2,1,3,1,1],[1,1,1,3,1,1,1,1,1,1],[1,1,3,1,1,1,1,1,1,1]],lives:3},A=T.extend(!0,{},L,e),C=this[0],D=T(C),M=C.getContext("2d"),z=D.offset().left,X=0,Y=0,O=0,P=0,j=0,J=!1,U=0,Q=A.backgroundImage;Q.onload=function(){t()};var E=A.ballImage,F=A.livesImage,G=A.spoonImage,$=A.popsImage;$.onload=function(){t()};var q="createTouch"in document;return t(),T.extend({startGame:function(){v()},getElapsedTime:function(){return new Date-B},restart:function(){A.bricksLayout=[[1,1,1,1,1,1,3,1,1,1],[1,1,3,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,3,1,1],[1,1,1,3,1,1,1,1,1,1],[1,1,3,1,1,1,1,1,1,1]],A.lives=3,X=0,t(),v()}})}}),function(e){e.marap={};var t=e('input[name="name"]').val();ga("send","event","breakout-game","load-game",t);var i=e("#canvas").breakout({name:t,backgroundImage:e("#backgroundImage")[0],ballImage:e("#ballImage")[0],livesImage:e("#livesImage")[0],spoonImage:e("#spoonImage")[0],popsImage:e("#popsImage")[0]});e("#startButton").click(function(){ga("send","event","breakout-game","start-game"),e(this).closest(".overlay").fadeOut(200),setTimeout(function(){i.startGame()},400)}),e("#canvas").on("gameOver",function(){e("#gameOverOverlay").show(),ga("send","event","breakout-game","game-over")}),e("#canvas").on("lostLive",function(){ga("send","event","breakout-game","lost-live")}),e("#canvas").on("score",function(t,i){ga("send","event","breakout-game","score-game"),e("#score span").text(i.score)});var n=e("#time span");e("#canvas").on("won",function(t,i){ga("send","event","breakout-game","won-game"),e.marap=i;var a="kellogsActie";e("#wonOverlay").show(),e("#finalScore").html(i.elapsedTime.clock),n.html(i.elapsedTime.clock),e('input[name="clicks"]').val(0),e('input[name="time"]').val(i.time);var r=CryptoJS.SHA512(a),o=CryptoJS.SHA512("0/"+e.marap.time+r);e('input[name="token"]').val(o.toString()),ga("send","event","breakout-game","score","time",i.time)}),e("#sendScoreButton").click(function(){e(".play-button").click(),ga("send","event","breakout-game","send-score")}),e("#canvas").on("timeUpdate",function(e,t){n.html(t.elapsedTime.clock)}),e("#canvas").on("hitBrick",function(){ga("send","event","breakout-game","hitBrick")}),e(".restartGame").click(function(t){t.preventDefault(),i.restart(),e("#score span").text(0),e(t.target).closest(".overlay").hide(),ga("send","event","breakout-game","restart-game")})}(jQuery);