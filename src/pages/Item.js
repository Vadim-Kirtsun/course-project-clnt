import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchItemById} from "../http/itemApi";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import {Card,} from "antd";
import {LikeTwoTone, TagsOutlined} from "@ant-design/icons";
import {UserContext} from "../App";
import AddFieldValues from "../components/AddFieldValues";
import Tags from "../components/Tags";
import {updateLike} from "../http/likeApi";


const Item = () => {
    const params = useParams();
    const {currentUser} = useContext(UserContext);
    const [item, setItem] = useState([]);
    const [like, setLike] = useState(false);

    const handleLike = async () => {
        setLike((curr) => (curr ? false : true));
        await updateLike(currentUser.id, item.id);
    }

    useEffect(() => {
        fetchItemById(params.id).then(data => {
            setItem(data);
            let likes = data.likes.filter(like => like.userId === currentUser.id);
            (likes.length > 0)
                ? setLike(true)
                : setLike(false)
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
                    <Tags icon={TagsOutlined} tags={item.tags} key="list-vertical-like-o"/>,
                    (currentUser.id)
                        ? <LikeTwoTone onClick={handleLike} twoToneColor={(like) ? "red" : "grey"}/>
                        : <div></div>
                ]}
            >
                <AddFieldValues fields={item.add_fields} values={item.add_field_values} currentItemName={item.name}/>
            </Card>
            <hr/>
            <Comments comments={item.comments}/>
            {(currentUser.id)
                ? <AddComment currentUser={currentUser} itemId={item.id}/>
                : <div></div>
            }
        </div>
    );
};

export default Item;