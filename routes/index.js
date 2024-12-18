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
const order = require("../controller/orderCtrl")
const orderList = require("../controller/orderListCtrl")
const test1 = require("../controller/test1")


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

router.get("/order", order.getOrder);
router.post("/order", order.postOrder);

router.get("/orderlist", orderList.getOrderList)

router.get("/test1", test1.getTest1)
router.post("/test1", test1.postTest1)

module.exports = router;