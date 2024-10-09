const pool = require("../DB/db")


exports.getCart = async(req, res)=>{
  const user = req.session.user;
  const checkCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user])
  const userBooks = await pool.query(`
    SELECT cart_list_id, book_name, quantity, price 
    FROM cart_list a INNER JOIN book b ON a.book_book_id = b.book_id
    WHERE cart_cart_id = ?`,[checkCart[0][0].cart_id])
    res.send(userBooks[0])
}

exports.postCart = async(req,res)=>{
  const user = req.session.user;
  const checkCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user])
  const {book} = req.body
  if(checkCart[0]<1){
    const insertCart = await pool.query("INSERT INTO cart VALUES(null, now(), ?)",[user])
    const checkNewCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user])
    res.send("장바구니 생성 완료")
  }
  const selectSame = await pool.query("SELECT * FROM cart_list WHERE book_book_id =? AND cart_cart_id=?",[book.id, checkCart[0][0].cart_id])
  console.log(selectSame[0])
  if(selectSame[0].length>0){
    const updateBook = await pool.query("UPDATE cart_list SET quantity = quantity + 1 WHERE book_book_id =? AND cart_cart_id=?",[book.id, checkCart[0][0].cart_id])
  }
  else{
    const insertBook = await pool.query("INSERT INTO cart_list VALUES(null, ?, ?, 1)",[checkCart[0][0].cart_id,book.id])
  }
}