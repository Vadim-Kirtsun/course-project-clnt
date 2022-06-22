import React, {useEffect, useState} from 'react';
import CreateCollection from "../components/modals/CreateCollection";
import {fetchCollections} from "../http/collectionApi";
import {Button, Table} from 'antd';
import {EditOutlined, DeleteOutlined, DiffOutlined} from '@ant-design/icons';
import AddField from "../components/AddField";
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
    const [currentCollectionId, setCurrentCollectionId] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleField, setVisibleField] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const editAdditionField = (id) => {
        setVisibleField(true);
        setCurrentCollectionId(id);
    }

    const editCollection = (id) =>{
        alert("edit collection:" + id);
    }

    const deleteCollection = (id) =>{
        alert("delete collection:" + id);
    }
    const combineAddFields = (addFields) => {
    debugger
        const temp = addFields.map(i => {
            const arr = [];
        arr.push(i.name)
        arr.join(', ');
        return arr;
    }
    )}

    useEffect(() => {
        fetchCollections().then(data => {
            debugger
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
                            <DiffOutlined onClick={() => editAdditionField(row.id)} style={{ fontSize: '20px', color: '#08c', margin: '0 10px'}}/>
                            <EditOutlined onClick={() => editCollection(row.id)} style={{ fontSize: '20px', color: '#08c', margin: '0 10px'}}/>
                            <DeleteOutlined onClick={() => deleteCollection(row.id)} style={{ fontSize: '20px', color: '#08c' }}/>
                        </div>
                }));
                setMyCollection(results);
            } else {
                alert(data.message);
            }}
        );
    }, [])

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
            <CreateCollection visible={visible} setVisible={setVisible}/>
            <CreateField collectionId={currentCollectionId} visible={visibleField} setVisible={setVisibleField}/>
        </div>


    );
};

export default MyCollections;