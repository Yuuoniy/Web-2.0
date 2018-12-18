var start = document.getElementById('start')
var end = document.getElementById('end')
var maze = document.getElementById('container')
// var warpper = document.getElementById('warpper')
var info = document.getElementById('info')
var begin = false
var cheat = true
var win = false
var lose = false

start.onmouseover = function() {
  begin = true
  info.innerText = ''
  info.className ='larger'
  maze.className ='playing'
  cheat = false
  win = false
  lose = false
  var walls = document.getElementsByClassName('walls')
  for (var i = 0; i < walls.length - 1; i++) {
    walls[i].onmouseover = function() {
      var k = i
      return function() {
        if (begin) {
          info.innerText = 'You Lose'
          info.className ='larger1'
          walls[k].className += ' collision'
          begin = false
           setTimeout(()=>maze.className = '',700)
          lose = true
        }
      }
    }()
    walls[i].onmouseout = function (){
      var k = i
      return function(){
        walls[k].className = 'walls'
      }
    }()
  }
}

end.onmouseover = function(){
  if (win||lose) {return}
  if(begin&&!cheat){
    info.innerText = 'You Win!'
    info.className ='larger1'
    win = true
  }
  else {
    info.innerText = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
    info.className ='larger1'

  }
  begin = false
    setTimeout(()=>maze.className = '',700)
}


end.onmouseout = function(){
  cheat = false
}
maze.onmouseleave = function(){
     cheat = true
}
