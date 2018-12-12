const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const passport = require("passport");
const createSlug = require("../validation/slugcreator");

const conn = require("../config/conn");

//@route /jobs
//@desc Get all jobs
router.get("/", (req, res) => {
  conn.query("SELECT * FROM job_portal", (err, rows, fields) => {
    if (!err) {
      res.status(200).json(rows);
    } else {
      console.log(err);
    }
  });
});

//@route /jobs/:id
//@desc Get job by ID

router.get("/:id", (req, res) => {
  conn.query(
    "SELECT * FROM job_portal WHERE id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//@route POST /jobs
//@desc PRIVATE route to add job
//PROTECTED ROUTE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const jobPost = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      deadline: req.body.deadline,
      body: req.body.body,
      userId: req.body.userId,
      image: req.body.image,
      shown: 1,
      slug: createSlug(req.body.title)
    };
    conn.query(
      `INSERT INTO jobs (title,description, location, deadline,body,userId,image,shown,slug) VALUES('${
        jobPost.title
      }','${jobPost.description}','${jobPost.location}','${
        jobPost.deadline
      }','${jobPost.body}',${jobPost.userId},'${jobPost.image}',${
        jobPost.shown
      },'${jobPost.slug}')`,
      (err, rows, fields) => {
        if (!err) {
          conn.query(
            `SELECT * FROM jobs WHERE id=${rows.insertId}`,
            (err, rows, fields) => {
              res.status(200).json(rows);
            }
          );
        } else {
          console.log(err);
        }
      }
    );
  }
);

//@route PUT /jobs
//@desc PRIVATE route to add job
//PROTECTED
//TODO create edit job route
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const jobPost = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      deadline: req.body.deadline,
      body: req.body.body,
      userId: req.body.userId,
      image: req.body.image,
      shown: 1,
      slug: createSlug(req.body.title)
    };
    conn.query(
      `UPDATE jobs SET title='${req.body.title}', description='${
        req.body.description
      }' WHERE id=${req.body.id}`,
      (err, rows, fields) => {
        if (!err) {
          conn.query(
            `SELECT * FROM jobs WHERE id=${req.body.id}`,
            (err, rows, fields) => {
              res.status(200).json(rows);
            }
          );
        } else {
          console.log(err);
        }
      }
    );
  }
);

module.exports = router;
