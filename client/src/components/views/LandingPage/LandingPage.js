import React, { useEffect, useState } from 'react';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { USER_SERVER, API_URL, API_KEY, IMG_URL } from '../../../Config';
import { Row } from 'antd';
import MainImg from './Section/MainImg';
import GridCards from '../commons/GridCards';

function LandingPage(props) {
    const onClickHandler = () => {
        axios.get(`${USER_SERVER}/logout`)
            .then(res => {
                if (res.data.success) {
                    props.history.push("/login");
                } else {
                    alert("Error");
                }
            });
    };

    const [Movies, setMovies] = useState([]);
    const [MainMovie, setMainMovie] = useState();

    // API에서 정보 가져오기, 현재 인기있는 영화 정보
    useEffect(() => {
        // url 값 이용
        const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endpoint) // fetch와 axios는 유사한 함수
        .then(res => res.json())
        .then(res => {
            setMovies([...res.results]);
            setMainMovie(res.results[0]); // 맨 처음 정보
        });
    }, []);
    
    return (
        <div style={{
            width: '100%', margin: 0
        }}>

            { 
                /* main img 컴포넌트 추가, MainMovie 정보를 가져온 이후 렌더링해야 함 */ 
                MainMovie && 
                <MainImg 
                    img={`${IMG_URL}/w1280/${MainMovie.backdrop_path}`} 
                    title={MainMovie.original_title}
                    text={MainMovie.overview}
                />
            }
            
            <div style={{
                width: '85%', margin: '1rem auto'
            }}>
                <h2>Movie by latest</h2>
                <button onClick={onClickHandler}>
                    Log out
                </button>
                <hr /> { /* 선 긋기 */ }
                
                { /* movie grid cards */ }
                <Row gutter={[16, 16]}> { /* gutter를 통해 위/아래, 좌/우 여백 줄 수 O */ }
                    { 
                        /* poster_path 없는 (포스터 없는) 영화는 따로 처리 필요 - null 주기 */ 
                        /* movieId, 클릭하여 고유 영화 정보 줄 때 필요 */ 
                        Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    img={movie.poster_path ? 
                                        `${IMG_URL}/w500/${movie.poster_path}` : null} 
                                    movieId={movie.id} 
                                    movieName={movie.original_title}
                                />
                            </React.Fragment>
                        )) 
                    }
                </Row>
            </div>

            <div style={{
                display: 'flex', justifyContent: 'center'
            }}>
                <button>Load More</button>
            </div>
        </div>  
    );
}

export default withRouter(LandingPage);
