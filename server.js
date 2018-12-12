const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const conn = require('./config/conn');
const passport = require('passport');

//Routes
const jobRoutes = require('./routes/jobs');
const applyRoutes = require('./routes/apply');
const userRoutes = require('./routes/users');
const uploadRoute = require('./routes/upload');

conn.connect(err => {
  if (!err) console.log('DB connection succeded');
  else
    console.log(
      'Db connection failed \n Error:' + JSON.stringify(err, undefined, 2)
    );
});

//Passport middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-with, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methoids', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/jobs', jobRoutes);
app.use('/apply', applyRoutes);
app.use('/users', userRoutes);
app.use('/upload', uploadRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
