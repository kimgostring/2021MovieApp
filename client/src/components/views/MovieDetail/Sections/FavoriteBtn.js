import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function FavoriteBtn(props) {
    const userFrom = props.userFrom;
    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;
    
    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [IsFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        // DB의 정보 서버에 요청
        const variables = { // MovieDetail에서부터 props로 가져올 정보
            userFrom,
            movieId
        }

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

    return (
        <div>
            <button>{IsFavorited ? "Remove from Favorite" : "Add to Favorite"}  {FavoriteNumber}</button>
        </div>
    )
}

export default FavoriteBtn