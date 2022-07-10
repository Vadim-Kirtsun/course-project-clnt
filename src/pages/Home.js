import React, {useLayoutEffect, useState} from 'react';
import {Badge, Card, Col, Row, Table} from "antd";
import {get5LargestCollections} from "../http/collectionApi";
import {latestNewItems} from "../http/itemApi";
import {WordCloud} from "@ant-design/plots";
import {getTagsWithItemCount} from "../http/tagApi";

const Home = () => {
    const [latestItems, setLatestItems] = useState([]);
    const [top5, setTop5] = useState([]);
    const [data, setData] = useState([]);

    const config = {
        data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'name',
        wordStyle: {
            fontFamily: 'Verdana',
            fontSize: [8, 32],
            rotation: 0,
        },
        height: 200,
        random: () => 0.5,
    };

    useLayoutEffect(() => {
        get5LargestCollections().then(data =>
            setTop5(data))
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

        getTagsWithItemCount().then(data => {
                const arr = data.map(item => ({
                    id: item.id,
                    name: item.name,
                    value: Number(item.count),
                }));
                setData(arr);
            }
        )
    }, [])


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

    return (
        <div>

            <Row>
                <Col span={12}>
                    <h4>Latest new items</h4>
                    <Table dataSource={latestItems} columns={columns}/>
                </Col>
                <Col span={2}></Col>
                <Col span={8}>
                    <h4>TOP 5 largest collections</h4>
                    {top5.map(collection => (
                        <Badge.Ribbon text={collection.count} key={collection.id}>
                            <Card size="small">
                                {collection.name}
                            </Card>
                        </Badge.Ribbon>))}

                    <h4>Tags</h4>
                    <WordCloud {...config} />
                </Col>
            </Row>

        </div>
    );
}
export default Home;