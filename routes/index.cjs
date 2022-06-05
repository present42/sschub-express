var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainboard', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  res.render('form_submit', { title: "Message Submission Form" });
});

module.exports = router;
