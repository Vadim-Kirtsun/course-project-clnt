import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchItemById} from "../http/itemApi";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import {Card} from "antd";
import {LikeTwoTone, TagsOutlined} from "@ant-design/icons";
import {UserContext} from "../App";
import AddFieldValues from "../components/AddFieldValues";
import Tags from "../components/Tags";
import {updateLike} from "../http/likeApi";
import {fetchCommentsByItem} from "../http/commentApi";
import axios from "axios";



const Item = () => {
    const params = useParams();
    const {currentUser} = useContext(UserContext);
    const [item, setItem] = useState([]);
    const [like, setLike] = useState(false);
    const [newCommentCount, setNewCommentCount] = useState(0);
    const [comments, setComments] = useState([]);

    const newCommentAdded = ()=>{
        setNewCommentCount((curr) => ++curr);
    }
    const handleLike = async () => {
        setLike((curr) => (curr ? false : true));
        await updateLike(currentUser.id, item.id);
    }

    useEffect(() => {
        subscribe();
        fetchItemById(params.id).then(data => {
            setItem(data);
            setComments(data.comments);
            let likes = data.likes.filter(like => like.userId === currentUser.id);
            (likes.length > 0)
                ? setLike(true)
                : setLike(false)
        })
    }, []);

    const subscribe = async  () => {
        try {
            const {data} = await axios.get('http://localhost:3001/get-messages');
            setComments(prev => [...prev, data]);
            await subscribe();
        } catch (e) {
            setTimeout(() => {
                subscribe();
            }, 500)
        }
    }

    useEffect(() => {
            if (item.id) {
                fetchCommentsByItem(item.id).then(data => {
                    setComments(data);
                })
            }
        }, [newCommentCount]);



    return (
        <div>
            <h3>Item Info</h3>
            <Card
                style={{
                    width: '100%',
                }}
                actions={[
                    <Tags icon={TagsOutlined} tags={item.tags} key="list-vertical-like-o"/>,
                    (currentUser.id)
                        ? <LikeTwoTone onClick={handleLike} twoToneColor={(like) ? "red" : "grey"}/>
                        : <div></div>
                ]}
            >
                <AddFieldValues fields={item.add_fields} values={item.add_field_values} currentItemName={item.name}/>
            </Card>
            <hr/>
            <Comments comments={comments}/>
            {(currentUser.id &&
                <AddComment currentUser={currentUser} itemId={item.id} newCommentAdded={newCommentAdded}/>
                )}
        </div>
    );
};

export default Item;