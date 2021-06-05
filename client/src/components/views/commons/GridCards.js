// GridCards.js
// 해당 grid cards 형식은 원래 landingPage에서 사용되지만,
// 다른 곳에서도 종종 사용하게 될 수도 있는 흔한 형식이므로
// 따로 밖에 폴더를 만들어 빼 두는 것이 이후 다른 곳에서 활용하기 좋음 

import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
    return (
        <Col lg={6} md={8} xs={24}> { /* 전체 row는 24, 한 col이 몇을 차지하는지 나누기 */ }
            <div style={{ position: 'reactive' }}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width: '100%'}} src={props.img} alt={props.movieName} />
                </a>
            </div>
        </Col>
    )
}

export default GridCards
