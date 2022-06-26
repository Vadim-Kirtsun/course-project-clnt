import React, {useEffect, useState} from 'react';
import TableItems from "../components/TableItems";
import {Button, Tag} from "antd";
import {useParams} from "react-router-dom";
import {fetchItemsById, removeCollection} from "../http/collectionApi";
import CreateItem from "../components/modals/CreateItem";
import {DeleteOutlined, DiffOutlined, EditOutlined} from "@ant-design/icons";
import {removeItem} from "../http/itemApi";

const MyCollection = () => {
    const params = useParams();
    const [visible, setVisible] = useState(false);
    const [collection, setCollection] = useState({});
    const [currentItem, setCurrentItem] = useState({});
    const [addFieldValues, setAddFieldValues] = useState([]);
    const [columns, setColumns] = useState([]);
    const [changeCount, setChangeCount] = useState(0);
    const initialColumns = [
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
    ];

    const showModal = () => {
        setVisible(true);
    };
    const editItem = (item) => {
        setCurrentItem(item);
        setVisible(true);
    };
    const deleteItem = async (id) => {
        const data = await removeItem(id);
        setChangeCount(changeCount + 1);
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
        array.push({
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        return (
                            <Tag color='#08c' key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
            {
                title: 'Actions',
                dataIndex: 'actions',
                key:"actions",
                width: '100px',
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
                tags: (item.tags !== undefined) ? item.tags.map(t => t.name) : [],
                actions:
                    <div>
                        <EditOutlined onClick={() => editItem(item)} style={{ fontSize: '20px', color: '#08c', margin: '0 10px'}}/>
                        <DeleteOutlined onClick={() => deleteItem(item.id)} style={{ fontSize: '20px', color: '#08c' }}/>
                    </div>
            })
        })
        return array;
    }

    useEffect(() => {
        fetchItemsById(params.id).then(data => {
            setColumns(initialColumns.concat(prepareAdditionalColumns(data.add_fields)));
            setAddFieldValues(prepareAdditionalData(data.items));
            setCollection(data);
        })
    }, [visible, changeCount])

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

            <CreateItem collectionId={collection.id} currentItem={currentItem} visible={visible} setVisible={setVisible}/>
        </div>
    );
};

export default MyCollection;