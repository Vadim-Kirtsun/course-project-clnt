import React, {useContext, useEffect, useState} from 'react';
import {fetchCollections, fetchCollectionsUser, removeCollection} from "../http/collectionApi";
import CreateCollection from "../components/modals/CreateCollection";
import CreateField from "../components/modals/CreateField";
import {EditOutlined, DeleteOutlined, DiffOutlined} from '@ant-design/icons';
import {Button, Table} from 'antd';
import {MY_COLLECTIONS_ROUTER} from "../utils/consts";
import {NavLink} from "react-router-dom";
import {UserContext} from "../App";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: "name"
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: "description"
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
        key: "subject"
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: "image"
    },
    {
        title: 'Additional Fields',
        dataIndex: 'additional_fields',
        key: "additional_fields"
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: "actions",
        width: '120px',
    }
];

const MyCollections = () => {
    const {currentUser} = useContext(UserContext);
    const [myCollections, setMyCollections] = useState([]);
    const [currentAddFields, setCurrentAddFields] = useState([]);
    const [currentCollectionId, setCurrentCollectionId] = useState('');
    const [collectionModalVisible, setCollectionModalVisible] = useState(false);
    const [addFieldsModalVisible, setAddFieldsModalVisible] = useState(false);
    const [currentCollection, setCurrentCollection] = useState({});
    const [changeCount, setChangeCount] = useState(0);

    const createNewCollection = () => {
        setCurrentCollection({});
        setCollectionModalVisible(true);
    };

    const editCollection = (collectionItem) => {
        setCurrentCollection(collectionItem);
        setCollectionModalVisible(true);
    }

    const deleteCollection = async (id) => {
        await removeCollection(id);
        setChangeCount(changeCount + 1);
    }

    const editAdditionField = (id, addFields) => {
        setAddFieldsModalVisible(true);
        setCurrentCollectionId(id);
        setCurrentAddFields(addFields);
    }

    const setDataInMyCollection = (data) => {
        if (data.length > 0) {
            setMyCollections(data);
        } else {
            alert(data.message);
        }
    }

    useEffect(() => {
        (currentUser.role === "ADMIN")
            ? fetchCollections().then(data => setDataInMyCollection(data))
            : fetchCollectionsUser(currentUser.id).then(data => setDataInMyCollection(data));
    }, [collectionModalVisible, addFieldsModalVisible, changeCount])

    return (
        <div>
            <div>
                <div className="subHeader">
                    <div>
                        <h3>My Collections:</h3>
                    </div>
                    <Button size="large" onClick={createNewCollection}>
                        Add New Collection
                    </Button>
                </div>
                <Table rowKey={obj => obj.id} columns={columns} dataSource={
                    myCollections.map(myCollectionItem => ({
                        id: myCollectionItem.id,
                        name: <NavLink to={`${MY_COLLECTIONS_ROUTER}/${myCollectionItem.id}`} key={myCollectionItem.name}>{myCollectionItem.name}</NavLink>,
                        description: myCollectionItem.description,
                        subject: myCollectionItem.subject,
                        image: myCollectionItem.image ? 'Yes' : 'No',
                        additional_fields: myCollectionItem.add_fields.map(af => af.name).sort().join(', '),
                        actions:
                            <div>
                                <DiffOutlined onClick={() => editAdditionField(myCollectionItem.id, myCollectionItem.add_fields)}
                                              style={{fontSize: '20px', color: '#08c'}}/>
                                <EditOutlined onClick={() => editCollection(myCollectionItem)}
                                              style={{fontSize: '20px', color: '#08c', margin: '0 10px'}}/>
                                <DeleteOutlined onClick={() => deleteCollection(myCollectionItem.id)}
                                                style={{fontSize: '20px', color: '#08c'}}/>
                            </div>
                    }))}
                />
            </div>
            <CreateCollection
                currentCollection={currentCollection}
                visible={collectionModalVisible} setVisible={setCollectionModalVisible}
            />
            <CreateField
                collectionId={currentCollectionId}
                currentAddFields={currentAddFields}
                visible={addFieldsModalVisible}
                setVisible={setAddFieldsModalVisible}
            />
        </div>
    );
};

export default MyCollections;