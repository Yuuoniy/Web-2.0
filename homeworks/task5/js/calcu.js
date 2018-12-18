toClear = false;
outcome = false;
str1 = '/*-+.'
//用来检验输入的合法性
reg1 = /^\(*$/
reg3 = /^[-0-9/*/+.()]*$/
regNum = /^[0-9]*$/
window.onload = function() {
  document.getElementById('buttons').onclick = function() {
    var value = event.target.value;
    if (!value) //避免出现 undefined 情况
      return;
    if (value == 'CE') clearAll()
    else if (value == '←') backspace()
    else if (value == '=') calculate()
    else show(event.target.value)
  }
}

function clearAll() {
  document.getElementById('answer').value = '0'
}

function backspace() {
  var ans = document.getElementById('show')
  if (outcome || !reg3.test(ans.value)) {
    return;
  } //不能修改运算结果

  if (ans.value.length == 1)
    ans.value = '0'
  else
    ans.value = ans.value.substring(0, ans.value.length - 1)
}


function show(_input) {
  var screen = document.getElementById('show')
  var getHint = document.getElementById('hint')
  var v = screen.value
  if (toClear)
    clearAll()
  if (screen.value.length >= 20) {
    getHint.value = '长度超出限制'
    toClear = true
    return
  }
  if (screen.value == '0') {
    if (str1.indexOf(_input) != -1)
      screen.value = '0' + _input
    else {
      screen.value = _input;
    }
  } else if (reg1.test(screen.value) && _input == '0') {} //避免出现(*0 的情况 
  else if (outcome && str1.indexOf(_input) == -1 || outcome && _input == '.') { //如果输入数字或小数点要覆盖之前的运算结果
    screen.value = _input
  } else if(str1.indexOf(screen.value.charAt(screen.value.length – 1)!=-1 && _input =='0')){}
  else
    screen.value += _input
  
  outcome = false
}

function check() {
  var getScreen = document.getElementById('show')
  var getHint = document.getElementById('hint')
  if (getScreen.value.indexOf('/0') > 0) {
    // getScreen.value = '除数不能为 0'
    getHint.value = '除数不能为 0'
    getScreen.value = '0'
    toClear = true
    return false
  }
  if (!reg3.test(getScreen.value)) { // 避免出现除了规定字符外的字符
    getHint.value = '请输入合法的表达式'
    getScreen.value='0'
    toClear = true
    return false

  }
  return true
}

function calculate() {
  if (!check()) //不合法则退出
    return;
  var getScreen = document.getElementById('show')
  var getHint = document.getElementById('hint')
  try {
    getHint.value = getScreen.value + ' ='
    getScreen.value = parseFloat(eval(getScreen.value).toFixed(10)) // toFixed 设置精度 处理浮点数的特殊情况
    outcome = true
  } catch (e) {
    getHint.value = '请输入合法的表达式'
    getScreen.value='0'
    toClear = true
  }
}

function clearAll() {
  document.getElementById('show').value = '0'
  document.getElementById('hint').value = ''
  toClear = false
}
