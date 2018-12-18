/*
 * @Author: Yuuoniy
 * @Date:   2017-12-05 12:51:28
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-09 22:09:03
 */
var getNum = 0
var count = 0
var seque = [0, 1, 2, 3, 4]
var arr = new Array()

$(function() {

  $('.apb').click(randomSeque)
  $('#button').mouseleave(resetAll);
})

function GetNums(target) {
  console.log(target)
  var id = target.id
  if (!id || $(target).hasClass('disable')) {
    return;
  }
  disableButtons(id)
  $(target).children('span').addClass('unread').html('...')
  var randomNum = 0
  getNum = $.get('/', function(data) {
    randomNum = parseInt(data)
    $(target).children('span').addClass('unread').html(randomNum)
    $(target).removeClass('enable')
    $(target).addClass('disable')
    enableButtons(id)
    acivateRes()
    if (count != 4) {
      ++count
      GetNums($('#' + arr[count])[0])
    }
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
    if (buttons[i].id != id && !$(buttons[i]).children('span').hasClass('unread')) {
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
  // enableAllButtons()
}

function acivateRes() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    if (!$(buttons[i]).children('span').hasClass('unread') || $(buttons[i]).children('span').html() == '...') return;
  }
  $('#info-bar').removeClass('disable')
  $('#info-bar').addClass('enable')
  setTimeout(getResult, 500)
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
  $('.seque')[0].innerText = ''
}

function randomSeque() {
  var randomNum
  seque.sort(() => { return Math.random() > .5 ? -1 : 1 })
  count = 0
  showSeque(seque)

}

function showSeque() {
  var str = ''
  for (var i = 0; i < seque.length; i++) {
    str += String.fromCharCode(seque[i] + 65)
    arr[i] = String.fromCharCode(seque[i] + 65)
  }
  $('.seque').html(str)
  GetNums($('#' + arr[count])[0])
}

function enableAllButtons() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i]).addClass('enable')
    $(buttons[i]).removeClass('disable')
  }
}
