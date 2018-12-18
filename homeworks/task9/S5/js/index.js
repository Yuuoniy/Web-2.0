/*
 * @Author: Yuuoniy
 * @Date:   2017-12-09 15:46:37
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-09 17:48:51
 */

$(function() {
  $('.apb').click(autoOperate)
  $('#button').mouseleave(resetAll);
})

function aHandler(sum, cb) {
  disableButtons('A')
  $('#A').children('span').addClass('unread').html('...')
  var randomNum = 0
  if (Math.random() > .5) {
    $('#message').html('A:这是个天大的秘密')
    $.get('/', function(data) {
      randomNum = parseInt(data)
      $('#A').children('span').addClass('unread').html(randomNum)
      $('#A').removeClass('enable').addClass('disable')
      enableButtons('A')
      sum += parseInt(randomNum)
      cb(null, sum)
    })
  } else {
    $('#A').children('span').addClass('unread').html('N/A')
    cb('A:这不是个天大的秘密', sum)
  }
}


function bHandler(sum, cb) {
  disableButtons('B')
  $('#B').children('span').addClass('unread').html('...')
  var randomNum = 0
  if (Math.random() > .5) {
    $('#message').html('B:我不知道')
    $.get('/', function(data) {
      randomNum = parseInt(data)
      $('#B').children('span').addClass('unread').html(randomNum)
      $('#B').removeClass('enable').addClass('disable')
      enableButtons('B')
      sum += parseInt(randomNum)

      cb(null, sum)
    })
  } else {
    $('#B').children('span').addClass('unread').html('N')
    cb('B:我知道', sum)
  }
}

function cHandler(sum, cb) {
  disableButtons('C')
  $('#C').children('span').addClass('unread').html('...')
  var randomNum = 0
  if (Math.random() > .5) {
    $('#message').html('C:你不知道')
    $.get('/', function(data) {
      randomNum = parseInt(data)
      $('#C').children('span').addClass('unread').html(randomNum)
      $('#C').removeClass('enable').addClass('disable')
      enableButtons('B')
      sum += parseInt(randomNum)

      cb(null, sum)
    })
  } else {
    $('#C').children('span').addClass('unread').html('N')
    cb('C:你知道', sum)
  }

}

function dHandler(sum, cb) {
  disableButtons('D')
  $('#D').children('span').addClass('unread').html('...')
  var randomNum = 0
  if (Math.random() > .5) {
    $('#message').html('D:他不知道')
    $.get('/', function(data) {
      randomNum = parseInt(data)
      $('#D').children('span').addClass('unread').html(randomNum)
      $('#D').removeClass('enable').addClass('disable')
      enableButtons('D')
      sum += parseInt(randomNum)

      cb(null, sum)
    })
  } else {
    $('#D').children('span').addClass('unread').html('N')
    cb('D:他知道', sum)
  }

}

function eHandler(sum, cb) {
  disableButtons('E')
  $('#E').children('span').addClass('unread').html('...')
  var randomNum = 0
  if (Math.random() > .5) {
    $('#message').html('E:才怪')
    $.get('/', function(data) {
      randomNum = parseInt(data)
      $('#E').children('span').addClass('unread').html(randomNum)
      $('#E').removeClass('enable').addClass('disable')
      enableButtons('E')
      sum += parseInt(randomNum)

      cb(null, sum)
    })
  } else {
    $('#E').children('span').addClass('unread').html('N')
    cb('E:不怪', sum)
  }


}

function bubbleHandler(sum) {
  setTimeout(function() {
    $("#message").html('大气泡：楼主异步调用战斗力感人，目测不超过' + sum.toString());
    $(".result").html(sum.toString());
    $("#info-bar").removeClass('enable').addClass('disable');
  }, 500);
}

function autoOperate() {
  //get random list
  var callbacks = [];
  var sum = 0
  var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
  handlers.sort(() => { return Math.random() > .5 ? -1 : 1 })
  showSeque(handlers)
  for (var i = 0; i < handlers.length; ++i) {
    (function(i) {
      callbacks[i] = function(sum) {
        handlers[i](sum, function(err, sum) {
          if (err) {
            show(err);
            setTimeout(() => {
              callbacks[i + 1](sum)
            }, 1000)
            // callbacks[i + 1](sum);
          } else {
            callbacks[i + 1](sum);
          }
        });
      };
    })(i);
  }
  callbacks[5] = bubbleHandler
  callbacks[0](0);
}




function show(mess) {
  $('#message').html(mess)
}

function showSeque(handlers) {
  var str = ''
  for (var i = 0; i < handlers.length; i++) {
    str += handlers[i].toString()[9].toUpperCase();
  }
  $('.seque').html(str)
}


function resetAll() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i]).addClass('enable').removeClass('disable')
    $(buttons[i]).children('span').removeClass('unread').html('')
  }
  $('#info-bar').removeClass('enable').addClass('disable')
  $('.result')[0].innerText = ''
  $('.seque')[0].innerText = ''
  $('#message')[0].innerText = ''
}


function disableButtons(id) {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].id != id) {
      $(buttons[i]).addClass('disable')
      $(buttons[i]).removeClass('enable')
    }
  }
}


function enableButtons(id) {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].id != id && !$(buttons[i]).children('span').hasClass('unread')) {
      $(buttons[i]).addClass('enable')
      $(buttons[i]).removeClass('disable')
    }
  }
}
