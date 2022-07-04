import React, {useEffect, useState} from 'react';
import {Tag, List, Space, Spin} from 'antd';
import {LikeOutlined, MessageOutlined, TagsOutlined} from "@ant-design/icons";
import {fetchItemsById} from "../http/collectionApi";
import {NavLink, useParams} from "react-router-dom";
import {ITEM_ROUTER} from "../utils/consts";
import AddFieldValues from "../components/AddFieldValues";

const Collection = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState({});

    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
    const TagsText = ({icon, tags}) => (
        <Space>
            {React.createElement(icon)}
            {tags.map(tag => (<Tag color="blue" key={tag.id}>{tag.name}</Tag>))}
        </Space>
    );

    useEffect(() => {
        fetchItemsById(params.id).then(data => {
            setCollection(data);
        }).finally(() => setLoading(false))
    }, [params.id])

    if (loading) {
        return <Spin size="large"/>
    }

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={collection.items.map(item => ({
                id: item.id,
                name: item.name,
                tags: item.tags,
                content: <AddFieldValues
                    fields={collection.add_fields.filter(af => af.type === 'STRING' || af.type === 'DATE')}
                    values={item.add_field_values}/>
            }))}
            footer={
                <div>
                    <b>ant design</b> footer part
                </div>
            }
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                        <IconText icon={MessageOutlined}
                                  text={(item.comments != undefined) ? item.comments.length : "0"}
                                  key="list-vertical-message"/>,
                        <TagsText icon={TagsOutlined} tags={item.tags} key="list-vertical-like-o"/>,
                    ]}
                >
                    <List.Item.Meta title={<NavLink to={`${ITEM_ROUTER}/${item.id}`}>{item.name}</NavLink>}/>
                    {item.content}
                </List.Item>
            )}
        />
    );
};


export default Collection;