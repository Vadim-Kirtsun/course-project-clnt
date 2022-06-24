import React, {useEffect, useState} from 'react';
import CreateCollection from "../components/modals/CreateCollection";
import {fetchCollections, removeCollection} from "../http/collectionApi";
import {Button, Table} from 'antd';
import {EditOutlined, DeleteOutlined, DiffOutlined} from '@ant-design/icons';
import CreateField from "../components/modals/CreateField";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: "name"
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key:"description"
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key:"subject"
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key:"image"
    },
    {
        title: 'Additional Fields',
        dataIndex: 'additional_fields',
        key:"additional_fields"
    }    ,
    {
        title: 'Actions',
        dataIndex: 'actions',
        key:"actions"
    }
];

const MyCollections = () => {
    const [myCollection, setMyCollection] = useState([]);
    const [currentAddFields, setCurrentAddFields] = useState([]);
    const [currentCollectionId, setCurrentCollectionId] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleField, setVisibleField] = useState(false);
    const [currentEditCollection, setCurrentEditCollection] = useState({});
    const [changeCount, setChangeCount] = useState(0);

    const showModal = () => {
        setCurrentCollectionId('');
        setCurrentEditCollection({});
        setVisible(true);
    };

    const combineAddFields = (addFields) => {
        const arr = [];
        addFields.forEach(i => {
            arr.push(i.name);
        })
        return arr.join(', ');
    }
    const editAdditionField = (id, addFields) => {
        setVisibleField(true);
        setCurrentCollectionId(id);
        setCurrentAddFields(addFields);
    }

    const editCollection = (row) =>{
        setCurrentEditCollection(row);
        setVisible(true);
    }
    const deleteCollection = async (id) =>{
        const data = await removeCollection(id);
        console.log(data)
        setChangeCount(changeCount + 1);
    }

    useEffect(() => {
        fetchCollections().then(data => {
            if (data.length > 0){
                const results= data.map(row => ({
                    id: row.id,
                    name: row.name,
                    description: row.description,
                    subject: row.subject,
                    image: row.image ? 'Yes' : 'No',
                    additional_fields: combineAddFields(row.add_fields),
                    actions:
                        <div>
                            <DiffOutlined onClick={() => editAdditionField(row.id, row.add_fields)} style={{ fontSize: '20px', color: '#08c', margin: '0 10px'}}/>
                            <EditOutlined onClick={() => editCollection(row)} style={{ fontSize: '20px', color: '#08c', margin: '0 10px'}}/>
                            <DeleteOutlined onClick={() => deleteCollection(row.id)} style={{ fontSize: '20px', color: '#08c' }}/>
                        </div>
                }));
                setMyCollection(results);
            } else {
                alert(data.message);
            }}
        );
    }, [visible, visibleField, changeCount])

    return (
        <div>
            <div>
                <div className="subHeader">
                    <div>
                    <h3>My Collections:</h3>
                    </div>
                    <Button size="large" onClick={showModal}>
                        Add New Collection
                    </Button>
                </div>
                <Table rowKey={obj => obj.id} columns={columns} dataSource={myCollection} />
            </div>
            <CreateCollection
                currentEditCollection={currentEditCollection}
                visible={visible} setVisible={setVisible}
            />
            <CreateField
                collectionId={currentCollectionId}
                currentAddFields={currentAddFields}
                visible={visibleField}
                setVisible={setVisibleField}
            />
        </div>
    );
};

export default MyCollections;