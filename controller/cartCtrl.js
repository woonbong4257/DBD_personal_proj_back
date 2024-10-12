const pool = require("../DB/db")


exports.getCart = async(req, res)=>{
  const user = req.session.user;
  const checkCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user])
  const userBooks = await pool.query(`
    SELECT cart_list_id, book_name, quantity, price, book_id, cart_cart_id, b.inventory
    FROM cart_list a INNER JOIN book b ON a.book_book_id = b.book_id
    WHERE cart_cart_id = ?`,[checkCart[0][0].cart_id])
    res.send(userBooks[0])
}

exports.postCart = async(req,res)=>{
  const user = req.session.user;
  const {book ,quantity} = req.body
  const checkCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user])
  const selectSame = await pool.query("SELECT cart_list_id FROM cart_list WHERE cart_cart_id =? AND book_book_id =?",[checkCart[0][0].cart_id, book.id])
  if(selectSame[0].length>0){
    const updateBook = await pool.query("UPDATE cart_list SET quantity = quantity + ? WHERE book_book_id =? AND cart_cart_id=?",[quantity,book.id, checkCart[0][0].cart_id])
  }
  else{
    const insertBook = await pool.query("INSERT INTO cart_list VALUES(null, ?, ?, ?)",[checkCart[0][0].cart_id,book.id, quantity])
  }
}

exports.postQuantity = async(req, res)=>{
  const user =req.session.user
  const {state, book, inven} = req.body
  console.log(inven)
  const checkCart = await pool.query("SELECT cart_id FROM cart WHERE user_id = ?",[user])
  const checkInven = await pool.query("SELECT quantity FROM cart_list WHERE book_book_id =? AND cart_cart_id=?",[book, checkCart[0][0].cart_id])
  console.log(checkInven[0][0].quantity)
  
  if(state === "plus"){
    if(inven<=checkInven[0][0].quantity){
      res.send({msg:"재고량 초과"})
    }
    else{
    const plusQuantity = await pool.query(`
      UPDATE cart_list SET quantity = quantity + 1 
      WHERE book_book_id =? AND cart_cart_id=?`,[book, checkCart[0][0].cart_id])
    }
  }
  else{
    const checkQuantity = await pool.query("SELECT quantity FROM cart_list WHERE book_book_id =? AND cart_cart_id=?",[book, checkCart[0][0].cart_id])
    if(checkQuantity[0][0].quantity === 1){
      const delQuan = await pool.query("DELETE FROM cart_list WHERE quantity = 1 AND book_book_id =?",[book])
    }
    else{
    const minusQuantity = await pool.query(`
      UPDATE cart_list SET quantity = quantity - 1 
      WHERE book_book_id =? AND cart_cart_id=?`,[book, checkCart[0][0].cart_id])
    }
    }
    
}