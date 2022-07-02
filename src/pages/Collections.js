import React, {useEffect, useState} from 'react';
import { Card } from 'antd';
import {fetchCollections} from "../http/collectionApi";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar/avatar";
import {COLLECTION_ROUTER} from "../utils/consts";
import {NavLink} from "react-router-dom";



const Collections = () => {
    const [allCollection, setAllCollection] = useState([]);


    useEffect(() => {
        fetchCollections().then(data => {
                if (data.length > 0) {
                    setAllCollection(data);
                } else {
                    alert(data.message);
                }
            }
        );
    }, [])

    return (
        <Card title="All collections">
            {allCollection.map(elem => (
                <Card.Grid
                    key={elem.id}
                    style={{
                        width: '25%',
                        textAlign: 'center',
                    }}
                >
                    <Meta
                        avatar={<Avatar src={elem.image} />}
                        title={<NavLink to={`${COLLECTION_ROUTER}/${elem.id}`} >{elem.name}</NavLink>}
                        description={elem.description}
                    />

                </Card.Grid>
            ))}
        </Card>
    );
};

export default Collections;