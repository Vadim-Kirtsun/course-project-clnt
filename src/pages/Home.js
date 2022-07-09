import React, {useLayoutEffect, useState} from 'react';
import {Badge, Card, Col, Row, Table} from "antd";
import {get5LargestCollections} from "../http/collectionApi";
import {latestNewItems} from "../http/itemApi";

const Home = () => {
    const [latestItems, setLatestItems] = useState([]);
    const [top5, setTop5] = useState([]);

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
                            <Card>
                                {collection.name}
                            </Card>
                        </Badge.Ribbon>))}
                </Col>
            </Row>

            <Row>
                <Col>
                    <h4>Tags</h4>

                </Col>
            </Row>
        </div>
    );
}
export default Home;