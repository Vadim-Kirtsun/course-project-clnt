import React, {useEffect, useState} from 'react';
import CreateCollection from "../components/modals/CreateCollection";
import {fetchCollections} from "../http/collectionApi";
import {Button, Table} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


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
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const editCollection = (id) =>{
        alert("edit collection:" + id);
    }

    const deleteCollection = (id) =>{
        alert("delete collection:" + id);
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
                    actions:
                        <div>
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
        </div>


    );
};

export default MyCollections;