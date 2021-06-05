// MovieDetail.js
import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMG_URL } from '../../../Config'
import { withRouter } from 'react-router-dom';
import { Row } from 'antd';
import MainImg from '../commons/MainImg'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards'

function MovieDetail(props) {
    const movieId = props.match.params.movieId;

    const [Movie, setMovie] = useState();
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => { // DOM이 load되었을 때, 처음에 할 작업
        const endpointCasts = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
            endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`;
        
        fetch(endpointInfo)
        .then(res => res.json())
        .then(res => {
            setMovie(res);
        });

        fetch(endpointCasts)
        .then(res => res.json())
        .then(res => {
            setCasts(res.cast);
        });
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };

    return ( // 렌더링하는 부분
        <div style={{
            width: '100%', margin: 0
        }}>
            {/* Header */}
            { 
                /* main img 컴포넌트 추가, MainMovie 정보를 가져온 이후 렌더링해야 함 */ 
                Movie && 
                <MainImg 
                    img={`${IMG_URL}/w1280${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auto'}}>
                {/* Movie Info, Movie 정보 다 받은 뒤에 렌더링해야 함 */}
                { Movie && <MovieInfo movie={Movie}/> }
                <br /> 
                {/* Actor Grid */}
   
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                { ActorToggle && 
                    <Row gutter={[16, 16]}>
                        { Casts && Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards 
                                        movieDetail
                                        characterImg={cast.profile_path ? 
                                            `${IMG_URL}/w500${cast.profile_path}` : null} 
                                        name={cast.name}
                                    />
                                </React.Fragment>
                            ))
                        }
                    </Row>
                }
            </div>
        </div>
    )
}

export default withRouter(MovieDetail);
