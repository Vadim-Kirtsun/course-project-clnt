import React from 'react';
import {Space} from "antd";

const IconText = ({handleLike, icon}) => (
    <Space>
        <div onClick={handleLike}>
            {React.createElement(icon)}
        </div>
    </Space>
);

export default IconText;