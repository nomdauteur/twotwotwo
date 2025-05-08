let points = 0;
let lives = 3;

function drawLeaderboard() {
  ll = document.getElementById("leaderboard");

  while (ll.firstChild) {
            ll.removeChild(ll.lastChild);
        }

        var h = document.createElement("h1");
        h.textContent=setText("Лучшие математики","Best at maths");
        h.style.textAlign="left";
        h.style.paddingLeft=vmin(2);

        ll.appendChild(h);


  for (i = 0; i < window.leaderboard.entries.length;i++) {
    var d = document.createElement("p");
    d.style.display="table-row";
var d1=document.createElement("div");
d1.style.display="table-cell";
d1.style.textAlign="left";
d1.style.paddingLeft=vmin(2);

var d2=document.createElement("div");
d2.style.display="table-cell";
d2.style.textAlign="right";
d2.style.paddingRight=vmin(2);

d1.textContent=window.leaderboard.entries[i].rank+". "+window.leaderboard.entries[i].player.publicName;

d2.textContent=window.leaderboard.entries[i].score;
d.appendChild(d1);
d.appendChild(d2);

    ll.appendChild(d);
  }
  
}

function lose() {
        YaGames.init()

    .then((ysdk) => {

      ysdk.getLeaderboards()
  .then(lb => {
    console.log("Will now set with "+Math.max(points,window.prev_score));

    // Без extraData.
    lb.setLeaderboardScore('twotwotwo', Math.max(points,window.prev_score));
    window.prev_score = Math.max(points,window.prev_score);
    
    
  });

        ysdk.features.GameplayAPI?.stop();

    });

    document.getElementById("lives").textContent=setText("Вы проиграли. Начать новую игру?", "You lost. Play again?");

    var btn2 = document.createElement("button");
                           //btn.setAttribute("value",i+'_'+j);
                           btn2.className = btn2.className + "button";
                           
                           btn2.textContent=setText("Ага","Ok");
                           btn2.onclick = function() {document.getElementById(d.id).style.display = "none";
                                        YaGames.init()

    .then((ysdk) => {

          ysdk.adv.showFullscreenAdv({

    callbacks: {

        onClose: function(wasShown) {
          while (document.getElementById("game").firstChild) {
            document.getElementById("game").removeChild(document.getElementById("game").lastChild);
        }
        document.body.removeChild(document.getElementById("leaderboard"));
          loadFunction();

          

        },

        onError: function(error) {

          console.log(error);

        }

    }

})});
                         };

document.getElementById("lives").appendChild(btn2);
                          

    
}

function setTimer(){
    window.sec = 10.0;
    window.timer = setInterval(function(){
         

        document.getElementById('safeTimerDisplay').innerHTML=setText("Таймер: ","Timer: ")+Math.floor(sec);
        window.sec=window.sec-0.01;
        if (window.sec < 0) {
          lives -=1;
        document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
        clearInterval(window.timer);
        if (lives == 0) {
    lose();
    
        }
        else displayProblem();
            
        }
    }, 10);
    
   
    
}

function newGame() {
  console.log("New game");
  lives = 3;
  points = 0;
  document.getElementById("points").textContent=setText("Счет: ","Count: ")+points;
  document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);

   YaGames.init()

    .then((ysdk) => {

       ysdk.getLeaderboards()
  .then(lb => {
    // С использованием всех значений по умолчанию.
    lb.getLeaderboardEntries('twotwotwo', { quantityTop: 5, includeUser: true, quantityAround: 1 })
      .then(res => {console.log(res); window.leaderboard=res; drawLeaderboard();});
        });
        // Informing about starting the gameplay.

        ysdk.features.GameplayAPI?.start()


    });    
  displayProblem();
}

function getRandomProblem() {
  var action = Math.floor((Math.random()*5));
  var problem;
  var correct_answer;
  var other_answer;
  var base;
  var m;
  var n;
  if (action == 0) {
      base = Math.floor((Math.random()*8))+2;
      problem=""+base+"+"+base+String.fromCodePoint(183)+base;
      correct_answer=base+base*base;
      other_answer=(base+base)*base;
      if (correct_answer == other_answer) {
    other_answer = correct_answer+1;
  }
  }
  if (action == 1) {
      base = Math.floor((Math.random()*8))+2;
      problem=""+base+String.fromCodePoint(8722)+base+String.fromCodePoint(183)+base;
      correct_answer=(""+(base-base*base)).replace("-",String.fromCodePoint(8722));
      other_answer=0;
      if (correct_answer == other_answer) {
    other_answer = correct_answer+1;
  }
  }
  if (action == 2) {
      base = Math.floor((Math.random()*4))+2;
      if (base < 3) m = Math.floor((Math.random()*8))+2;
      else m = Math.floor((Math.random()*4))+2;
      var off = Math.floor((Math.random()*m/2))+1;
      problem=""+base+"<sup>"+m+"</sup>";
      correct_answer=Math.pow(base,m);
      other_answer=Math.pow(base,m-off);
      if (correct_answer == other_answer) {
    other_answer = correct_answer*base;
  }
  }
  if (action == 3) {
      base = Math.floor((Math.random()*4))+2;
      m =  Math.floor((Math.random()*8))+2;
      n =  Math.floor((Math.random()*8))+2;
      problem=""+base+"<sup>"+m+"</sup>"+String.fromCodePoint(183)+base+"<sup>"+n+"</sup>";
      correct_answer=""+base+"<sup>"+(m+n)+"</sup>";
      other_answer=""+base+"<sup>"+(m*n)+"</sup>";
      if ((m+n) == m*n) {
    other_answer = ""+base+"<sup>"+(m*n+1)+"</sup>";
  }
  }
  if (action == 4) {
      base = Math.floor((Math.random()*4))+2;
      m =  Math.floor((Math.random()*8))+2;
      problem=""+base+"<sup>"+m+"</sup>+"+base+"<sup>"+m+"</sup>";
      correct_answer=""+base+"<sup>"+(m+1)+"</sup>";
      other_answer=""+base+"<sup>"+(m+m)+"</sup>";
      if (m+1 == m+m) {
    other_answer = ""+base+"<sup>"+(m+m+1)+"</sup>";
  }
  }
  

  return {"problem":problem,"correct_answer":correct_answer,"other_answer":other_answer}
}

