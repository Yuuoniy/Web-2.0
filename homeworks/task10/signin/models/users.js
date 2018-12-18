/*
 * @Author: Yuuoniy
 * @Date:   2017-12-21 20:30:30
 * @Last Modified by:   Yuuoniy
 * @Last Modiwfied time: 2017-12-22 19:24:21
 */
var bcrypt = require('bcrypt-nodejs')
var debug = require('debug')('signin:user')
// var db = require('../lib/mongo')/

//不能同时查找因为数据库中的密码加密过
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://localhost:27017/signup`;
var users
MongoClient.connect(url).then((client) => {
  var db = client.db('singin')
  users = db.collection('users')
}).catch((err) => {
  debug('connect to mongodb' + url + ' was failed with error: ', error);
})


exports.findUser = function(username, password) {
  return new Promise(function(reslove, reject) {
    users.findOne({ username: username }).then((user) => {
      console.log(user)
      if (user) {
        bcrypt.compare(password, user.password, (err,res) => {
          if (res)
            reslove(user)
          else
            reject('Username or password is incorrect')
        })
      } else {
        reject('Username or password is incorrect')
      }
    })
  })
}


exports.createUser = function(user) {
  console.log('create user')
  return bcrypt.hash(user.password, null, null, (err, hash) => {
    delete user.cpassword;
    user.password = hash
    return users.insert(user)
  })
}

exports.checkUser = function(user) {
  return new Promise(function(reslove, reject) {
    var error = {}
    users.findOne({ username: user.username }).then((user) => {
      if (user) error.username = 'Username already taken'
    })
    users.findOne({ id: user.id }).then((user) => {
      if (user) error.id = 'This id is already associated with an account'
    })
    users.findOne({ telephone: user.telephone }).then((user) => {
      if (user) error.telephone = 'This telephone number is already associated with an account'
    })
    users.findOne({ email: user.email }).then((user) => {
      if (user) error.email = 'This email address is already associated with an account'
    }).then(() => {
      if (Object.keys(error).length) {
        reject(error)
      } else {
        reslove(user)
      }
    })

  })

}
