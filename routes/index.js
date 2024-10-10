const express = require('express');
const router = express.Router();
//사용할 컨트롤러 선언
const mainCtrl = require('../controller/mainCtrl')
const login = require('../controller/loginCtrl')
const logout = require("../controller/logoutCtrl")
const state = require("../controller/stateCtrl")
const book = require("../controller/bookCtrl")
const cart = require("../controller/cartCtrl")
const myPage = require("../controller/mypageCtrl")


router.get('/', mainCtrl.getMain); //기본주소에있는 값 받기

router.post("/login", login.postLogin)//로그인 post 요청

router.post("/logout", logout.postLogout)

router.get("/state", state.getState);

router.get("/book", book.getBookList)

router.get("/cart", cart.getCart)
router.post("/cart", cart.postCart)
router.post("/quan", cart.postQuantity)

router.get("/mypage", myPage.getMyPage)
router.post("/card", myPage.postCard)
router.post("/addr", myPage.postAddr)

module.exports = router;