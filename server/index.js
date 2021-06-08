// index.js 
// 백엔드 시작점
const express = require('express'); // 다운받은 express 모듈 가져옴 
const app = express(); // 모듈의 함수를 통해 새 express 앱 생성
const port = 5000; // 몇 번이든 상관 없음
// 이 위치를 listen으로 연결했을 때 해당 위치로 가면 앱 실행

// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// v4.16.0 이상 버전의 express에는 body parser가 내장되어 있음
// // body parser에 옵션 주기
// // application/x-www-form-urlencoded -> 이렇게 생긴 데이터를 분석하여 가져올 수 있게 해줌
// app.use(bodyParser.urlencoded({extended: true})); 
// // application/json -> 이러한 타입을 분석하여 가져올 수 있게 해줌
// app.use(bodyParser.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

const config = require('./config/key'); // key.js 파일 추가
const mongoose = require('mongoose');
mongoose.connect(config.mongoPri.MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false // error 안 뜨게 해 주는 구문
}).then(() => console.log('MongoDB Connected...')) // 연결 잘 됐는지 확인
  .catch(err => console.log(err)); // 연결 안 된 이유 확인

// Router 이용, 이를 통해 api 코드들을 파일 별로 나눌 수 있음
// 이렇게 하지 않으면, 모든 서비스의 api를 index.js에 넣어주어야 함
// 각각 필요한 파트에 따라 나눠서 파일을 만드는 것이 편하게 관리하기 좋음
app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));

app.listen(port, () => { // 해당 포트에서 앱 실행, 해당 앱이 5000을 listen하면 콘솔 출력 
// 브라우저를 통해 localhost::5000\에 접속하면, 위의 글귀를 볼 수 있음
  console.log(`Server Listening on http://localhost:${port}`);
});