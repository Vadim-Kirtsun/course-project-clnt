import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchItemById} from "../http/itemApi";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import {Card,} from "antd";
import {HeartTwoTone, TagsOutlined} from "@ant-design/icons";
import {UserContext} from "../App";
import AddFieldValues from "../components/AddFieldValues";
import Tags from "../components/Tags";
import {createLike} from "../http/likeApi";


const Item = () => {
    const params = useParams();
    const {currentUser} = useContext(UserContext);
    const [item, setItem] = useState([]);
/*    let likeId = item.likes.filter(like => like.userId === currentUser.id)*/
    const [like, setLike] = useState(false);


    const handleLike = async () => {
        if (!currentUser.id) {
            return alert("Only registered users can like!");
        }

        const like = await createLike(currentUser.id, item.id);
        if (like.message) {
            alert(like.message);
        }
    }

    useEffect(() => {
        fetchItemById(params.id).then(data => {
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
                    (like)
                        ? <HeartTwoTone onClick={handleLike} twoToneColor="red"/>
                        : <HeartTwoTone onClick={handleLike} twoToneColor="black"/>,

                    <Tags icon={TagsOutlined} tags={item.tags} key="list-vertical-like-o"/>
                ]}
            >
                <AddFieldValues fields={item.add_fields} values={item.add_field_values} currentItemName={item.name}/>
            </Card>
            <hr/>
            <Comments comments={item.comments}/>
            <AddComment/>
        </div>
    );
};

export default Item;