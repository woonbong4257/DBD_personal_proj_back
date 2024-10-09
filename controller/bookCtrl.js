const pool = require("../DB/db")

/*헤더로 로그인 상태를 보내주는 컨트롤러 */

exports.getBookList = async (req, res) => {
  const bookList = await pool.query("SELECT * FROM book")
  console.log(bookList[0])
  res.send(bookList[0])
};
