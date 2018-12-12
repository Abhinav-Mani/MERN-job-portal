const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var upload = multer({ storage: storage });
router.post('/', upload.single('cv'), (req, res) => {
  console.log('http://localhost:5000/' + req.file.filename);
  res.status(200).json({
    upload: 'success',
    path: 'http://localhost:5000/' + req.file.filename
  });
});
router.post('/', upload.single('cl'), (req, res) => {
  res.status(200).json({
    upload: 'success',
    path: 'http://localhost:5000/' + req.file.filename
  });
});

module.exports = router;
