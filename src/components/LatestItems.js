import React, {useLayoutEffect, useState} from 'react';
import {Table} from "antd";
import {latestNewItems} from "../http/itemApi";


const LatestItems = () => {
    const [latestItems, setLatestItems] = useState([]);
    const columns = [
        {
            title: 'Item Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Collection',
            dataIndex: 'collection',
            key: 'collection',
        },
        {
            title: 'Author',
            dataIndex: 'user',
            key: 'user',
        },
    ];

    useLayoutEffect(() => {
        latestNewItems().then(data => {
                const arr = data.map(item => ({
                    key: item.id,
                    name: item.name,
                    collection: item.collection.name,
                    user: item.collection.user.name
                }));
                setLatestItems(arr);
            }
        );
    }, [])

    return (
        <div>
            <h4>Latest new items</h4>
            <Table dataSource={latestItems} columns={columns}/>
        </div>
    );
};

export default LatestItems;