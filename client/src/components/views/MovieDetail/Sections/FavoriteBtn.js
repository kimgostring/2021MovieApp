import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import Axios from 'axios'

function FavoriteBtn(props) {
    const userFrom = props.userFrom;
    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [IsFavorited, setIsFavorited] = useState(false);

    const variables = { // MovieDetail에서부터 props로 가져올 정보
        userFrom, // 간략하게 쓴 것, userFrom: userFrom에저장된값 으로 들어감
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => { // DB의 정보 서버에 요청
        // 해당 영화에 좋아요한 숫자
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(res => {
                if (res.data.success) { // 성공한 경우
                    setFavoriteNumber(res.data.favoriteNumber);
                } else { // 실패한 경우
                    alert('Fail to load favorite number data.');
                }
            });

        // 해당 영화를 해당 유저가 좋아요 했는지 여부
        Axios.post('/api/favorite/favorited', variables)
            .then(res => {
                if (res.data.success) { // 성공한 경우
                    setIsFavorited(res.data.isFavorited);
                } else { // 실패한 경우
                    alert('Fail to load user favorite data.');
                }
            });
    }, []);

    const onClickFavorite = () => {
        if (IsFavorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(res => {
                if (res.data.success) {
                    setIsFavorited(!IsFavorited);
                    setFavoriteNumber(FavoriteNumber - 1);
                } else {
                    alert('Fail to remove movie from favorite list.');
                }
            })
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(res => {
                if (res.data.success) {
                    setIsFavorited(!IsFavorited);
                    setFavoriteNumber(FavoriteNumber + 1);
                } else {
                    alert('Fail to add movie to favorite list.');
                }
            })
        }
    }

    return (
        <div>
            <Button shape="round" onClick={onClickFavorite}>{IsFavorited ? "Remove from Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default FavoriteBtn