/*
 * @Author: Yuuoniy
 * @Date:   2017-12-05 10:55:29
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-09 22:07:56
 */
var getNum =0
$(function() {
  $('#button').mouseleave(resetAll);
  $(".apb").click(autoOperate)
})

function GetNums(target) {
  var id = target.id
  // if (!id || $(target).hasClass('disable')) return;
  $(target).children('span').addClass('unread').html('...')
  var randomNum = 0
  getNum = $.get('./'+id.charCodeAt(), function(data) {
    randomNum = parseInt(data)
    if (randomNum) {
      randomNum = randomNum;
    }
    $(target).children('span').addClass('unread').html(randomNum)
    $(target).removeClass('enable')
    $(target).addClass('disable')

    acivateRes()
  })
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
  enableButtons()
}

function acivateRes() {
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    if (!$(buttons[i]).children('span').hasClass('unread') || $(buttons[i]).children('span').html() === '...') return;
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
}



function autoOperate() {
  GetNums($("#B")[0])
  GetNums($("#A")[0])
  GetNums($("#C")[0])
  GetNums($("#D")[0])
  GetNums($("#E")[0])
}

function enableButtons(){
  var buttons = $('.button')
  for (var i = 0; i < buttons.length; i++) {
    $(buttons[i]).addClass('enable')
    $(buttons[i]).removeClass('disable')
  }
}
