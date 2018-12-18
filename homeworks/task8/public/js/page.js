/*
 * @Author: Yuuoniy
 * @Date:   2017-11-28 10:04:41
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-02 16:01:32
 */

$(function() {
  $('#reset').click(() => clearContent())
  $('#registerForm').submit(function() {
    return checkVaild()

  })
  $($('input')[0]).focus(function() {
    $('.error')[0].innerText = ''
  })
  $($('input')[1]).focus(function() {
    $('.error')[1].innerText = ''
  })
  $($('input')[2]).focus(function() {
    $('.error')[2].innerText = ''
  })
  $($('input')[3]).focus(function() {
    $('.error')[3].innerText = ''
  })

  // $("input")[0].focus();
})




function clearContent() {
  var inputs = $('input')
  var errors = $('.error')
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
  }
  for (var i = 0; i < errors.length; i++) {
    errors[i].innerText = ''
  }
}

// function clearWarning(event.target) {

// }

function checkVaild() {
  var inputs = $('input')
  var errors = $('.error')
  checkUsername(inputs[0].value)
  checkStudentid(inputs[1].value)
  checkPhone(inputs[2].value)
  checkEmail(inputs[3].value)
  if (!checkUsername(inputs[0].value) || !checkStudentid(inputs[1].value) ||
    !checkPhone(inputs[2].value) || !checkEmail(inputs[3].value)) {
    // res = false
    return false
  }
  return true
}

function checkUsername(username) {
  if (username == "" || username == undefined) {
    $(".error")[0].innerText = 'Username is required.'
    return false
  } else {
    if (!username.match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/)) {
      $(".error")[0].innerText = 'Enter a vaild username (6-18 only allow letters, digits and underscore)'
      return false
    }
  }
  $(".error")[0].innerText = ''
  return true
}

function checkStudentid(studentid) {
  if (studentid == "" || studentid == undefined) {
    $(".error")[1].innerText = 'Student number is required.'
    return false
  } else if (!studentid.match(/^[1-9]{1}[0-9]{7}$/)) {
    $(".error")[1].innerText = 'Enter a vaild student number (8 digits)'
    return false
  }
  $(".error")[1].innerText = ''
  return true
}

function checkPhone(phone) {
  if (phone == "" || phone == undefined) {
    $(".error")[2].innerText = 'Phone number is required.'
    return false
  } else if (!phone.match(/^[1-9]{1}[0-9]{10}$/)) {
    $(".error")[2].innerText = 'Enter a vaild phone number (13 digits)'
    return false
  }
  $(".error")[2].innerText = ''
  return true
}

function checkEmail(email) {
  if (email == "" || email == undefined) {
    $(".error")[3].innerText = 'Email is required.'
    return false
  } else if (!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
    $(".error")[3].innerText = 'Enter a vaild email address'
    return false
  }
  $(".error")[3].innerText = ''
  return true
}
