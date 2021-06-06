const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

// 회원가입을 위한 라우트
router.post('/register', (req, res) => {
    // 회원가입 시 필요한 정보들을 client에서 가져오면
    // 그것들을 DB에 넣어줌
    // 1. user model 가져와 인스턴스 만들기
    // body parser가 req.body 안에 정보 들어있을 수 있게 해줌, cilent의 정보를 req.body로 받아옴
    const user = new User(req.body); // req.body 안에 json 형식의 정보 들어있음
    // 2. mongoDB에 저장
    user.save((err) => { // mongoDB의 메소드
        if (err) // 에러 있을 때, client에 err 있다고 json 형식으로 전달
        return res.json({ 
            success: false, 
            err: err
        });
        // 성공했을 때, status(200)은 성공했다라는 표시
        return res.status(200).json({
        success: true
        })
    }); 
});

// 로그인을 위한 라우트
router.post('/login', (req, res) => {
    // 1. 요청된 email을 DB에서 찾기
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if(!userInfo) return res.json({
            success: false,
            message: "제공된 이메일에 해당하는 유저가 없습니다. "
        })

        // 2. 요청한 email이 있다면, 비밀번호가 같은지 확인
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            // 비밀번호 틀린 경우
            if (!isMatch) return res.json({
                success: false,
                message: "비밀번호가 틀렸습니다. "
            });

            // 비밀번호 맞은 경우
            // 3. 비밀번호가 일치하면, 유저를 위한 token 생성
            userInfo.genToken((err, userInfo) => {
                if (err) return res.status(400).send(err); // 400, 오류 있음 클라이언트에 전달

                // token을 받아옴, 여러 곳에 저장 가능, 각기 장단점 존재 => 쿠키, 로컬 스토리지, 세션...
                // 가장 안전한지에 대해서는 논란 많음, 여기서는 쿠키에다 저장하도록 함
                // 쿠키에다 하려면 쿠키파서 라이브러리 설치해야 함
                res.cookie("x_auth", userInfo.token) // 이름이 x_auth, 내용이 토큰인 쿠키 저장됨
                .status(200)
                .json({ 
                    success: true,
                    userId: userInfo._id
                });
            });
        });
    });
});

// auth route 
router.get('/auth', auth, (req, res) => { 
    // auth 미들웨어 : request 받은 뒤, cb 전 무언가를 해줌
    // 미들웨어를 통과해 여기까지 온 경우, auth : true인 경우 
    // client에 여기 왔다는 정보 전달
    res.status(200).json({
        // 유저 정보들 제공
        // 이를 통해, 어느 페이지에서든 유저 정보를 이용할 수 있게 됨
        _id: req.user._id, // 앞서 request에 user 요소 추가했었음
        isAdmin: req.user.role === 0 ? false : true, // 0일 때 일반 유저라고 정책을 설정했었음
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

// logout route
router.get('/logout', auth, (req, res) => {
    // auth 미들웨어에서 값 가져오기 성공한 경우
    User.findOneAndUpdate({ _id: req.user._id }, // 찾기
        { token: "" }, // 업데이트 시키기
        (err, userInfo) => {
            if(err) return res.json({ success: false, err });
            
            res.status(200).send({
                success: true
            });
        }); 
});

module.exports = router;