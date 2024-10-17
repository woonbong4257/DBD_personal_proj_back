const pool = require("../DB/db")

exports.getOrder = async(req,res)=>{
  const user = req.session.user;
  const selecAddr = await pool.query("SELECT * FROM address WHERE user_id =?",[user])
  const selecCard = await pool.query("SELECT * FROM card WHERE user_id =?",[user])
  // console.log("addr: ",selecAddr[0],"card: ",selecCard[0])
  if(selecAddr[0].length < 1 || selecCard[0].length < 1){
    res.send({msg:"카드나 주소가 없습니다."})
  }
  else{
    res.send({addr: selecAddr[0], card: selecCard[0]})
  }
}

exports.postOrder = async(req,res)=>{
  const user = req.session.user
  console.log(user)
  const {type, addr, card} = req.body
  const {arr, total, quan} = req.body.book
  const selectAddrInfo = await pool.query("SELECT * FROM address WHERE addr_id = ?",[addr])
  const selectCardInfo = await pool.query("SELECT * FROM card WHERE card_id = ?",[card])
  console.log(arr)
  
  
  if(type ==="cart"){
    const{cart_cart_id} = arr[0]
    const insOrder = await pool.query("INSERT INTO `order` VALUES(null, now(), ?,?,?,?,?,?,?,?,?)",[
      total,
      quan,
      user,
      selectCardInfo[0][0].company,
      selectCardInfo[0][0].card_id,
      selectCardInfo[0][0].period,
      selectAddrInfo[0][0].zip_code,
      selectAddrInfo[0][0].basic,
      selectAddrInfo[0][0].detail
    ])
    const selectNewOrder = await pool.query("SELECT order_id FROM `order` ORDER BY order_id DESC LIMIT 1")
    for(let i =0; i < arr.length;i++){
      const bookId = arr[i].book_id
      console.log("book: ",bookId)
      const cost = arr[i].price * arr[i].quantity
      console.log(cost)
      const insOrderBook = await pool.query("INSERT INTO order_list VALUES(null, ?, ?,?,?)", [
        selectNewOrder[0][0].order_id,
        bookId,
        arr[i].quantity,
        cost
      ])
      const updateInven = await pool.query("UPDATE book SET inventory = inventory - ? WHERE book_id = ?",[arr[i].quantity, bookId])
    }
    const delCartBook = await pool.query("DELETE FROM cart_list WHERE cart_cart_id = ?",[cart_cart_id])
  }
  else{
    const {id}=arr
    console.log("price: ",total, "quan: ",quan)
    const insOrder = await pool.query("INSERT INTO `order` VALUES(null, now(), ?,?,?,?,?,?,?,?,?)",[
      total,
      quan,
      user,
      selectCardInfo[0][0].company,
      selectCardInfo[0][0].card_id,
      selectCardInfo[0][0].period,
      selectAddrInfo[0][0].zip_code,
      selectAddrInfo[0][0].basic,
      selectAddrInfo[0][0].detail
    ])
    const selectNewOrder = await pool.query("SELECT order_id FROM `order` ORDER BY order_id DESC LIMIT 1")
    const insOrderBook = await pool.query("INSERT INTO order_list VALUES(null, ?, ?,?,?)", [
        selectNewOrder[0][0].order_id,
        id,
        quan,
        total
      ])
    const updateInven = await pool.query("UPDATE book SET inventory = inventory - ? WHERE book_id = ?",[quan, id])
  }
}