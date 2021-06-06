// server/models/Favorite.js
const mongoose = require("mongoose");

// 스키마 생성
const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId, // 해당 정보만 있으면 해당 유저의 모든 정보 가져올 수 O
        ref: 'User' // 이를 통해 User 모델의 정보 가져옴 지정해주어야 함
    }, 
    movieId: String,
    movieTitle: String,
    moviePost: String,
    movieRunTime: String,
}, { timestamps: true }); // 생성 시간/수정 시간이 자동으로 처리됨, createAt과 updateAt 필드

// 스키마를 모델로 감싸기
const Favorite = mongoose.model("Favorite", favoriteSchema);

// 모델을 다른 파일에서 사용 가능하도록
module.exports = { Favorite };