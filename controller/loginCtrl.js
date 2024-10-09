const pool = require("../DB/db")

exports.postLogin = async (req, res) => {
  const {user} = req.body
  console.log(user)
  const checkUser = await pool.query("SELECT id FROM user WHERE id = ? AND pw = ?",[user.id, user.pw])
  console.log(checkUser[0])
  if(checkUser[0].length >0){
  req.session.user = user.id
  req.session.save()
  res.send("로그인 완료")
  }
  else{
    res.send("잘못 입력하셨습니다.")
  }
};
