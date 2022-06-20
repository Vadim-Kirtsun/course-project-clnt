import React, {useContext} from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, UnlockFilled } from '@ant-design/icons';
import {blockUser, deleteUser, unblockUser} from "../http/userApi";


const Toolbar = ({selectedIds, setChangesCount, changesCount}) => {


    function logoutCurrentUserIfExistInSelectedIds() {
        let currentId = Number(localStorage.getItem('id'));
        if (selectedIds.filter(id => id === currentId).length === 1) {
            localStorage.removeItem('token')
        }
    }

    const block = () => {
        blockUser(selectedIds).then((response) => {
               if (response.err) {
                   console.log(response.err);
               }
               if (response.message) {
                   setChangesCount(++changesCount);
                   logoutCurrentUserIfExistInSelectedIds();
               }
           });
    };

    const unblock = () => {
        unblockUser(selectedIds).then((response) => {
            if (response.err) {
                console.log(response.err);
            }
            if (response.message) {
                setChangesCount(++changesCount);
                alert(response.message);
            }
        });
    };

    const deleteUsr = () => {
        deleteUser(selectedIds).then((response) => {
            if (response.err) {
                console.log(response.err);
            }
            if (response.message) {
                setChangesCount(++changesCount);
                alert(response.message);
                logoutCurrentUserIfExistInSelectedIds();
            }
        });
    };

    return (
        <div className='toolbar'>
            <Button onClick={block}  type="primary" danger ghost>
                Block
            </Button>
            <span onClick={unblock} className='icon'>
                <UnlockFilled />
            </span>
            <span onClick={deleteUsr}>
                <DeleteOutlined />
            </span>
        </div>
    );
};

export default Toolbar;