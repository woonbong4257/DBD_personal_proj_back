const pool = require("../DB/db");
const { postLogin } = require("./loginCtrl");

exports.getMyPage = async (req, res) => {
  try {
    const user = req.session.user;
    const userInfo = await pool.query("SELECT * FROM user WHERE id = ?", [user]);
    const card = await pool.query("SELECT * FROM card WHERE user_id = ?", [user]);
    const addr = await pool.query("SELECT * FROM address WHERE user_id = ?", [user]);
    const pay = await pool.query("SELECT * FROM dsu_pay WHERE user_id = ?", [user]);
    if (card[0].length > 0 && addr[0].length > 0) {
      res.send({
        name: userInfo[0][0].name,
        card: card[0],
        addr: addr[0],
        pay : pay[0]
      });
    } 

    else if (card[0].length > 0) {
      res.send({ name: userInfo[0][0].name, card: card[0],pay : pay[0]});
    } 

    else if (addr[0].length > 0) {
      res.send({name: userInfo[0][0].name,addr: addr[0],pay : pay[0]});
    } 

    else {
      res.send({name: userInfo[0][0].name, pay : pay[0],message: "아직 정보가 없습니다"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("서버 오류");
  }
};

exports.postCard = async(req, res)=>{
  const user = req.session.user;
  const {cardId, period, company}=req.body.card
  console.log("card: ",cardId, period, company)

  const checkCardId = await pool.query("SELECT card_id FROM card WHERE card_id =?",[cardId])

  if(checkCardId[0].length > 0){
    res.send("이미 존재하는 카드")
  }
  else{
    const insCard = await pool.query("INSERT INTO card VALUES(?,?,?,?)",[cardId, period,company,user])
    res.send("카드 기입 완료")
  }
}

exports.postAddr= async(req,res)=>{
  const user = req.session.user;
  const {zipCode, basic, detail}=req.body.addr
  console.log(zipCode,basic,detail)

  const checkAddr = await pool.query("SELECT zip_code FROM address WHERE zip_code = ? AND user_id = ?",[zipCode, user])

  if(checkAddr[0].length > 0){
    res.send("이미 존재하는 주소")
  }
  else{
    const insCard = await pool.query("INSERT INTO address VALUES(null,?,?,?,?)",[zipCode,basic,detail,user])
    res.send("카드 기입 완료")
  }
}