/*
 * @Author: Yuuoniy
 * @Date:   2017-12-05 09:08:51
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-05 11:14:19
 */
$(function() {
  $('#control-ring').click(function() {
    var target = event.target
    GetNums(target)
  })
  $('#info-bar').click(function() {
    getResult()
  })
  $('#button').mouseleave(resetAll);
})

function GetNums(target) {
  var id = target.id
  if (!id || $(target).hasClass('disable')) return;
  disableButtons(id)
  $(target).children('span').addClass('unread').html('...')
  var randomNum = 0
  $.get('/', function(data) {
    randomNum = parseInt(data)
    $(target).children('span').addClass('unread').html(randomNum)
    $(target).removeClass('enable')
    $(target).addClass('disable')
    enableButtons(id)
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
}

function acivateRes() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    if (!$(buttons[i]).children('span').hasClass('unread') || $(buttons[i]).children('span').html() == '...') return;
  }
  $('#info-bar').removeClass('disable')
  $('#info-bar').addClass('enable')
}

function resetAll() {
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
