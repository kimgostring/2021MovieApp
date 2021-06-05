// MovieInfo.js
import React from 'react'
import { Descriptions } from 'antd';

function MovieInfo(props) {

    return (
        <div>
            <Descriptions title="Movie Info" bordered>
                <Descriptions.Item label="Title">{props.movie.original_title}</Descriptions.Item>
                <Descriptions.Item label="Release Date">{props.movie.release_date}</Descriptions.Item>
                <Descriptions.Item label="Revenue">{props.movie.revenue}</Descriptions.Item>
                <Descriptions.Item label="Runtime">{props.movie.runtime}</Descriptions.Item>
                <Descriptions.Item label="Vote Average" span={2}>{props.movie.vote_average}</Descriptions.Item>
                <Descriptions.Item label="Vote Count">{props.movie.vote_count}</Descriptions.Item>
                <Descriptions.Item label="Status">{props.movie.status}</Descriptions.Item>
                <Descriptions.Item label="Popularity">{props.movie.popularity}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default MovieInfo
