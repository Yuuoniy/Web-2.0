/*
 * @Author: Yuuoniy
 * @Date:   2017-12-05 09:08:51
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-09 22:06:53
 */
var getNum =0
$(function() {
  $('#button').mouseleave(resetAll);
  $(".apb").click(autoOperate)

})

function GetNums(target) {
  var id = target.id
  if (!id || $(target).hasClass('disable')) return;
  disableButtons(id)
  $(target).children('span').addClass('unread').html('...')
  var randomNum = 0
  getNum = $.get('/', function(data) {
    randomNum = parseInt(data)
    $(target).children('span').addClass('unread').html(randomNum)
    $(target).removeClass('enable')
    $(target).addClass('disable')
    enableButtons(id)
    if (id != 'E') {
      var nextId = String.fromCharCode(id.charCodeAt() + 1)
      GetNums($("#" + nextId)[0])
    } else
      acivateRes()
  })
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
    if (buttons[i].id != id ) {
      $(buttons[i]).addClass('enable')
      $(buttons[i]).removeClass('disable')
    }
  }
}

function getResult() {
  if (!$('#info-bar').hasClass('enable')) return;
  var res = 0;
  var nums = $('.num')
  for (var i = 0; i < nums.length; i++) {
    res += parseInt(nums[i].innerText)
  }
  $('.result')[0].innerText = res
  $('#info-bar').removeClass('enable')
  $('#info-bar').addClass('disable')
  enableAllButtons()
  // setTimeout(enableButtons,2000)
}

function acivateRes() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    if (!$(buttons[i]).children('span').hasClass('unread') || $(buttons[i]).children('span').html() == '...') return;
  }
  console.log('activate!')
  $('#info-bar').removeClass('disable')
  $('#info-bar').addClass('enable')
  setTimeout(getResult, 500);
}

function resetAll() {
  getNum.abort()
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i]).addClass('enable')
    $(buttons[i]).removeClass('disable')
    $(buttons[i]).children('span').removeClass('unread').html('')
  }
  $('#info-bar').removeClass('enable')
  $('#info-bar').addClass('disable')
  $('.result')[0].innerText = ''
}

function toggleInfo() {
  $('#info-bar').toggleClass('enable')
  $('#info-bar').toggleClass('disable')
}

function autoOperate() {
  reset = false
  console.log('auto')
  GetNums($("#A")[0])
}


function enableAllButtons() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i]).addClass('enable')
    $(buttons[i]).removeClass('disable')
  }
}
