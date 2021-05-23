// User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // 암호화에 이용
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// 스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // John ahn@naver.com -> 중간의 space 없애줌
        unique: 1 // 같은 이메일 사용 불가
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자, 일반 유저... 등의 권한
        type: Number, // 숫자값에 따라 일반 유저, 관리자 등 지정
        default: 0
    },
    image: String,
    token: { // 유효성 관리
        type: String 
    }, 
    tokenExp: { // 토큰 유효기간
        type: Number
    }
});

userSchema.pre("save", function(next) {
    // ES5 문법에서만 this 바인딩 가능, ES6 문법인 arrow func 에서는 불가능
    const user = this; // userSchema 가리킴

    if (user.isModified("password")) { // 비밀번호가 변경될 때만 실행
        // 비밀번호를 암호화 시킴
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else { // 비밀번호가 변경되지 않을 때는 그냥 save 함수로 값 넘기기
        // 이 부분이 없으면 save 함수로 넘어가지 못함, 계속 pre 함수에서 머묾
        next();
    }
});

// comparePassword 메소드 생성
userSchema.methods.comparePassword = function(plainPw, cbFunc) { // cbFunc를 실행하면 함수 호출부로 돌아가게 됨
    // plainPW와 암호화되어 저장된 비밀번호 비교
    // plainPW를 암호화하여 비교 (저장된 비밀번호를 복호화하는 건 불가능)
    bcrypt.compare(plainPw, this.password, function(err, isMatch) {
        // 비번 다를 때
        if (err) return cbFunc(err); 
        // 비번 같을 때 (isMatch === true)
        cbFunc(err, isMatch); 
    })
}

// getToken 메소드 생성
userSchema.methods.genToken = function(cbFunc) {
    const user = this;

    // jsonwebtoken 이용해서 token을 생성
    // sign 함수의 첫 번째 파라미터는 plain object여야 하므로, toHexString() 함수 사용
    // toHexString() : Return the ObjectID id as a 24byte hex string representation.
    // toHexString()은 toString()보다 더 작은 의미의 함수임
    const token = jwt.sign(user._id.toHexString(), "secretToken");
    // user._id + "secretToken" => token 생성
    // 이후, 나중에 token을 해석할 때 "secretToken"을 넣어 user._id를 찾아내게 됨
    // token을 통해 유저 식별 가능
    user.token = token;
    user.save(function(err, userInfo) {
        if (err) return cbFunc(err);
        cbFunc(null, userInfo);
    })
};

userSchema.statics.findByToken = function(token, cbFunc) {
    const user = this;

    // token을 복호화
    jwt.verify(token, "secretToken", function(err, decoded) {
        // user id 이용, user 찾은 뒤 client의 token과 DB의 token 비교
        user.findOne({ "_id": decoded, "token": token }, function(err, userInfo) {
            if (err) return cbFunc(err);
            cbFunc(null, userInfo);
        });
    });
};

// 스키마를 모델로 감싸기
const User = mongoose.model("User", userSchema);

// 모델을 다른 파일에서 사용 가능하도록
module.exports = { User };