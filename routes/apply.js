const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const passport = require('passport');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');

const conn = require('../config/conn');

//@route /apply/:id
//@desc Apply to a job
router.post('/:id', (req, res) => {
  const candidate = {
    candidatename: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
    jobId: req.params.id,
    filepath: req.body.filepath,
    letterpath: req.body.letterpath
  };
  conn.query(
    `INSERT INTO candidates (candidate_name,email,phone,location,jobId,file_path,letter_path) VALUES('${
      candidate.candidatename
    }','${candidate.email}','${candidate.phone}','${candidate.location}',${
      candidate.jobId
    },'${candidate.filepath}','${candidate.letterpath}')`,
    (err, rows, fields) => {
      if (!err) {
        conn.query(
          `SELECT * FROM candidates WHERE id=${rows.insertId}`,
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

//@route /apply/:jobId
//@desc Get jobs in dashboard
router.get(
  '/:jobId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    conn.query(
      `SELECT * FROM candidates WHERE jobId=${req.params.jobId}`,
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json(rows);
        } else {
          console.log(err);
        }
      }
    );
  }
);

module.exports = router;
