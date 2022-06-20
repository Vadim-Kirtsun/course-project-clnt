import React, {useEffect, useState} from 'react';
import CreateCollection from "../components/modals/CreateCollection";
import {fetchCollections} from "../http/collectionApi";
import {Button, Table} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
        width: 150,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'address 1',
        ellipsis: true,
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'address 2',
        ellipsis: true,
    },
    {
        title: 'Additional Fields',
        dataIndex: 'additional_fields',
        key: 'address 3',
        ellipsis: true,
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'action',
    },
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

    const actionButton = (id) => {
        return  [<EditOutlined onClick={() => editCollection(id)} style={{ fontSize: '20px', color: '#08c', margin: '0 10px'}}/>,
            <DeleteOutlined onClick={() => deleteCollection(id)} style={{ fontSize: '20px', color: '#08c' }}/> ];
    }

    useEffect(() => {
        fetchCollections().then(data => {
            debugger
            if (data.length > 0){
                const results= data.map(row => ({
                    key: row.id,
                    name: row.name,
                    description: row.description,
                    image: row.image ? 'Yes' : 'No',
                    actions: actionButton(row.id, row.role)
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
                <Table columns={columns} dataSource={myCollection} />
            </div>

            <CreateCollection visible={visible} setVisible={setVisible}/>
        </div>


    );
};

export default MyCollections;