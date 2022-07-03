import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchItemById} from "../http/itemApi";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import {Descriptions} from "antd";
import {HeartTwoTone} from "@ant-design/icons";


const Item = () => {
    const params = useParams();
    const [item, setItem] = useState([]);
    const [like, setLike] = useState(false);
/*    const array = [];
    const allTags = item.tags.forEach(tag => tag.name);*/
/*    console.log(item.tags[0].name)*/

    useEffect(() => {
        fetchItemById(params.id).then(data => {
            console.log(data);
            setItem(data);
    })}, [])



    return (
        <div>
            <Descriptions title="Item Info">
                <Descriptions.Item label="ItemName">{item.name}</Descriptions.Item>
                <Descriptions.Item label="Tags">{/*{item.tags[0].name}*/}</Descriptions.Item>
                <Descriptions.Item label="Date">{item.createdAt}</Descriptions.Item>
                <Descriptions.Item label="AddField"></Descriptions.Item>
                <Descriptions.Item label="Like">
                    {(like)
                        ? <HeartTwoTone onClick={() => setLike(false)} twoToneColor = "red" style={{marginTop: "5px"}}/>
                        : <HeartTwoTone onClick={() => setLike(true)} twoToneColor = "black" style={{marginTop: "5px"}}/>
                    }
                </Descriptions.Item>
            </Descriptions>
            <hr/>
            <div>
                <Comments comments={item.comments}/>
                <AddComment />
                <div>

                </div>
            </div>
        </div>
    );
};

export default Item;