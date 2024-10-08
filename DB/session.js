var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '0000',
  database: '스키마 이름',
};

var sessionStore = new MYSQLStore(options);

module.exports = sessionStore;

/*
express-session을 사용하면 데이터베이스에서 세션을 저장하고 불러올 테이블을 생성해줌
세션이라고 표현하긴하지만 따지고 보면 쿠키에 가까움
 */