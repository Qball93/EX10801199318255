var express = require('express');
var router = express.Router();

var objectApi = require('./api/myobject');

router.use('/myobject',objectApi);


module.exports = router;