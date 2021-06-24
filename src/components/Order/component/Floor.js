import React from 'react'

import { List } from "antd";

export default function Floor(props){
    // let others = {a:1,b:2}
    if(typeof props.render === 'function'){
        return <>
                <List.Item style={{ color: '#001529', fontWeight: 'bold' }}>{props.title}</List.Item>
                {props.render.call(this)}
            </>
    }
    return <>{props.children}</>
}
