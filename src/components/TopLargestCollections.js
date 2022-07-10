import React, {useLayoutEffect, useState} from 'react';
import {Badge, Card} from "antd";
import {get5LargestCollections} from "../http/collectionApi";

const TopLargestCollections = () => {
    const [top5, setTop5] = useState([]);

    useLayoutEffect(() => {
        let componentMounted = true;
        get5LargestCollections().then(data => {
            if (componentMounted) {
                setTop5(data)
            }
        })
        return () => {
            componentMounted = false;
        }
    }, [])


    return (
        <div>
            <h4>TOP 5 largest collections</h4>
            {top5.map(collection => (
                <Badge.Ribbon text={collection.count} key={collection.id}>
                    <Card size="small">
                        {collection.name}
                    </Card>
                </Badge.Ribbon>))}
        </div>
    );
};

export default TopLargestCollections;