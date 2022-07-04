import React from 'react';
import {Space, Tag} from "antd";

const Tags = ({icon, tags}) => (
    (tags)
        ? <Space>
            {React.createElement(icon)}
            {tags.map(tag => (<Tag key={tag.id} color="blue">{tag.name}</Tag>))}
        </Space>
        : ""
);

export default Tags;