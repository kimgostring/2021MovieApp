import React from 'react';

function MainImg(props) { 
    // 이후, props를 통해 가장 유명한 영화(배열 0번째)의 img 받아 맨 처음 div의 background로 넣어주게 될 것
    return (
        <div style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
                15%, rgba(0,0,0,0) 
                20%, rgba(0,0,0,0.65)
                100%),
                url('${props.img}'), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem' }}>
                <h2 style={{ color: 'white', fontSize: '25px' }}> {props.title} </h2>
                <p style={{ color: 'white', fontSize: '1rem' }}> {props.text} </p>
            </div>
        </div>
    );
}

export default MainImg;