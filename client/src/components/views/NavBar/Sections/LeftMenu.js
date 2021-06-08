import React from 'react'
import { Menu } from 'antd'

function LeftMenu(props) {
    return (
        <div>
            <Menu mode={props.mode} style={{ marginTop: '12px' }}>
                <Menu.Item key="home" style={{ margin: '0 5px' }}>
                    <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item key="favorite" style={{ margin: '0 5px' }}>
                    <a href="/favorite">Favorite</a>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default LeftMenu
