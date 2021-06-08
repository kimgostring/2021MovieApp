import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import { Popover, Button } from 'antd'
import './Sections/favorite.css'
import { IMG_URL } from '../../../Config'

function FavoritePage() {
    const [Favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoritedMovies();
    }, [])

    const fetchFavoritedMovies = () => {
        Axios.post('/api/favorite/getFavoriteMovies', { userFrom: localStorage.getItem('userId') })
        .then(res => {
            if (res.data.success) {
                setFavorites(res.data.favorites);
            } else {
                alert('fail to load favorite movie data.');
            }
        });
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
            if (res.data.success) {
                // 현재 table에서 지워주기
                // 방법 1: state에서 이 영화만 지워주기
                // 방법 2: req 다시 보내 새 결과 가져와서 refresh - 더 간단, 이 방법 사용
                fetchFavoritedMovies();
            } else {
                alert("fail to remove movie from favorite list.")
            }
        });
    }

    const renderCards = Favorites.map((favorite, index) => {
        const content = (
            <div>
                { favorite.moviePost ? 
                    <img src={`${IMG_URL}/w500${favorite.moviePost}`} /> : "no image" 
                }
            </div>
        )

        return (
            <tr key={index}>
                <Popover content={content} title={favorite.movieTitle}>
                    <td>{favorite.movieTitle}</td>
                </Popover>

                <td>{favorite.movieRunTime} mins</td>
                <td><Button shape="round" onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>remove</Button></td>
            </tr>
        );
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
           <h2> Favorite Movies </h2>
           <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <td>Remove from Favorite</td>
                    </tr>
                </thead>
                <tbody>
                    { Favorites && renderCards }
                </tbody>
            </table>
        </div>
    )
}

export default withRouter(FavoritePage)
