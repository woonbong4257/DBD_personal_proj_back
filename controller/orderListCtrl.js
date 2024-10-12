const pool = require("../DB/db");

exports.getOrderList = async (req, res) => {
  const user = req.session.user;
  
  const selectOrderList = await pool.query(`
    SELECT book.book_name, list.quantity, list.price, o.order_date, o.quantity, o.card_id, o.basic, o.detail
    FROM \`order\` o 
    INNER JOIN order_list list ON o.order_id = list.order_order_id 
    INNER JOIN book ON list.book_book_id = book.book_id
    WHERE o.user_id = ?
    ORDER BY o.order_date
  `, [user]);
  
  res.send(selectOrderList[0]);
};

exports.postOrderList = async (req, res) => {
  
};
