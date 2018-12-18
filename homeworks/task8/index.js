/*
 * @Author: Yuuoniy
 * @Date:   2017-11-27 23:08:42
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-02 21:08:35
 */
var http = require("http")
var fs = require("fs")
var url = require("url")
var querystring = require("querystring")
var path = require("path")
var filepath = './public/data/data.json'
var signupPath = './public/index.html'
var detailPath = './public/details.html'

var server = http.createServer(function(request, response) {
  if (request.method == 'POST') {
    postHandler(request, response)
  } else {
    getHandler(request, response)
  }
}).listen(8000);


console.log("Server is running at 127.0.0.1:8000");

function postHandler(request, response) {
  var postData = ""
  request.addListener("data", function(data) {
    postData += data
  })
  request.addListener("end", function() {
    var user = querystring.parse(postData)
    createUser(user, response)
  })
}

function getHandler(request, response) {
  var pathName = url.parse(request.url).pathname
  if (!pathName.indexOf('/favicon.ico')) {
    return;
  }
  if (request.url.indexOf('?username') != -1) {
    var username = querystring.parse((url.parse(request.url)).query).username
    existUser(username, response)
  } else {
    route(pathName, response)
  }
}

function showSignUp(response) {
  fs.readFile(signupPath, function(err, data) {
    if (err) {
      throw err;
    } else {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      response.write(data);
      response.end();
    }
  })
}

function showDetails(user, response) {
  fs.readFile(detailPath, function(err, data) {
    if (err) {
      response.writeHead(404, {
        'Content-Type': 'text/plain; charset=UTF-8'
      });
      response.write(err.message);
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      var str = data.toString()
      str = str.replace('Username', user.username)
      str = str.replace('Id', user.id)
      str = str.replace('Telephone', user.telephone)
      str = str.replace('Email', user.email)
      response.write(str)
    }
    response.end()
  })
}

function checkInfo(user, users) {
  var isVaild = [1, 1, 1, 1]
  //反馈错误信息

  for (var i = 0; i < users.length; i++) {
    if (users[i].username == user.username) {
      isVaild[0] = 0
    }
    if (users[i].id == user.id) {
      isVaild[1] = 0
    }
    if (users[i].telephone == user.telephone) {
      isVaild[2] = 0
    }
    if (users[i].email == user.email) {
      isVaild[3] = 0
    }
  }
  return isVaild
}

function showError(isVaild, user, response) {
  fs.readFile(signupPath, function(err, data) {
    if (err) throw err
    var pageStr = data.toString()
  //保留用户所填信息
    pageStr = pageStr.replace('"username" value=""', '"username" value="' + user.username + '"')
    pageStr = pageStr.replace('name="id" value=""', 'name="id" value="' + user.id + '"')
    pageStr = pageStr.replace('name="telephone" value=""', 'name="telephone" value="' + user.telephone + '"')
    pageStr = pageStr.replace('name="email" value=""', 'name="email" value="' + user.email + '"')
    if (!isVaild[0]) {
      
      pageStr = pageStr.replace('id="error1"></div>', 'id="error1">Username already taken</div>')

    }
    if (!isVaild[1]) {

      pageStr = pageStr.replace('id="error2"></div>', 'id="error2">This id is already associated with an account</div>')
    }
    if (!isVaild[2]) {

      pageStr = pageStr.replace('id="error3"></div>', 'id="error3">This telephone number is already associated with an account</div>')
    }
    if (!isVaild[3]) {

      pageStr = pageStr.replace('id="error4"></div>', 'id="error3">This email address is already associated with an account</div>')
    }
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    response.write(pageStr)
    response.end()
  })
}


function existUser(username, response) {
  fs.readFile(filepath, function(err, data) {
    if (err) {
      throw err
    }
    var ifExist = 0
    if (data == undefined || data == null || data.length == 0)
      data += '[]'
    var users = JSON.parse(data)
    for (var i = 0; i < users.length; i++) {
      if (users[i].username == username) {
        showDetails(users[i], response)
        ifExist = 1
        break;
      }
    }
    if (!ifExist) {
      response.writeHead(302, {
        Location: '/'
      });
      response.end();
    }
  })
}

function createUser(user, response) {
  fs.readFile(filepath, function(err, data) {
    if (err) throw err
    if (data == undefined || data == null || data.length == 0)
      data += '[]'
    var users = JSON.parse(data)
    var isVaild = checkInfo(user, users)
    if (isVaild.indexOf(0) != -1)
      showError(isVaild, user, response)
    else {
      users.push(user)
      var str = JSON.stringify(users)
      fs.writeFileSync(filepath, str)
      response.writeHead(302, {
        Location: '?username=' + user.username
      });
      response.end();
    }
  })
}


function route(pathName, response) {
  var contentType = getContentType(pathName)
  pathName = path.join('./public', pathName)
  if (path.extname(pathName) == "") {
    pathName += "/";
  }
  if (pathName.charAt(pathName.length - 1) == "/") {
    showSignUp(response)
  } else if (fs.existsSync(pathName)) {
    response.writeHead(200, { 'Conten-Type': contentType })
    var stream = fs.createReadStream(pathName, { flags: 'r' })
    stream.on('error', function() {
      response.writeHead(404)
      response.end('<h1>404 Read Error</h1>')
    })
    stream.pipe(response)
  } else { //文件不存在
    response.writeHead(302, {
      Location: '/'
    });
    response.end();
    // response.writeHead(404, { 'Content-Type': 'text/html' })
    // response.end("<h1>404 Not Found</h1>");
  }
}

function getContentType(pathName) {
  var contentType = ''
  var ext = path.extname(pathName)
  switch (ext) {
    case ".html":
      contentType = 'text/html'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
    case '.png':
      contentType = 'image/png'

    default:
      contentType = 'application/octet-stream'
  }
  return contentType
}
