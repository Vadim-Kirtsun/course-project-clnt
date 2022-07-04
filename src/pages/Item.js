import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchItemById} from "../http/itemApi";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import {Card, Descriptions, List, Space, Tag} from "antd";
import {CalendarOutlined, HeartTwoTone, InfoOutlined, LikeOutlined, TagsOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import {UserContext} from "../App";
import AddFieldValues from "../components/AddFieldValues";
import IconText from "../components/IconText";
import Tags from "../components/Tags";


const Item = () => {
    const params = useParams();
    const [item, setItem] = useState([]);
    const {currentUser} = useContext(UserContext);
    const [like, setLike] = useState(false);

    const handleLike = async () => {
        const data = await handleLike(currentUser.id, item.id);
        console.log(data);
    }

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
                    <IconText icon={LikeOutlined} text={handleLike} key="list-vertical-like"/>,
                    <Tags icon={TagsOutlined} tags={item.tags} key="list-vertical-like-o"/>
                ]}
            >
                <AddFieldValues fields={item.add_fields} values={item.add_field_values} currentItemName={item.name}/>
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