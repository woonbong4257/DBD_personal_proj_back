const pool = require("../DB/db")

exports.postLogin = async (req, res) => {
  const {user} = req.body
  console.log(user)
  const checkUser = await pool.query("SELECT id FROM user WHERE id = ? AND pw = ?",[user.id, user.pw])
  const checkPay = await pool.query("SELECT * FROM dsu_pay WHERE user_id =?",[user.id])
  console.log(checkUser[0])
  if(checkUser[0].length >0){
  req.session.user = user.id
  req.session.save()
  res.send("로그인 완료")
    const checkCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user.id])
  if(checkCart[0]<1){
    const insertCart = await pool.query("INSERT INTO cart VALUES(null, now(), ?)",[user.id])
  }
  if(checkPay[0]<1){
    const insertPay = await pool.query(`INSERT INTO dsu_pay VALUES(null, "0", ?)`,[user.id])
  }
  }
  else{
    res.send("잘못 입력하셨습니다.")
  }
  
};
