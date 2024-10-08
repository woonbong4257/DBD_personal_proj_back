const express = require('express');
const router = express.Router();
//사용할 컨트롤러 선언
const mainCtrl = require('../controller/mainCtrl')



router.get('/', mainCtrl.getMain); //기본주소에있는 값 받기


module.exports = router;