const express = require('express'); //express 모듈 호출
const app = express(); //express 모듈을 app이라는 이름으로 사용
const indexRouter = require('./routes/index'); //라우터 폴더와 연동
const cors = require('cors'); //통신 미들웨어 선언
const session = require('express-session');
const bodyParser = require('body-parser')
const sessionStore = require('./DB/session');


app.use(express.json()) //바디 파서 사용
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:3000"],
  method: ["POST", "GET"],
  credentials:true,
})); //통신을 할때 어떤 메소트와 주소로 할건지 선언

/* 
세션에 대한 설정
세션 암호화를 위한 비밀 키
세션이 수정되지 않아도 세션을 다시 저장할지 여부
초기화되지 않은 세션을 저장할지 여부
DB에 session테이블이 만들어짐 <-여기에 세션 저장
HTTPS를 사용할 경우 true로 설정
*/

app.use(session({
  secret: 'woonbong',
  resave: true,
  saveUninitialized: false, 
  store: sessionStore, 
  cookie: { secure: false }
}));

app.use('/', indexRouter); //기본주소로 사용

const port = 4000;
app.listen(port, ()=>{
  console.log(port,'번 포트에서 서버 가동중');
}) //서버 가동중인지 확인용 콘솔


module.exports = app;