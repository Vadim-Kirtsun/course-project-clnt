import React, {useEffect, useState} from 'react';
import {Tag, List, Space, Spin} from 'antd';
import {LikeOutlined, MessageOutlined, TagsOutlined} from "@ant-design/icons";
import {fetchItemsById} from "../http/collectionApi";
import {NavLink, useParams} from "react-router-dom";
import {ITEM_ROUTER} from "../utils/consts";
import AddFieldValues from "../components/AddFieldValues";
import IconText from "../components/IconText";
import Tags from "../components/Tags";

const Collection = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState({});

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
                likes: item.likes,
                content: <AddFieldValues
                    fields={collection.add_fields.filter(af => af.type === 'STRING' || af.type === 'DATE')}
                    values={item.add_field_values}/>
            }))}
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText
                            icon={LikeOutlined}
                            text={(item.likes != undefined) ? item.likes.length : "0"}
                            key="list-vertical-like-o"
                        />,
                        <IconText
                            icon={MessageOutlined}
                            text={(item.comments != undefined) ? item.comments.length : "0"}
                            key="list-vertical-message"
                        />,
                        <Tags
                            icon={TagsOutlined}
                            tags={item.tags}
                            key="list-vertical-like-o"
                        />,
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