// MovieDetail.js
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMG_URL } from '../../../Config'
import MainImg from '../commons/MainImg'
import MovieInfo from './Sections/MovieInfo'

function MovieDetail(props) {
    const movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState([]);
    
    useEffect(() => { // DOM이 load되었을 때, 처음에 할 작업
        const endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
            endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
        fetch(endpointInfo)
        .then(res => res.json())
        .then(res => {
            setMovie(res);
        });
    }, [])

    return ( // 렌더링하는 부분
        <div style={{
            width: '100%', margin: 0
        }}>
            {/* Header */}
            { 
                /* main img 컴포넌트 추가, MainMovie 정보를 가져온 이후 렌더링해야 함 */ 
                Movie && 
                <MainImg 
                    img={`${IMG_URL}/w1280/${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                {/* Movie Info */}
                <MovieInfo movie={Movie}/>

                <br /> 
                {/* Actor Grid */}
                
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button> Toggle Actor View </button>
                </div>

            </div>

        </div>
    )
}

export default MovieDetail
