const pool = require("../DB/db")

exports.postLogout = async (req, res) => {
  const user = req.session.user;

  if(user){
    req.session.destroy(()=>{
      req.session
    })
    res.send("로그아웃 완료")
  }
  else{
    res.send("로그인 상태 아님")
  }
  
};
