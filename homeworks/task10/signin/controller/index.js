/*
 * @Author: Yuuoniy
 * @Date:   2017-12-21 16:59:01
 * @Last Modified by:   Yuuoniy
 * @Last Modified time: 2017-12-23 10:46:32
 */

var users = require('../models/users')

exports.toSigninPage = function(req, res) {
  if (req.session.user) {
    return res.redirect('/detail')
  } else {
    return res.render('signin', {
      title: 'sign in',
      user: {}
    })
  }
}
exports.signIn = function(req, res) {
  users.findUser(req.body.username, req.body.password).then(function(user) {
    req.session.user = user
    return res.redirect('/detail')
  }).catch((err) => {
    return res.render('signin', {
      title: 'sign in',
      user: req.body,
      error: err
    })
  })
}
exports.toSignupPage = function(req, res) {
  if (req.session.user) {
    return res.redirect('/detail')
  } else {
    return res.render('signup', {
      title: 'sign up',
      user: {},
      error: {}
    });
  }
}
exports.signUp = function(req, res) {
  var user = req.body
  users.checkUser(user).then((user) => {
    users.createUser(user)
  }).catch((err) => {
    return res.render('signup', {
      title: 'sign up',
      user: user,
      error: err
    })
  }).then(() => {
    req.session.user = user
    return res.redirect('/detail')
  }).catch(() => {})
}

exports.signOut = function(req, res) {
  delete req.session.user
  res.redirect('/signin')
}

exports.toDetail = function(req, res, err) {
  if (req.session.err) {
    delete req.session.err
    return res.render('detail', { title: 'detail', user: req.session.user, error: 1 })
  } else if (req.session.user) {
    return res.render('detail', { title: 'detail', user: req.session.user, error: 0 })
  } else {
    return res.redirect('signin')
  }
}
exports.root = function(req, res) {
  if (req.session.user && req.query.username) {
    req.session.err = req.query.username != req.session.user.username ? 1 : 0
    return res.redirect('/detail')
  }
  if (req.session.user) {
    return res.redirect('/detail')
  }
  res.redirect('/signin')
}
//
