import React, {useLayoutEffect, useState} from 'react';
import {Col, Row} from "antd";
import {WordCloud} from "@ant-design/plots";
import {getTagsWithItemCount} from "../http/tagApi";
import LatestItems from "../components/LatestItems";
import TopLargestCollections from "../components/TopLargestCollections";

const Home = () => {
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

    return (
        <div>
            <Row>
                <Col span={12}>
                    <LatestItems/>
                </Col>
                {/*<Col span={2}> </Col>
                <Col span={8}>
                    <TopLargestCollections/>

                    <h4>Tags</h4>
                    <WordCloud {...config} />
                </Col>*/}
            </Row>
        </div>
    );
}
export default Home;