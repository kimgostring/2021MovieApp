const express = require('express');
const router = express.Router();
// express framework에서 제공하는 Router 사용
// 해당 파일에서 /api/favorite에 대한 라우트들 관리
const { Favorite } = require('../models/Favorite');

// client에서 받아오는 방식과 일치시켜야 함
router.post('/favoriteNumber', (req, res) => {
    // client에서 variable에 담아 보내 온 값을 req를 통해 받을 수 O
    // req.body에 값이 받아지는 이유, bodyParser를 이용 중이기 때문 (이를 이용해 편하게 값 받을 수 O)
    
    // 1. mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId })
    .exec((err, info) => {
        // err인 경우, client에 err 알리고 종료
        if (err) return res.status(400).send(err); 
        // 2. 프론트에 숫자 정보 다시 보내주기
        res.status(200).json({ success: true, favoriteNumber: info.length }); // info로 받아 온 정보의 갯수
    })
});

// 특정 유저가 특정 영화를 favorite 리스트에 넣었는지 정보 DB에서 가져오기
router.post('/favorited', (req, res) => {
    // client에서 variable에 담아 보내 온 값을 req를 통해 받을 수 O
    // req.body에 값이 받아지는 이유, bodyParser를 이용 중이기 때문 (이를 이용해 편하게 값 받을 수 O)
    
    // 1. 해당 유저가 해당 영화를 좋아요한 기록이 있는지 찾기
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
    .exec((err, info) => {
        // err인 경우, client에 err 알리고 종료
        if (err) return res.status(400).send(err); 

        // []인 경우, 아직 안 넣은 것
        // 원소 하나가 들어가 있는 경우, favorite list에 넣은 것
        let result = false;
        if (info.length !== 0) result = true;

        res.status(200).json({ success: true, isFavorited: result }); 
    })
});

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
    .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json( { success: true, doc });
    })
});

router.post('/addToFavorite', (req, res) => {
    // res.body를 통해 client로부터 받은 정보를 favorite model에 넣어 DB에 보내주면 됨
    const favoriteData = new Favorite(req.body); 
    favoriteData.save((err, doc) => { // DB에 저장
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, doc });
    }); 
});

router.post('/getFavoriteMovies', (req, res) => {
    Favorite.find({ userFrom: req.body.userFrom })
    .exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, favorites })
    });
});

module.exports = router;