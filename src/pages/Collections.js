import React, {useEffect, useState} from 'react';
import { Card } from 'antd';
import {fetchCollections} from "../http/collectionApi";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import {COLLECTION_ROUTER} from "../utils/consts";
import {NavLink} from "react-router-dom";


const Collections = () => {
    const [allCollections, setAllCollections] = useState([]);


    useEffect(() => {
        fetchCollections().then(data => {
                if (data.length > 0) {
                    setAllCollections(data);
                } else {
                    alert(data.message);
                }
            }
        );
    }, [])

    return (
        <Card title="All collections">
            {allCollections.map(collection => (
                <Card.Grid
                    key={collection.id}
                    style={{
                        width: '25%',
                        textAlign: 'center',
                    }}
                >
                    <Meta
                        avatar={<Avatar src={collection.image} />}
                        title={<NavLink to={`${COLLECTION_ROUTER}/${collection.id}`} >{collection.name}</NavLink>}
                        description={collection.description}
                    />

                </Card.Grid>
            ))}
        </Card>
    );
};

export default Collections;