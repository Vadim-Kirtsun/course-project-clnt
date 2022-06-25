import React, {useEffect, useState} from 'react';
import TableItems from "../components/TableItems";
import {Button, Tag} from "antd";
import {useParams} from "react-router-dom";
import {fetchItemsById} from "../http/collectionApi";
import CreateItem from "../components/modals/CreateItem";

const MyCollection = () => {
    const params = useParams();
    const [visible, setVisible] = useState(false);
    const [collection, setCollection] = useState({});
    const [addFieldValues, setAddFieldValues] = useState([]);
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

    const showModal = () => {
        setVisible(true);
    };

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
    const prepareAdditionalData = (additionalFields) =>{
        let array = [];
        additionalFields.forEach((item) => {
            array.push({
                key: item.id,
                id: item.id,
                name: item.name,
                tags: ['nice', 'developer'],
            })
        })
        return array;
    }

    useEffect(() => {
        fetchItemsById(params.id).then(data => {
            setColumns(columns.concat(prepareAdditionalColumns(data.add_fields)));
            setAddFieldValues(prepareAdditionalData(data.items));
            setCollection(data);
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
            <TableItems columns={columns} data={addFieldValues}/>

            <CreateItem collectionId={collection.id} visible={visible} setVisible={setVisible}/>
        </div>
    );
};

export default MyCollection;