const fs = require("fs");
const json = fs.readFileSync("./db/option.json", "utf8");
const options = JSON.parse(json);
const mysql2 = require("mysql2/promise");
const pool = mysql2.createPool({
    host : options.host,
    port : options.port,
    user : options.user,
    password : options.password,
    database : options.database,
    dateStrings : true,
});
module.exports = pool;

/*
데이터베이스 연결에 대한 기본적인 설정들로 option.json에서 받아오는 정보를 토대로 데이터베이스에 연동
 */