function displayCorrect(id) {
  clearInterval(window.timer);
  document.getElementById("right_button").removeAttribute("class");
    document.getElementById("left_button").removeAttribute("class");
    var points_earned = 10*Math.floor(window.sec);
        points +=points_earned;
        if (points > window.prev_score)
        {
          YaGames.init()

    .then((ysdk) => {

      ysdk.getLeaderboards()
  .then(lb => {
   
    lb.setLeaderboardScore('twotwotwo', points);
    window.prev_score = points;
    
  });

    });
     
  }

        document.getElementById("points").innerHTML=setText("Счет: ","Count: ")+points;
        document.getElementById("points").innerHTML+="   <b style=\"color:green\">+"+points_earned+"</b>";
        
        console.log(document.getElementById("points"));
        
        
        displayProblem();
}

function displayIncorrect(id) {
  document.getElementById("points").innerHTML=setText("Счет: ","Count: ")+points;
  clearInterval(window.timer);
  document.getElementById("right_button").removeAttribute("class");
    document.getElementById("left_button").removeAttribute("class");
          lives -=1;
        document.getElementById("lives").textContent=setText("Осталось жизней: ","Lives left: ")+String.fromCodePoint(10084).repeat(lives);
        if (lives == 0) {
          lose();
        }
        else displayProblem();
        
}

function displayProblem() {

  

  problem = getRandomProblem();

  document.getElementById("problem_setting").innerHTML=problem.problem;


  var shuffle = Math.floor(Math.random()*2);
  
  if (shuffle==1) {
    document.getElementById("right_button").innerHTML=problem.correct_answer;
    document.getElementById("left_button").innerHTML=problem.other_answer;
    document.getElementById("right_button").onclick=function(){
        displayCorrect("right_button");
    };
        document.getElementById("left_button").onclick=function(){
        displayIncorrect("left_button");
    };
    document.getElementById("right_button").className="correct";
    document.getElementById("left_button").className="incorrect";

  }
  else {
    document.getElementById("left_button").innerHTML=problem.correct_answer;
    document.getElementById("right_button").innerHTML=problem.other_answer;

    document.getElementById("left_button").onclick=function(){
        displayCorrect("left_button");
    };

    document.getElementById("right_button").onclick=function(){
        displayIncorrect("right_button");
    };
    document.getElementById("right_button").className="incorrect";
    document.getElementById("left_button").className="correct";
  }
  clearInterval(window.timer);
  setTimer();
  
}


function load() {


   YaGames.init()

    .then((ysdk) => {

        
        document.getElementById("lang").textContent=ysdk.environment.i18n.lang;
        ysdk.features.LoadingAPI?.ready();
         ysdk.getLeaderboards()
  .then(lb => {
    // С использованием всех значений по умолчанию.
    lb.getLeaderboardEntries('twotwotwo', { quantityTop: 5, includeUser: true, quantityAround: 3 })
      .then(res => {console.log(res); window.leaderboard=res;});

      lb.getLeaderboardPlayerEntry('twotwotwo')
  .then(res => {console.log(res);
   window.prev_score=res.score;})
  .catch(err => {
    if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
      window.prev_score=0;}
    });
  });
  
 
        while (document.getElementById("lang").textContent == "Language") {
            console.log("Language loading");
            sleep(20);
        }
        loadFunction();

    })

    .catch(console.error);


    
}



function loadFunction() {
    
  console.log("For the leaderboards:");
  console.log(window.prev_score);
  console.log(window.leaderboard);
  
  //document.getElementById("helper").textContent=setText("Помощь","Help");

 
 d=document.createElement("div");
  d.id="problem";
  
  document.getElementById("game").appendChild(d);
  

  pr=document.createElement("p");
  pr.id = "problem_setting";
  pr.className="problem";
  pr.style.width="100%";
  pr.style.height = "auto";
  pr.style.overflow = "hidden";
  
  d.appendChild(pr);

  b1=document.createElement("button");
  b1.id="left_button";
  d.appendChild(b1);
  b2=document.createElement("button");  
  b2.id="right_button";
  d.appendChild(b2);

  l = document.createElement("p");
  l.id = "lives";
  
  d.appendChild(l);

  p = document.createElement("p");
  p.id = "points";
  d.appendChild(p);

  t = document.createElement("div");
  t.id="safeTimerDisplay";
  d.appendChild(t);

  ll = document.createElement("div");
  ll.id = "leaderboard";

  document.body.appendChild(ll);

  newGame();
               
  
  
}
