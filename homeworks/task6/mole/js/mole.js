var map = document.getElementById('main')
var start = document.getElementById('start')
var state = document.getElementById('state')
var timeEle = document.getElementById('time')
var scoreEle = document.getElementById('score')



var score = 0
var timer = null
var timeLeft = 0;
var pause = false;
var target
/*create 60 moles*/
function create() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 10; j++) {
      var mole = document.createElement('button')
      mole.setAttribute('class', 'buttons')
      fragment.appendChild(mole)
    }
  }
  map.appendChild(fragment)
}
create();

start.onclick = function() {
  if (!timeLeft) {
    timeLeft = 30
    state.value = 'playing'
    pause = false
    scoreEle.value = score = 0
    timer = setInterval(decrease, 1000);
    timeEle.value = timeLeft + ' s';
    randomPlace()
    click()
  } else {
    if (pause) {
      pause = false
      state.value = 'playing'
      timer = setInterval(decrease, 1000);
      time.value = timeLeft + " s";
      click()
    } else {
      pause = true
      state.value = 'pause'
      clearInterval(timer)
      timer = null
    }
  }
}


function randomPlace(argument) {
  var ran = parseInt(Math.random() * 60)
  target = map.childNodes[ran]
  target.className += ' change' //在原来的基础上修改样式
}

function decrease() {
  --timeLeft;
  timeEle.value = timeLeft + ' s'
  if (timeLeft == 0) {
    clearInterval(timer);
    timer = null;
    gameOver()
  }
}

function gameOver() {
  state.value = 'GameOver!'
  for (var i = 0; i < 60; i++) { //初始化新的一轮
    map.childNodes[i].className = "buttons"
  }
  setTimeout(function() { alert('Game Over \nYour score is ' + score) }, 100)
}

function click() {
  for (var i = 0; i < 60; ++i) {
    map.childNodes[i].onclick = function() {
      if (timeLeft && !pause) {
        if (event.target == target) {
          ++score
          scoreEle.value = score
          target.className = 'buttons'
          randomPlace()
        } else {
          if (score) {
            --score
            scoreEle.value = score
          }
        }
      }
    }
  }
  if (event.target == target) {
    ++score
    score.value = score
    target.className = 'buttons'
    randomPlace()
  }
}
