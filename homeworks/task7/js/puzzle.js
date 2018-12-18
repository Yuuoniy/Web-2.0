var start = false;
var blocks = document.createDocumentFragment();
var blank = 15
var stepNum = 0
var record = []
var timer = 0
var flag

$(function() {
  init()
  $('#start').click(() => randomMove())
  $('#pic').click(() => movePieces())
  $('#restore').click(() => restore())
  $('#auto').click(function() {
    if (check()) return
    if (!timer) {
      optimRecord()
      timer = setInterval(auto, 200)
    }
  })
  $('#change').click(() => changePic())
})

//init pieces of puzzle
function init() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var piece = $('<div></div>')
      piece.attr('id', 'position' + (i * 4 + j))
      piece.addClass('block' + (i * 4 + j))
      piece.addClass('pieces')
      piece.addClass('piecesPic0')
      $(blocks).append(piece)
    }
  }
  $('#pic').append(blocks)
}

function movePieces() {
  if (!start) return;
  var a = event.target;
  var blank_x = Math.floor(blank / 4),
    blank_y = Math.floor(blank % 4)
  var clicked = parseInt(a.id.substr(8))
  var clicked_x = Math.floor(clicked / 4),
    clicked_y = Math.floor(clicked % 4)
  if (Math.abs(blank_x - clicked_x) + Math.abs(blank_y - clicked_y) == 1) {
    ++stepNum;
    $('#step').html(stepNum)
    changeTwo(clicked)
  }
  if (check()) {
    setTimeout(function() { alert("Win!! You're so smart.") }, 500)
    start = false
  }
}


function restore() {
  var child = $('#pic div')
  for (var i = 0; i < child.length; i++) {
    $(child[i]).attr('id', 'position' + i)
  }
  start = false
  record = []
}

function check() {
  var child = $('#pic div')
  for (var i = 0; i < child.length; i++) {
    if ($(child[i]).attr('id') != 'position' + i)
      return false
  }
  return true

}


//注意是按值传递
function changeTwo(chosen) {
  if (chosen < 0 || chosen > 15) return;
  var temp = $('.block15')
  $('#position' + chosen).attr('id', 'position' + blank)
  temp.attr('id', 'position' + chosen)
  record.push(blank)
  blank = chosen
}

function forAuto(chosen) {
  if (chosen < 0 || chosen > 15) return;

  var temp = $('.block15')
  $('#position' + chosen).attr('id', 'position' + blank)
  temp.attr('id', 'position' + chosen)
  // flag = blank
  blank = chosen
}

function randomMove() {
  if (start) return
  stepNum = 0
  $('#step').html(stepNum)
  start = true;
  blank = 15
  var i = 0
  record = []
  while (i < 150 || blank != 15) {
    var dir = Math.floor(Math.random() * 4)
    switch (dir) {
      case 0:
        changeTwo(blank - 4)
        break;
      case 1:
        if (blank % 4 == 3) break; //can't move to left
        changeTwo(blank + 1)
        break;
      case 2:
        changeTwo(blank + 4)
        break;
      case 3:
        if (blank % 4 == 0) break; //can't move to right
        changeTwo(blank - 1)
        break;
      default:
        break;
    }
    ++i;
  }
}

function auto() {
  if (record.length != 0) {
    while (record.length >= 2 && record[record.length - 2] == blank) {
      record.pop()
      record.pop()
    }
    forAuto(record[record.length - 1])
    record.pop()
  } else {
    clearInterval(timer)
    start = false
  }
  if (check()) {
    clearInterval(timer)
    timer = 0
    start = false
  }

}


function changePic() {
  if (start) return;
  var child = $('#pic div')
  var old = $(child[0]).attr('class').split(' ')[2]
  var num = (parseInt(old.substr(9)) + 1) % 5
  for (var i = 0; i < child.length; i++) {
    $(child[i]).removeClass(old)
    $(child[i]).addClass('piecesPic' + num)
  }
  $('#hint').attr('class', 'piecesPic' + num)
}


//优化
function optimRecord() {
  var flag = 0
  do {
    flag = 0
    for (var i = 0; i < record.length - 2; ++i) {
      if (record[i] == record[i + 2]) {
        record.splice(i + 1, 2)
        flag = 1
      }
    }
  } while (flag)
}

// function randomPlace() {
//   if (start) return
//   start = true;
//   blank = 15
//   var arr = new Array(15)
//   var count = 0
//   for (var i = 0; i < 15; i++) {
//     arr[i] = i
//   }
//   while (!(count & 1) || !count) { //确保打乱后有解
//     count = 0;
//     arr.sort(() => 0.5 - Math.random())
//     for (var i = 0; i < 15; i++) {
//       for (var j = i + 1; j < 15; j++) {
//         if (arr[i] > arr[j]) ++count;
//       }
//     }
//   } //交换图片
//   for (var i = 0; i < 15; i++) {
//     var temp = $('#position' + arr[i])
//     $('#position' + i).attr('id', 'position' + arr[i])
//     temp.attr('id', 'position' + i)
//   }
// }
