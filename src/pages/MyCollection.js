import React, {useEffect, useState} from 'react';
import TableItems from "../components/TableItems";
import {Button, Tag} from "antd";
import {useParams} from "react-router-dom";
import {fetchItemsById} from "../http/collectionApi";


const MyCollection = () => {
    const params = useParams();
    const [collection, setCollection] = useState({});
    const [columns, setColumns] = useState([
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';

                        if (tag === 'loser') {
                            color = 'volcano';
                        }

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ]);

    const prepareAdditionalColumns = (additionalFields) =>{
        let array = [];
        additionalFields.forEach((item) => {
            array.push({
                title: item.name,
                dataIndex: item.name,
                key: item.name,
            })
        })
        return array;
    }

    const showModal = () => {
        alert('modal');
    };


    useEffect(() => {
        fetchItemsById(params.id).then(data => {
            setCollection(data);
            const addfields = prepareAdditionalColumns(data.add_fields);
            setColumns(columns.concat(addfields));
        })

    }, [])

    return (
        <div className="text-center mt-3">
            <div className="subHeader">
                <div>
                    <h3>Selected collection: {collection.name}</h3>
                </div>
                <Button size="large" onClick={showModal}>
                    Add New Item
                </Button>
            </div>
            <TableItems columns={columns}/>
        </div>
    );
};

export default MyCollection;