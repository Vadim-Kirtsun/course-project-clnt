import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchItemById} from "../http/itemApi";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import {Card, Descriptions, List, Space, Tag} from "antd";
import {CalendarOutlined, HeartTwoTone, InfoOutlined, LikeOutlined, TagsOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";


const Item = () => {
    const params = useParams();
    const [item, setItem] = useState([]);
    const [like, setLike] = useState(false);

    const AddsText = ({fields, values}) => {
        const data = fields.map(f => ({
            title: f.name,
            value: values.filter(v => v.addFieldId === f.id).map(v => v.value)
        }));
        return (<Descriptions
                title={item.name}
                bordered
                column={{
                    xxl: 4,
                    xl: 3,
                    lg: 3,
                    md: 3,
                    sm: 2,
                    xs: 1,
                }}>
                {data.map((item) => (
                    <Descriptions.Item label={item.title}>{item.value}</Descriptions.Item>
                ))}
            </Descriptions>
        );
    };
    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const TagsText = ({icon, tags}) => (
        (tags)
            ? <Space>
                {React.createElement(icon)}
                {tags.map(tag => (<Tag color="blue" key={tag.id}>{tag.name}</Tag>))}
            </Space>
            : ""
    );

    useEffect(() => {
        fetchItemById(params.id).then(data => {
            console.log(data);
            setItem(data);
        })
    }, []);

    return (
        <div>
            <h3>Item Info</h3>
            <Card
                style={{
                    width: '100%',
                }}
                actions={[
                    <IconText icon={LikeOutlined} text={item.like} key="list-vertical-like-o"/>,
                    <TagsText icon={TagsOutlined} tags={item.tags} key="list-vertical-like-o"/>
                ]}
            >
                {(item.add_field_values)
                    ? <AddsText fields={item.add_fields} values={item.add_field_values}/>
                    : ""}
            </Card>
            <hr/>
            <Comments comments={item.comments}/>
            <AddComment/>
            {/*<Descriptions title="Item Info">
                <Descriptions.Item label="Like">
                    {(like)
                        ? <HeartTwoTone onClick={() => setLike(false)} twoToneColor="red" style={{marginTop: "5px"}}/>
                        : <HeartTwoTone onClick={() => setLike(true)} twoToneColor="black" style={{marginTop: "5px"}}/>
                    }
                </Descriptions.Item>
            </Descriptions>*/}
        </div>
    );
};

export default Item;