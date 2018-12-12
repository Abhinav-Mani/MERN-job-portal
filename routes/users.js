const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const conn = require('../config/conn');
const secret = require('../config/keys').secret;

//@route /register/
//@desc Register user
router.post('/register', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password2: req.body.password2
  };
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      conn.query(
        `INSERT INTO users (name,email,password) VALUES('${newUser.name}','${
          newUser.email
        }','${newUser.password}')`,
        (err, rows, fields) => {
          if (!err) {
            conn.query(
              `SELECT * FROM users WHERE id=${rows.insertId}`,
              (err, rows, fields) => {
                res.status(200).json(rows);
              }
            );
          } else {
            console.log(err);
          }
        }
      );
    });
  });
});

//@route /login/
//@desc Login
router.post('/login', (req, res) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  };
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  conn.query(
    `SELECT * FROM users WHERE email='${req.body.email}'`,
    (err, rows, fields) => {
      if (!err) {
        const user = rows[0];
        const dbpassword = rows[0].password;
        console.log(user);
        bcrypt.compare(login.password, dbpassword).then(isMatch => {
          if (isMatch) {
            //User matched
            const payload = { id: user.id, email: user.email, name: user.name };
            //Sign the token
            jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
              res.status(200).json({
                succes: true,
                token: `Bearer ${token}`
              });
            });
          } else {
            return res.status(400).json({ password: 'Password incorrect' });
          }
        });
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
