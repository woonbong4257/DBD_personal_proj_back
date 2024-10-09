const pool = require("../DB/db")

/*메인 페이지로 정보를 보내주는 컨트롤러*/

exports.getMain = async (req, res) => {
  res.send('hello world')
};
