// auth.js
const { User } = require("../models/User");

const auth = (req, res, next) => {
    // token을 이용한 인증처리 하는 곳
    // 1. client cookie에서 token 가져옴
    const token = req.cookies.x_auth; // cookie에서 이름이 x_auth인 값 (token) 가져옴

    // 2. token 복호화, 해당 유저 DB에서 찾음 (두 token이 일치하는지 확인)
    User.findByToken(token, (err, userInfo) => {
        if (err) throw err;
        // 3. user X => 인증 X
        // return하게 되는 경우, 미들웨어에서 빠져나오게 됨 (원래 함수로 돌아가지 X)
        if (!userInfo) return res.json({ isAuth: false, err: true });

        // 4. user 존재 => 인증 O
        // req에 얻은 정보 넣어줌, 원래 함수 돌아가 사용하기 위해 
        req.token = token;
        req.user = userInfo; // user가 아닌 userInfo 넣어주어야 함
        next(); // 미들웨어에서 다음으로 넘어가도록 
    });
};

module.exports = { auth };