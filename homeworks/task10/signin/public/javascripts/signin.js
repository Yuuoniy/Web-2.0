/*
 * @Author: Yuuoniy
 * @Date:   2017-12-21 16:49:47
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-23 00:26:39
 */
$(function() {
  $('#signup').click(function() {
    window.location.href = '/regist'
  })
  $('#signinForm').submit(function() {
    if (checkEmpty()) {
      console.log('aaa')
      $(inputs[1]).val(hex_sha($(inputs[1]).val()))
      return true
    } else {
      console.log('5555')
      return false
    }
  })
  $($('input')[0]).focus(function() {
    $('.error')[0].innerText = ''
  }) 
  $($('input')[1]).focus(function() {
    $('.error')[1].innerText = ''
  })
})

function checkEmpty() {
  var inputs = $('input')
  var errors = $('.error')
  if (inputs[0].value == "" || inputs[0].value == undefined) {
    $(".error")[0].innerText = 'Please enter username.'
    return false;
  }
  if (inputs[1].value == "" || inputs[1].value == undefined) {
    $(".error")[1].innerText = 'Please enter password.'
    return false;
  }
  return true
}
